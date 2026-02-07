import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import User from '../models/User';
import UserApi from '../apis/UserApi';
import TodoApi from '../apis/TodoApi';

test('should be able to add a todo', async ({ page, request, context }) => {
  const user = new User(faker.person.firstName(), faker.person.lastName(), faker.internet.email(), 'Test@1234');

  //Register using API
  const response = await new UserApi(request).register(user);

  const responseBody = await response.json();

  const accessToken = responseBody.access_token;
  const userID = responseBody.userID;
  const firstName = responseBody.firstName;

  await context.addCookies([
    {
      name: 'access_token',
      value: accessToken,
      url: 'https://todo.qacart.com/',
    },
    {
      name: 'firstName',
      value: firstName,
      url: 'https://todo.qacart.com/',
    },
    {
      name: 'userID',
      value: userID,
      url: 'https://todo.qacart.com/',
    },
  ]);

  await page.goto('/todo');
  await page.click('[data-testid="add"]');
  await page.fill('[data-testid="new-todo"]', 'playwright');
  await page.click('[data-testid="submit-newTask"]');

  const todoItem = page.locator('[data-testid="todo-item"]').nth(0);
  await expect(todoItem).toHaveText('playwright');
});

test('should be able to delete a todo', async ({ page, request, context }) => {
  const user = new User(faker.person.firstName(), faker.person.lastName(), faker.internet.email(), 'Test@1234');

  const response = await new UserApi(request).register(user);


  const responseBody = await response.json();

  const accessToken = responseBody.access_token;
  const userID = responseBody.userID;
  const firstName = responseBody.firstName;

  user.setAccessToken(accessToken);
  user.setUserID(userID);

  await context.addCookies([
    {
      name: 'access_token',
      value: accessToken,
      url: 'https://todo.qacart.com/',
    },
    {
      name: 'firstName',
      value: firstName,
      url: 'https://todo.qacart.com/',
    },
    {
      name: 'userID',
      value: userID,
      url: 'https://todo.qacart.com/',
    },
  ]);

  //Add Todo using the Api!

  await new TodoApi(request).addTodo(user);
 

  await page.goto('/todo');
  await page.click('[data-testid="delete"]');

  const notTodoMessage = page.locator('[data-testid="no-todos"]');
  await expect(notTodoMessage).toBeVisible();
});
