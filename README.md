# Playwright E2E Automation Framework

End-to-end test automation framework built with Playwright and TypeScript to validate core user workflows on a Todo web application.  
The project demonstrates scalable test architecture using Page Object Model, API integration, dynamic test data, and CI execution.

---

## Overview

This framework covers UI and API testing scenarios including:

- User registration
- Todo creation
- Todo deletion
- Authentication handling via API
- Cookie/session setup
- Cross-layer test orchestration

The solution is structured to emphasize maintainability, readability, and extensibility for real-world automation environments.

Target Application:  
https://todo.qacart.com/

---

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Faker (dynamic test data)
- GitHub Actions (CI)

---

## Framework Architecture

```
├── .github/workflows
│   └── main.yml                # CI pipeline
├── apis
│   ├── TodoApi.ts              # Todo API abstraction
│   └── UserApi.ts              # User API abstraction
├── models
│   └── User.ts                 # User domain model
├── pages
│   ├── RegisterPage.ts         # Registration interactions
│   ├── NewTodoPage.ts          # Todo creation interactions
│   └── TodoPage.ts             # Todo list interactions
├── tests
│   ├── user.spec.ts
│   └── todo.spec.ts
├── playwright.config.ts
└── README.md
```

---

## Design Highlights

### Page Object Model
Encapsulates UI actions and locators for separation of concerns and easier maintenance.

### API Layer Integration
User setup and Todo creation handled through API calls to:

- Reduce UI dependency
- Speed up execution
- Improve test reliability

### Dynamic Test Data
User model generates runtime data ensuring isolated and repeatable test execution.

### Environment Flexibility
Base URL handled dynamically through Playwright configuration allowing multi-environment execution.

### CI Execution
Automated execution via GitHub Actions on push to main branch.

- Installs dependencies
- Installs browsers
- Runs tests
- Uploads HTML report artifact

---

## Installation

```
git clone <repository-url>
cd playwright-e2e-automation-framework
npm install
```

Install browsers

```
npx playwright install
```

---

## Running Tests

Execute all tests

```
npx playwright test
```

Open HTML report

```
npx playwright show-report
```

---

## Continuous Integration

Tests run automatically through GitHub Actions pipeline.

Workflow includes:

- Dependency installation
- Browser setup
- Test execution
- Report artifact upload

Location:

```
.github/workflows/main.yml
```

---

## Example Covered Scenarios

- Register new user via UI
- Register user via API
- Create Todo via UI
- Create Todo via API
- Delete Todo from UI
- Validate empty state behavior

---

## Future Extensions

Potential improvements that fit this architecture:

- Multi-browser matrix execution
- Parallel environment runs
- Docker execution
- Test tagging strategy
- Allure/Advanced reporting
- Test data factories
- Retry & flaky detection policies

---

## Notes

This repository focuses on demonstrating scalable automation framework design patterns and clean test abstraction suitable for production-grade QA workflows.

