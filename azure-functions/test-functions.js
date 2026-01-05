// TEST FUNCTIONS - Customer Pipeline for func-healthyhomes-pipeline
// Safe testing version - no real deployments or emails

const { app } = require('@azure/functions');

// TEST: Customer notification when staging deploys
app.http('test-staging-deployed', {
    methods: ['POST'],
    authLevel: 'function',
    handler: async (request, context) => {
        try {
            const payload = await request.json();
            
            context.log('🧪 TEST: Staging deployment notification received:', payload);
            
            // Mock customer email template
            const mockEmail = {
                to: 'customer@3boyslawton.com',
                from: 'noreply@homefixandbuild.org',
                subject: '🚀 3 Boys Handyman - New Website Updates Ready for Review',
                html: generateCustomerEmailHTML(payload),
                test_mode: true
            };
            
            context.log('📧 Would send customer email:', mockEmail);
            
            // Mock Teams/Slack notification
            const mockTeamsMessage = {
                title: '🚀 Customer Review Required',
                text: `New staging deployment ready for customer approval`,
                staging_url: payload.staging_url,
                test_mode: true
            };
            
            context.log('💬 Would post to Teams:', mockTeamsMessage);
            
            return { 
                status: 200, 
                jsonBody: { 
                    message: 'TEST: Customer notification mock successful',
                    email_payload: mockEmail,
                    teams_payload: mockTeamsMessage,
                    staging_url: payload.staging_url,
                    test_mode: true
                }
            };
        } catch (error) {
            context.error('Test error:', error);
            return { 
                status: 500, 
                jsonBody: { error: error.message, test_mode: true }
            };
        }
    }
});

// TEST: Customer email response processing
app.http('test-email-processor', {
    methods: ['POST'],
    authLevel: 'function',
    handler: async (request, context) => {
        try {
            const emailData = await request.json();
            
            context.log('🧪 TEST: Customer email response received:', emailData);
            
            // Mock PR processing logic
            const customerResponse = emailData.body || '';
            let action = 'unknown';
            
            if (customerResponse.toLowerCase().includes('approve') || customerResponse.includes('✅')) {
                action = 'approve';
            } else if (customerResponse.toLowerCase().includes('request changes') || customerResponse.includes('❌')) {
                action = 'request_changes';
            } else {
                action = 'comment';
            }
            
            const mockResponse = {
                action: action,
                pr_number: 'TEST-123',
                customer_email: emailData.from,
                customer_response: customerResponse,
                would_perform: getActionDescription(action),
                github_api_calls: getMockGitHubCalls(action),
                test_mode: true
            };
            
            context.log('🔄 Would perform GitHub actions:', mockResponse);
            
            return { 
                status: 200, 
                jsonBody: mockResponse
            };
        } catch (error) {
            context.error('Test email processing error:', error);
            return { 
                status: 500, 
                jsonBody: { error: error.message, test_mode: true }
            };
        }
    }
});

// Helper function to generate customer email HTML
function generateCustomerEmailHTML(payload) {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #0d1b2a; color: white; padding: 20px; text-align: center;">
                <h1 style="margin: 0; color: #ff6b35;">3 Boys Handyman LLC</h1>
                <h2 style="margin: 10px 0 0 0;">Website Updates Ready for Review</h2>
            </div>
            
            <div style="padding: 30px; background: #f9f9f9;">
                <h3>🌐 Preview Your Changes</h3>
                <p>New changes deployed to staging:</p>
                
                <div style="text-align: center; margin: 20px 0;">
                    <a href="${payload.staging_url}" 
                       style="background: #ff6b35; color: white; padding: 15px 30px; 
                              text-decoration: none; border-radius: 5px;">
                        👀 VIEW STAGING SITE
                    </a>
                </div>
                
                <div style="background: white; padding: 15px; border-radius: 8px;">
                    <strong>Changes:</strong> ${payload.commit_message}
                </div>
                
                <h3>📧 How to Respond</h3>
                <p>Reply to this email with:</p>
                <div style="background: #e8f5e8; padding: 10px; margin: 5px 0;">✅ APPROVE - Deploy to production</div>
                <div style="background: #fff2e8; padding: 10px; margin: 5px 0;">❌ REQUEST CHANGES - Include feedback</div>
                <div style="background: #e8f2ff; padding: 10px; margin: 5px 0;">💬 COMMENT - Add notes</div>
            </div>
        </div>
    `;
}

function getActionDescription(action) {
    switch(action) {
        case 'approve': return 'Auto-approve PR and deploy to production';
        case 'request_changes': return 'Add feedback comment and request changes on PR';
        case 'comment': return 'Add general comment to PR';
        default: return 'No action (unclear customer response)';
    }
}

function getMockGitHubCalls(action) {
    switch(action) {
        case 'approve':
            return [
                'POST /repos/ljohnson2382/3-Boys-Handyman-LLC/pulls/{pr_number}/reviews (APPROVE)',
                'PUT /repos/ljohnson2382/3-Boys-Handyman-LLC/pulls/{pr_number}/merge'
            ];
        case 'request_changes':
            return [
                'POST /repos/ljohnson2382/3-Boys-Handyman-LLC/pulls/{pr_number}/reviews (REQUEST_CHANGES)',
                'POST /repos/ljohnson2382/3-Boys-Handyman-LLC/issues/{pr_number}/comments'
            ];
        case 'comment':
            return [
                'POST /repos/ljohnson2382/3-Boys-Handyman-LLC/issues/{pr_number}/comments'
            ];
        default:
            return [];
    }
}