import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import User from '../models/User';
import UserApi from '../apis/UserApi';
import TodoApi from '../apis/TodoApi';
import RegisterPage from '../pages/RegisterPage';

test('should be able to add a todo', async ({ page, request, context }) => {
  //Create a new user
  const user = new User(faker.person.firstName(), faker.person.lastName(), faker.internet.email(), 'Test@1234');

  const registerPage = new RegisterPage(page, request, context);
  await registerPage.registerUsingApi(user);

  // UI Steps
  await page.goto('/todo/new');
  // await page.click('[data-testid="add"]');
  await page.fill('[data-testid="new-todo"]', 'playwright');
  await page.click('[data-testid="submit-newTask"]');

  const todoItem = page.locator('[data-testid="todo-item"]').nth(0);
  await expect(todoItem).toHaveText('playwright');
});

test('should be able to delete a todo', async ({ page, request, context }) => {
  const user = new User(faker.person.firstName(), faker.person.lastName(), faker.internet.email(), 'Test@1234');

  const registerPage = new RegisterPage(page, request, context);
  await registerPage.registerUsingApi(user);

  //Add Todo using the Api!
  await new TodoApi(request).addTodo(user);

  await page.goto('/todo');
  await page.click('[data-testid="delete"]');

  const notTodoMessage = page.locator('[data-testid="no-todos"]');
  await expect(notTodoMessage).toBeVisible();
});
