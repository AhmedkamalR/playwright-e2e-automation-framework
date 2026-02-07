import { test, expect } from '@playwright/test';

test('should be able to register to the todo website', async ({ page }) => {
  // Generate a unique email to avoid "already registered" errors
  const uniqueEmail = `testuser${Date.now()}@test.com`;

  await page.goto('/signup');

  await page.fill('[data-testid="first-name"]', 'ahmed');
  await page.fill('[data-testid="last-name"]', 'kamal');
  await page.fill('[data-testid="email"]', uniqueEmail);
  await page.fill('[data-testid="password"]', 'Test@1234');
  await page.fill('[data-testid="confirm-password"]', 'Test@1234');
  await page.click('[data-testid="submit"]');

  const welcomeMessage = page.locator('[data-testid="welcome"]');

  await expect(welcomeMessage).toBeVisible();
});
