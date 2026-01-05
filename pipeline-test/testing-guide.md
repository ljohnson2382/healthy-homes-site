# 🧪 Customer Pipeline Testing Guide

## Overview
This guide explains how to test the customer notification and feedback pipeline safely without affecting production.

## Test Environment Setup

### Branch Structure
- **Production**: `main` branch (homefixandbuild.org)
- **Staging**: `staging` branch (staging.homefixandbuild.org) 
- **Testing**: `feature/customer-pipeline-test` branch (safe testing)

### Testing Strategy
1. **Mock Functions**: Test Azure Functions without real deployments
2. **Browser Testing**: Easy manual testing via GET endpoints
3. **Automated Testing**: GitHub Actions validation
4. **Safety Checks**: Prevent accidental production impacts

## 🚀 Quick Testing Methods

### 1. Browser Testing (Manual)

#### Test Customer Notification
```
https://func-healthyhomes-pipeline.azurewebsites.net/api/test-staging-deployed?test=true
```

#### Test Customer Email Processing
```
# Test approval response
https://func-healthyhomes-pipeline.azurewebsites.net/api/test-email-processor?test=true&type=approve

# Test rejection response  
https://func-healthyhomes-pipeline.azurewebsites.net/api/test-email-processor?test=true&type=reject

# Test comment response
https://func-healthyhomes-pipeline.azurewebsites.net/api/test-email-processor?test=true&type=comment
```

### 2. GitHub Actions Testing

#### Trigger Comprehensive Test Suite
```bash
# Push to test branch triggers full pipeline test
git push origin feature/customer-pipeline-test
```

#### Manual Workflow Trigger
1. Go to GitHub Actions
2. Select "Test Customer Pipeline" workflow  
3. Click "Run workflow"
4. Choose branch: `feature/customer-pipeline-test`

## 🧪 Test Scenarios

### Scenario 1: Customer Approves Changes
**Test**: GET `/api/test-email-processor?type=approve`

**Expected Response**:
```json
{
  "action": "approve",
  "pr_number": "TEST-123", 
  "customer_decision": "approved",
  "would_perform": "Auto-approve PR and deploy to production",
  "github_api_calls": [
    "POST /repos/.../pulls/{pr_number}/reviews (APPROVE)",
    "PUT /repos/.../pulls/{pr_number}/merge"
  ]
}
```

### Scenario 2: Customer Requests Changes
**Test**: GET `/api/test-email-processor?type=reject`

**Expected Response**:
```json
{
  "action": "request_changes",
  "customer_decision": "needs_changes", 
  "would_perform": "Add feedback comment and request changes on PR"
}
```

### Scenario 3: Staging Deployment Notification  
**Test**: GET `/api/test-staging-deployed?test=true`

**Expected Response**:
```json
{
  "message": "TEST: Customer notification mock successful",
  "email_payload": {
    "to": "test-customer@example.com",
    "subject": "[TEST] 🚀 3 Boys Handyman - New Website Updates Ready for Review"
  },
  "test_mode": true
}
```

## 📋 Test Checklist

### ✅ Pre-Deployment Tests
- [ ] Mock functions respond correctly
- [ ] Email templates render properly  
- [ ] Customer responses are parsed accurately
- [ ] GitHub API calls are formatted correctly
- [ ] Test mode flags are working
- [ ] No production resources are affected

### ✅ Integration Tests  
- [ ] Webhook triggers work
- [ ] Email service integration
- [ ] Teams/Slack notifications  
- [ ] GitHub PR management
- [ ] Error handling and logging

### ✅ Safety Checks
- [ ] Production branch protection
- [ ] Test mode isolation
- [ ] Rollback procedures
- [ ] Environment variable validation

## 🛠️ Development Workflow

### Adding New Features
1. **Create feature branch**: `git checkout -b feature/new-pipeline-feature`
2. **Modify test functions**: Update `azure-functions/test-functions.js`
3. **Test locally**: Use browser testing endpoints
4. **Run CI tests**: Push to trigger automated testing
5. **Validate safety**: Ensure no production impact
6. **Merge to test branch**: For integration testing

### Debugging Issues
1. **Check logs**: Azure Functions logs show detailed test output
2. **Test incrementally**: Use individual endpoints to isolate issues
3. **Validate inputs**: Ensure test data matches expected formats
4. **Review responses**: Compare actual vs expected JSON responses

## 🔧 Configuration

### Environment Variables (Test Mode)
```bash
TEST_MODE=true                    # Enables test mode globally
AZURE_FUNCTION_KEY=<test-key>     # Function access key
SENDGRID_API_KEY=<test-key>      # Email service (test mode)
GITHUB_TOKEN=<test-token>         # GitHub API access
```

### Test Data Examples

#### Mock Staging Deployment
```json
{
  "repository": "ljohnson2382/3-Boys-Handyman-LLC",
  "commit_sha": "test-sha-123", 
  "commit_message": "Test deployment for pipeline validation",
  "staging_url": "https://staging.homefixandbuild.org",
  "author": "Test User"
}
```

#### Mock Customer Email Response
```json
{
  "from": "customer@3boyslawton.com",
  "subject": "RE: [PR #123] 3 Boys Handyman - Website Updates", 
  "body": "✅ This looks great! Please deploy to production. APPROVED."
}
```

## 🚨 Safety Guidelines

### Never Do This ❌
- Don't test on `main` branch
- Don't use production email addresses in tests
- Don't trigger real deployments during testing
- Don't commit secrets to repository

### Always Do This ✅
- Use `feature/customer-pipeline-test` branch
- Enable test mode (`?test=true`)
- Verify mock responses before real deployment
- Review logs for unexpected behavior
- Test rollback procedures

## 📞 Support

### Common Issues
1. **404 Function Not Found**: Ensure Azure Function App is deployed
2. **Authentication Error**: Check function keys and permissions  
3. **Test Mode Not Active**: Add `?test=true` to URLs
4. **GitHub API Errors**: Verify token permissions and rate limits

### Getting Help
- Review Azure Function logs for detailed error information
- Check GitHub Actions logs for CI/CD issues
- Test individual components before full integration
- Use browser developer tools to inspect responses

---

## 🎯 Next Steps

After comprehensive testing, you'll be ready to:

1. **Deploy to Azure**: Create real Azure Function App
2. **Configure Production**: Set up SendGrid, GitHub webhooks
3. **Enable Customer Loop**: Activate email-based approvals
4. **Monitor & Iterate**: Track success metrics and improve workflow

**Ready to deploy?** See [deployment-guide.md](deployment-guide.md) for production setup instructions.