import { test, expect } from '@playwright/test';
import User from '../models/User';
import RegisterPage from '../pages/RegisterPage';
import TodoPage from '../pages/TodoPage';

test('should be able to register to the todo website', async ({ page, request, context }) => {
  const user = new User();

  const registerPage = new RegisterPage(page, request, context);
  await registerPage.load();
  await registerPage.register(user);
  const todoPage = new TodoPage(page);

  const welcomeMessage = todoPage.getWelcomeMessage();
  await expect(welcomeMessage).toBeVisible();
});
