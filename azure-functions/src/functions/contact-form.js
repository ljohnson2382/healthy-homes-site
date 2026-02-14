const { app } = require('@azure/functions');
const { EmailClient } = require('@azure/communication-email');

app.http('contact-form', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            context.log('Contact form submission received');
            
            // Parse the request body
            const formData = await request.json();
            
            // Validate required fields
            const { firstName, lastName, email, phone, service, projectDetails } = formData;
            
            if (!firstName || !lastName || !email || !phone || !service || !projectDetails) {
                return {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'POST',
                        'Access-Control-Allow-Headers': 'Content-Type'
                    },
                    body: JSON.stringify({
                        success: false,
                        message: 'All fields are required'
                    })
                };
            }
            
            // Initialize Email Client (connection string from environment variables)
            const connectionString = process.env.COMMUNICATION_SERVICES_CONNECTION_STRING;
            
            if (!connectionString) {
                context.log.error('COMMUNICATION_SERVICES_CONNECTION_STRING not configured');
                // Fall back to logging for now
                context.log('Email content (not sent - no connection string):', {
                    to: 'info@homefixandbuild.org',
                    from: email,
                    subject: `New Quote Request from ${firstName} ${lastName}`,
                    customerInfo: { firstName, lastName, email, phone, service, projectDetails }
                });
                
                return {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        success: true,
                        message: 'Thank you! Your message has been received. We will contact you within 24 hours.'
                    })
                };
            }
            
            const emailClient = new EmailClient(connectionString);
            
            // Email content
            const emailHtml = `
                <h2>New Contact Form Submission - Healthy Homes LLC</h2>
                
                <h3>Customer Information:</h3>
                <ul>
                    <li><strong>Name:</strong> ${firstName} ${lastName}</li>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Phone:</strong> ${phone}</li>
                    <li><strong>Service Requested:</strong> ${service}</li>
                </ul>
                
                <h3>Project Details:</h3>
                <p>${projectDetails.replace(/\n/g, '<br>')}</p>
                
                <hr>
                <p><small>
                    Submitted from: <a href="https://staging.homefixandbuild.org/contact">https://staging.homefixandbuild.org/contact</a><br>
                    Time: ${new Date().toLocaleString()}
                </small></p>
            `;
            
            const emailPlainText = `
New Contact Form Submission - Healthy Homes LLC

Customer Information:
- Name: ${firstName} ${lastName}
- Email: ${email}
- Phone: ${phone}
- Service Requested: ${service}

Project Details:
${projectDetails}

---
Submitted from: https://staging.homefixandbuild.org/contact
Time: ${new Date().toLocaleString()}
            `;
            
            // Send email using Azure Communication Services
            const emailMessage = {
                senderAddress: process.env.SENDER_EMAIL || 'noreply@your-azure-domain.azurecomm.net',
                content: {
                    subject: `New Quote Request from ${firstName} ${lastName} - ${service}`,
                    plainText: emailPlainText,
                    html: emailHtml
                },
                recipients: {
                    to: [
                        {
                            address: 'info@homefixandbuild.org'
                        }
                    ],
                    // Optional: CC to owner
                    cc: [
                        {
                            address: 'nicky@homefixandbuild.org'
                        }
                    ]
                }
            };
            
            context.log('Sending email via Azure Communication Services...');
            const poller = await emailClient.beginSend(emailMessage);
            const result = await poller.pollUntilDone();
            
            context.log('Email sent successfully:', result.id);
            
            return {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST',
                    'Access-Control-Allow-Headers': 'Content-Type'
                },
                body: JSON.stringify({
                    success: true,
                    message: 'Thank you! Your message has been sent successfully. We will contact you within 24 hours.',
                    emailId: result.id
                })
            };
            
        } catch (error) {
            context.log.error('Error processing contact form:', error);
            
            return {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST',
                    'Access-Control-Allow-Headers': 'Content-Type'
                },
                body: JSON.stringify({
                    success: false,
                    message: 'Sorry, there was an error processing your request. Please call us directly at (857) 207-2145.'
                })
            };
        }
    }
});

// Handle preflight requests for CORS
app.http('contact-form-options', {
    methods: ['OPTIONS'],
    authLevel: 'anonymous',
    route: 'contact-form',
    handler: async (request, context) => {
        return {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: ''
        };
    }
});