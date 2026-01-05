# Customer Pipeline Testing - Deployment Guide

## ⚠️ SAFE TESTING MODE
This branch contains test implementations that **DO NOT affect production**.

## Azure Function App Setup

### 1. Create Storage Account (Required for Functions)
```bash
az storage account create \
  --name sthealthyhomespipeline \
  --resource-group rg-healthyhomes-prod \
  --location "East US 2" \
  --sku Standard_LRS
```

### 2. Create Azure Function App
```bash
az functionapp create \
  --resource-group rg-healthyhomes-prod \
  --consumption-plan-location "East US 2" \
  --runtime node \
  --runtime-version 18 \
  --functions-version 4 \
  --name func-healthyhomes-pipeline \
  --storage-account sthealthyhomespipeline \
  --disable-app-insights false
```

### 3. Deploy Test Functions
```bash
# Navigate to azure-functions directory
cd azure-functions

# Deploy functions (requires Azure Functions Core Tools)
func azure functionapp publish func-healthyhomes-pipeline
```

## Test Workflow Execution

### 1. Trigger Test Workflow
```bash
# From feature/customer-pipeline-test branch
git add .
git commit -m "Add customer pipeline test structure"
git push -u origin feature/customer-pipeline-test
```

### 2. Manual Test Trigger
```bash
# Via GitHub CLI (if installed)
gh workflow run "TEST - Customer Pipeline (Safe Testing)" --ref feature/customer-pipeline-test
```

### 3. Monitor Test Results
- Check GitHub Actions tab for workflow results
- Review test outputs for mock notifications
- Verify no production deployments occurred

## Next Implementation Phases

### Phase 2: Real Azure Functions
- Deploy actual notification functions
- Set up SendGrid email service
- Configure GitHub webhooks

### Phase 3: Customer Integration
- Set up email forwarding (SendGrid Inbound Parse)
- Implement PR auto-approval logic
- Add Teams/Slack notifications

### Phase 4: Production Deployment
- Create production workflow
- Set up branch protection rules
- Enable customer approval process

## Required GitHub Secrets

Add these to repository settings:
```
AZURE_FUNCTION_KEY=<function app key>
SENDGRID_API_KEY=<sendgrid api key>
GITHUB_TOKEN=<personal access token>
CUSTOMER_EMAIL=customer@3boyslawton.com
```

## Testing Commands

### Test Azure Function Locally
```bash
# Start local functions
func start

# Test staging notification
curl -X POST http://localhost:7071/api/test-staging-deployed \
  -H "Content-Type: application/json" \
  -d '{
    "repository": "ljohnson2382/3-Boys-Handyman-LLC",
    "staging_url": "https://staging.homefixandbuild.org",
    "commit_message": "Test customer notification",
    "author": "Developer"
  }'
```

### Test Email Processing
```bash
curl -X POST http://localhost:7071/api/test-email-processor \
  -H "Content-Type: application/json" \
  -d '{
    "from": "customer@3boyslawton.com",
    "subject": "Re: Website Updates Ready",
    "body": "APPROVE - looks great!"
  }'
```

## Safety Features

✅ **Test branch only** - No main branch modifications
✅ **Mock functions** - No real emails or deployments  
✅ **Isolated testing** - Separate Azure resources
✅ **Draft PRs** - No accidental merges
✅ **Extensive logging** - Full test visibility

Ready to proceed with safe testing!