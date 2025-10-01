# Swag Labs Test Automation

End-to-end test automation framework for Swag Labs application using Playwright.

## Features

- **Cross-browser/device Testing**
  - Chrome (Desktop)
  - Firefox (Desktop)
  - Mobile Chrome (Pixel 5)
  - iPad Pro

- **Environment Support**
  - Local
  - Stage
  - Production
  - Configure via `src/config/env.config.ts`
  - Run with `ENV=local|stage|prod npm run ui:desktop|ui:devices`

## Project Structure

```
swag-labs-test/
├── src/
│   ├── config/         # Environment and page loader configurations
│   └── gui/            # GUI components
│       ├── pages/      # Page objects with fluent API
│       └── panels/     # Reusable UI components (MenuPanel)
├── tests/              # Test specifications
├── test-results/       # Test artifacts (reports, traces, etc.)
└── playwright.config.ts
```

## Best Practices

1. **Page Objects**
   - Use fluent API for better readability
   - Built-in assertions & test data access file
   - Initialize locators at class level
   - Return page objects for navigation
   - Single point import via page-loader
   - Use composition for common components (e.g., MenuPanel)

2. **Test Cases**
   - One assertion per test
   - Use fluent chain for test steps
   - Keep tests independent with domain-friendly scenarios (user journey based)
   - No shared state between tests
   - Focus on business flows over technical details

3. **Configuration**
   - Use TypeScript for type safety
   - Configure timeouts in playwright.config.ts
   - Set environment-specific settings in env.config.ts
   - Enable console logging for real-time test feedback

4. **Reporting**
   - Use multiple reporters for different purposes
   - List reporter for console output
   - HTML reporter for detailed test results
   - Allure reporter for comprehensive test reports

## Example Test

```typescript
test('should login successfully', async ({ page }) => {
  await new LoginPage(page)
    .navigate()
    .then(page => page.enterUsername('Admin'))
    .then(page => page.enterPassword('admin123'))
    .then(page => page.clickLogin())
    .then(home => home.verifyBrowserState());
});
```

## Available Scripts

### Desktop Testing
- `npm run ui:headed` - Run tests in headed mode (Chrome, single worker, with tracing)
- `npm run ui:headless` - Run tests in headless mode
- `npm run ui:desktop` - Run tests on Chrome and Firefox

### Device Testing
- `npm run ui:devices` - Run tests on Mobile Chrome and iPad Pro

### Debug & Reports
- `npm run ui:debug` - Run tests in debug mode
- `npm run ui:gui` - Open Playwright UI mode
- `npm run gen:report` - Show HTML test report


### Code Quality
- `npm run audit` - Run TypeScript type checking

## Environment Configuration

Tests can be run against different environments:

```bash
# Run desktop tests against staging
ENV=stage npm run ui:desktop

# Run device tests against production
ENV=prod npm run ui:devices
```

## Console Output

The framework includes real-time console logging during test execution:

```bash
Running 6 tests using 1 worker

  ✓ [chromium] › swag-login.spec.ts:12:3 › should login successfully (3.2s)
  ✓ [chromium] › swag-cart.spec.ts:11:3 › should add single product to cart (2.8s)
  
6 passed (18.5s)
```

## Test Reports

### Allure Report
Run tests and generate Allure report:
screenshot attachment, Full error stack traces, Filter by status, severity, and more
```bash
npm run ui:headed
npm run gen:report
```

The Allure report includes:
- **Screenshots**: Automatically attached for failed test cases
- **Error Stack Traces**: Complete error details for debugging
- **Videos**: Recording of test execution (on first retry)
- **Traces**: Playwright traces for detailed inspection
- **Test Metrics**: Duration, status, and trend analysis
- **Interactive Dashboard**: Filter and search capabilities

### Playwright HTML Report
- HTML reports are also generated in `test-results/index.html`
- Screenshots, videos, and traces are saved on failure

## CI/CD Pipeline

### GitHub Actions
The project includes a CI/CD pipeline that:
- Runs tests in parallel with 2 workers (sharded execution)
- Executes on push to `main` and `develop` branches
- Runs on pull requests
- Generates and deploys Allure reports to GitHub Pages
- Uploads test artifacts for 30 days

### Pipeline Features
- **Parallel Execution**: Tests split across 2 workers for faster execution
- **Environment**: Runs tests against staging environment
- **Artifacts**: Test results and Allure reports saved
- **Report Deployment**: Automatic deployment to GitHub Pages
- **Manual Trigger**: Can be triggered manually via workflow_dispatch

### Viewing CI Reports
After pipeline execution, view the Allure report at:
```
https://<your-username>.github.io/<repository-name>
```
