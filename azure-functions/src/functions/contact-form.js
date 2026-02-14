const { app } = require('@azure/functions');

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
            
            // Email content
            const emailContent = `
New Contact Form Submission from Healthy Homes Website

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
            
            context.log('Form data processed:', { firstName, lastName, email, phone, service });
            
            // For now, we'll log the email content
            // In a production environment, you would integrate with:
            // - Azure Communication Services Email
            // - SendGrid
            // - Or another email service
            
            context.log('Email content prepared:', emailContent);
            
            // TODO: Integrate with actual email service
            // Example with SendGrid or Azure Communication Services:
            // await sendEmail({
            //     to: 'info@homefixandbuild.org',
            //     subject: `New Quote Request from ${firstName} ${lastName}`,
            //     html: emailContent.replace(/\n/g, '<br>')
            // });
            
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
                    message: 'Thank you! Your message has been received. We will contact you within 24 hours.'
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