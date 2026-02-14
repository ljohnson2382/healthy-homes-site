const { app } = require('@azure/functions');

app.http('testimonials', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        };

        try {
            if (request.method === 'GET') {
                // GET: Fetch all approved testimonials
                context.log('Fetching testimonials');
                
                // For now, we'll return hardcoded testimonials + any stored ones
                // In a real app, you'd fetch from a database
                const defaultTestimonials = [
                    { 
                        quote: "They did an amazing job on my kitchen remodel! Professional, timely, and exceeded expectations.", 
                        name: "Sarah M.", 
                        location: "Somerville, MA",
                        approved: true,
                        id: 1 
                    },
                    { 
                        quote: "Reliable and skilled — I'll definitely hire them again. Great communication throughout the project.", 
                        name: "David R.", 
                        location: "Waltham, MA",
                        approved: true,
                        id: 2 
                    },
                    { 
                        quote: "Outstanding deck construction! The team was professional and finished ahead of schedule.", 
                        name: "Michael K.", 
                        location: "Manchester, NH",
                        approved: true,
                        id: 3 
                    }
                ];
                
                // TODO: In production, fetch from Azure Table Storage, Cosmos DB, or SQL Database
                const storedTestimonials = context.bindings?.testimonials || [];
                const allTestimonials = [...defaultTestimonials, ...storedTestimonials.filter(t => t.approved)];
                
                return {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        ...corsHeaders
                    },
                    body: JSON.stringify({
                        success: true,
                        testimonials: allTestimonials
                    })
                };
                
            } else if (request.method === 'POST') {
                // POST: Submit new testimonial
                context.log('New testimonial submission received');
                
                const { quote, name, location } = await request.json();
                
                // Validate required fields
                if (!quote || !name) {
                    return {
                        status: 400,
                        headers: {
                            'Content-Type': 'application/json',
                            ...corsHeaders
                        },
                        body: JSON.stringify({
                            success: false,
                            message: 'Quote and name are required'
                        })
                    };
                }
                
                // Create new testimonial object
                const newTestimonial = {
                    id: Date.now(), // Simple ID generation
                    quote: quote.trim(),
                    name: name.trim(),
                    location: location ? location.trim() : '',
                    submitted: new Date().toISOString(),
                    approved: false // Requires manual approval
                };
                
                context.log('New testimonial:', newTestimonial);
                
                // TODO: Store in database (Azure Table Storage, Cosmos DB, etc.)
                // For now, we'll just log it and send a notification email
                
                // Send notification email to admin
                try {
                    const adminNotification = `
New Testimonial Submission - Healthy Homes LLC

Customer: ${newTestimonial.name}
Location: ${newTestimonial.location}
Submitted: ${new Date(newTestimonial.submitted).toLocaleString()}

Testimonial:
"${newTestimonial.quote}"

---
To approve this testimonial, log into your admin panel or contact your developer.
                    `;
                    
                    context.log('Admin notification prepared:', adminNotification);
                    
                    // TODO: Send email to admin using Azure Communication Services
                    // await sendAdminEmail({
                    //     to: 'info@homefixandbuild.org',
                    //     subject: 'New Testimonial Awaiting Approval',
                    //     body: adminNotification
                    // });
                } catch (emailError) {
                    context.log.error('Failed to send admin notification:', emailError);
                }
                
                return {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        ...corsHeaders
                    },
                    body: JSON.stringify({
                        success: true,
                        message: 'Thank you for your testimonial! It will be reviewed and published soon.',
                        testimonial: newTestimonial
                    })
                };
            }
            
        } catch (error) {
            context.log.error('Error in testimonials function:', error);
            
            return {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    ...corsHeaders
                },
                body: JSON.stringify({
                    success: false,
                    message: 'Sorry, there was an error processing your request.'
                })
            };
        }
    }
});

// Handle preflight requests for CORS
app.http('testimonials-options', {
    methods: ['OPTIONS'],
    authLevel: 'anonymous',
    route: 'testimonials',
    handler: async (request, context) => {
        return {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: ''
        };
    }
});