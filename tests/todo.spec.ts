import { test, expect } from '@playwright/test';

test('should be able to add a todo', async ({ page }) => {
  // Generate a unique email to avoid "already registered" errors
  const uniqueEmail = `testuser${Date.now()}@test.com`;

  await page.goto('/signup');

  await page.fill('[data-testid="first-name"]', 'ahmed');
  await page.fill('[data-testid="last-name"]', 'kamal');
  await page.fill('[data-testid="email"]', uniqueEmail);
  await page.fill('[data-testid="password"]', 'Test@1234');
  await page.fill('[data-testid="confirm-password"]', 'Test@1234');
  await page.click('[data-testid="submit"]');

  // Wait for navigation to complete and welcome message to appear
  await expect(page.locator('[data-testid="welcome"]')).toBeVisible();

  await page.click('[data-testid="add"]');
  await page.fill('[data-testid="new-todo"]', 'playwright');
  await page.click('[data-testid="submit-newTask"]');

  const todoItem = page.locator('[data-testid="todo-item"]').nth(0);
  await expect(todoItem).toHaveText('playwright');
});
