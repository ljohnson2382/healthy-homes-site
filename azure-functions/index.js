// 3 Boys Handyman LLC - Azure Functions
// Construction business functionality: quotes, project management, customer communication

const { app } = require('@azure/functions');

// Simple health check function
app.http('health', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    context.log('Health check requested');

    return {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'healthy',
        website: '3 Boys Handyman LLC',
        timestamp: new Date().toISOString(),
        message: 'Website functions are operational'
      })
    };
  }
});

// Quote request handler - Creates Zoho Project for construction quotes
app.http('request-quote', {
  methods: ['POST'],
  authLevel: 'function',
  handler: async (request, context) => {
    try {
      const quoteData = await request.json();
      
      context.log('Construction quote request received:', {
        customer: quoteData.customerName,
        project: quoteData.projectType,
        location: quoteData.address,
        timestamp: new Date().toISOString()
      });

      // Validate required fields for construction quotes
      const requiredFields = ['customerName', 'email', 'phone', 'address', 'projectType', 'projectDetails'];
      const missingFields = requiredFields.filter(field => !quoteData[field]);
      
      if (missingFields.length > 0) {
        return {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            success: false,
            error: 'Missing required fields',
            missingFields: missingFields
          })
        };
      }

      // Create Zoho Project for this construction job
      const zohoResult = await createZohoProject(quoteData, context);
      
      // Send confirmation email to customer
      const emailResult = await sendQuoteConfirmation(quoteData, zohoResult, context);
      
      // Notify 3-Boys-Handyman team
      await notifyTeam(quoteData, zohoResult, context);

      return {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: true,
          message: 'Quote request submitted successfully',
          projectId: zohoResult.projectId,
          estimatedResponse: '24-48 hours',
          nextSteps: [
            'Our team will review your project requirements',
            'We will schedule an on-site consultation',
            'You will receive a detailed quote within 48 hours'
          ],
          timestamp: new Date().toISOString()
        })
      };

    } catch (error) {
      context.log.error('❌ Error processing quote request:', error);
      
      return {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: false,
          error: 'Failed to process quote request. Please try again or call us directly.'
        })
      };
    }
  }
});

// Contact form submission handler (general inquiries)
app.http('contact-form', {
  methods: ['POST'],
  authLevel: 'function',
  handler: async (request, context) => {
    try {
      const formData = await request.json();
      
      context.log('General contact form received:', {
        name: formData.name,
        email: formData.email,
        timestamp: new Date().toISOString()
      });

      // Basic validation
      if (!formData.name || !formData.email || !formData.message) {
        return {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            success: false,
            error: 'Name, email, and message are required'
          })
        };
      }

      // Log the general inquiry
      context.log('📧 General inquiry:', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        subject: formData.subject || 'General inquiry',
        message: formData.message.substring(0, 100) + '...'
      });

      // TODO: Send to company email or create Zoho contact
      await sendGeneralInquiry(formData, context);

      return {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: true,
          message: 'Message sent successfully. We will respond within 24 hours.',
          timestamp: new Date().toISOString()
        })
      };

    } catch (error) {
      context.log.error('❌ Error processing contact form:', error);
      
      return {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: false,
          error: 'Failed to send message. Please try again or call us directly.'
        })
      };
    }
  }
});
});

// ==============================================
// ZOHO PROJECTS INTEGRATION FUNCTIONS
// ==============================================

async function createZohoProject(quoteData, context) {
  try {
    // Mock response for now - will integrate with actual Zoho Projects API
    const projectId = `PROJECT-${Date.now()}`;
    
    context.log('🏗️ Creating Zoho Project for construction quote:', {
      customer: quoteData.customerName,
      projectType: quoteData.projectType,
      projectId: projectId
    });

    // TODO: Implement actual Zoho Projects API integration
    // const zohoProjectsAPI = new ZohoProjectsClient();
    // const project = await zohoProjectsAPI.createProject({
    //   name: `${quoteData.projectType} - ${quoteData.customerName}`,
    //   description: quoteData.projectDetails,
    //   customer: quoteData.customerName,
    //   address: quoteData.address,
    //   budget: quoteData.estimatedBudget,
    //   timeline: quoteData.timeframe
    // });

    return {
      success: true,
      projectId: projectId,
      projectName: `${quoteData.projectType} - ${quoteData.customerName}`,
      status: 'Quote Requested'
    };

  } catch (error) {
    context.log.error('❌ Failed to create Zoho Project:', error);
    
    return {
      success: false,
      error: error.message,
      projectId: `FALLBACK-${Date.now()}`
    };
  }
}

async function sendQuoteConfirmation(quoteData, zohoResult, context) {
  try {
    const emailContent = {
      to: quoteData.email,
      from: 'quotes@homefixandbuild.org',
      subject: `Quote Request Received - ${quoteData.projectType}`,
      html: generateQuoteConfirmationEmail(quoteData, zohoResult)
    };

    context.log('📧 Sending quote confirmation to customer:', quoteData.email);

    // TODO: Integrate with email service (SendGrid, Azure Communication Services, etc.)
    // await sendEmail(emailContent);

    return {
      success: true,
      emailSent: true,
      recipient: quoteData.email
    };

  } catch (error) {
    context.log.error('❌ Failed to send quote confirmation:', error);
    return { success: false, error: error.message };
  }
}

async function notifyTeam(quoteData, zohoResult, context) {
  try {
    const teamEmail = {
      to: 'team@homefixandbuild.org',
      from: 'system@homefixandbuild.org', 
      subject: `🔨 New Quote Request: ${quoteData.projectType}`,
      html: generateTeamNotificationEmail(quoteData, zohoResult)
    };

    context.log('📧 Notifying 3-Boys-Handyman team of new quote request');

    // TODO: Send team notification email
    // await sendEmail(teamEmail);

    return { success: true };

  } catch (error) {
    context.log.error('❌ Failed to notify team:', error);
    return { success: false, error: error.message };
  }
}

async function sendGeneralInquiry(formData, context) {
  try {
    context.log('📧 Processing general inquiry for team');

    // TODO: Send general inquiry to team email
    // const inquiryEmail = {
    //   to: 'info@homefixandbuild.org',
    //   subject: `General Inquiry from ${formData.name}`,
    //   html: generateGeneralInquiryEmail(formData)
    // };

    return { success: true };

  } catch (error) {
    context.log.error('❌ Failed to send general inquiry:', error);
    return { success: false, error: error.message };
  }
}

// ==============================================
// EMAIL TEMPLATE FUNCTIONS
// ==============================================

function generateQuoteConfirmationEmail(quoteData, zohoResult) {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quote Request Confirmation - 3 Boys Handyman LLC</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
    <div style="background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: #f39c12; margin: 0; font-size: 28px;">🔨 3 Boys Handyman LLC</h1>
        <h2 style="color: #ecf0f1; margin: 10px 0 0 0; font-weight: 300; font-size: 18px;">Quote Request Received</h2>
    </div>
    
    <div style="background: #f8f9fa; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <p style="font-size: 16px; margin-bottom: 20px;">Hi ${quoteData.customerName},</p>
        
        <p style="font-size: 16px; margin-bottom: 25px;">
            Thank you for requesting a quote for your <strong>${quoteData.projectType}</strong> project! 
            We have received your request and our team is already reviewing the details.
        </p>
        
        <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; border-left: 4px solid #27ae60; margin: 25px 0;">
            <h3 style="color: #27ae60; margin-top: 0; font-size: 18px;">📋 Your Project Details:</h3>
            <ul style="margin: 10px 0; padding-left: 20px;">
                <li><strong>Project Type:</strong> ${quoteData.projectType}</li>
                <li><strong>Location:</strong> ${quoteData.address}</li>
                <li><strong>Timeline:</strong> ${quoteData.timeframe || 'To be discussed'}</li>
                <li><strong>Budget Range:</strong> ${quoteData.estimatedBudget || 'To be determined'}</li>
                <li><strong>Project ID:</strong> ${zohoResult.projectId}</li>
            </ul>
        </div>
        
        <div style="background: #fff3cd; padding: 20px; border-radius: 8px; border-left: 4px solid #f39c12; margin: 25px 0;">
            <h3 style="color: #856404; margin-top: 0; font-size: 18px;">⏰ What Happens Next:</h3>
            <ol style="margin: 10px 0; padding-left: 20px;">
                <li style="margin-bottom: 10px;"><strong>Review:</strong> Our team reviews your project requirements</li>
                <li style="margin-bottom: 10px;"><strong>Site Visit:</strong> We schedule a consultation at your location</li>
                <li style="margin-bottom: 10px;"><strong>Quote:</strong> You receive a detailed quote within 24-48 hours</li>
                <li style="margin-bottom: 10px;"><strong>Discussion:</strong> We discuss the quote and answer any questions</li>
            </ol>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <p style="font-size: 16px; margin-bottom: 15px;"><strong>Questions about your quote?</strong></p>
            <p style="font-size: 16px; margin-bottom: 10px;">📞 Call us: <strong>(555) 123-4567</strong></p>
            <p style="font-size: 16px;">📧 Email us: <strong>quotes@homefixandbuild.org</strong></p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
            <div style="color: #6c757d; font-size: 12px;">
                <strong>3 Boys Handyman LLC</strong><br>
                Professional Construction & Renovation Services<br>
                Licensed • Bonded • Insured
            </div>
        </div>
    </div>
</body>
</html>
  `;
}

function generateTeamNotificationEmail(quoteData, zohoResult) {
  return `
<div style="font-family: Arial, sans-serif; max-width: 600px;">
    <h2>🔨 New Quote Request</h2>
    
    <h3>Customer Information:</h3>
    <ul>
        <li><strong>Name:</strong> ${quoteData.customerName}</li>
        <li><strong>Email:</strong> ${quoteData.email}</li>
        <li><strong>Phone:</strong> ${quoteData.phone}</li>
        <li><strong>Address:</strong> ${quoteData.address}</li>
    </ul>
    
    <h3>Project Details:</h3>
    <ul>
        <li><strong>Type:</strong> ${quoteData.projectType}</li>
        <li><strong>Timeline:</strong> ${quoteData.timeframe || 'Not specified'}</li>
        <li><strong>Budget:</strong> ${quoteData.estimatedBudget || 'Not specified'}</li>
        <li><strong>Details:</strong> ${quoteData.projectDetails}</li>
    </ul>
    
    <h3>System Info:</h3>
    <ul>
        <li><strong>Project ID:</strong> ${zohoResult.projectId}</li>
        <li><strong>Submitted:</strong> ${new Date().toLocaleString()}</li>
    </ul>
    
    <p><strong>Action Required:</strong> Schedule site consultation and prepare quote.</p>
</div>
  `;
}

module.exports = { app };