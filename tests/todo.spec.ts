import { test, expect } from '@playwright/test';
import User from '../models/User';
import RegisterPage from '../pages/RegisterPage';
import NewTodoPage from '../pages/NewTodoPage';
import TodoPage from '../pages/TodoPage';

test('should be able to add a todo', async ({ page, request, context }) => {
  //Create a new user
  const user = new User();

  const registerPage = new RegisterPage(page, request, context);
  await registerPage.registerUsingApi(user);
  const newTodoPage = new NewTodoPage(page, request);
  await newTodoPage.load();
  await newTodoPage.addNewTask('playwright');

  const todoPage = await new TodoPage(page);
  const todoText = todoPage.getTodoTextByIndex(0);

  await expect(todoText).toHaveText('playwright');
});

test('should be able to delete a todo', async ({ page, request, context }) => {
  const user = new User();

  const registerPage = new RegisterPage(page, request, context);
  await registerPage.registerUsingApi(user);

  //Add Todo using the Api!
  const newTodoPage = new NewTodoPage(page, request);
  await newTodoPage.addNewTaskUsingApi(user);

  const todoPage = new TodoPage(page);
  await todoPage.load();
  await todoPage.deleteTodoByIndex(0);

  const notTodoMessage = todoPage.getNoTodoMessage();
  await expect(notTodoMessage).toBeVisible();
});
