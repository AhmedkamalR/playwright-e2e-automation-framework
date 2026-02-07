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

  private get deleteIcon() {
    return '[data-testid="delete"]';
  }

  private get noTodoMessage() {
    return '[data-testid="no-todos"]';
  }

  async load(){
   await this.page.goto('/todo');
  }

  getWelcomeMessage() {
    return this.page.locator(this.welcomeMessage);
  }

  getTodoTextByIndex(index: number) {
    return this.page.locator(this.todoItem).nth(index);
  }

  async deleteTodoByIndex(index: number){
    await this.page.locator(this.deleteIcon).nth(index).click();
  }   

  getNoTodoMessage() {
    return this.page.locator(this.noTodoMessage);
  }
}
