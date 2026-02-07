import { Page } from '@playwright/test';

export default class TodoPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private get welcomeMessage() {
    return '[data-testid="welcome"]';
  }

  private get todoItem() {
    return '[data-testid="todo-item"]';
  }

  getWelcomeMessage() {
    return this.page.locator(this.welcomeMessage);
  }

  getTodoTextByIndex(index: number) {
    return this.page.locator(this.todoItem).nth(index);
  }
}
