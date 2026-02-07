import { APIRequestContext, BrowserContext, Page } from '@playwright/test';
import User from '../models/User';
import UserApi from '../apis/UserApi';

export default class RegisterPage {
  private page: Page;
  private request?: APIRequestContext;
  private context?: BrowserContext;

  //constructor
  constructor(page: Page, request?: APIRequestContext, context?: BrowserContext) {
    this.page = page;
    this.request = request;
    this.context = context;
  }
  //Elements
  private get firstNameInput() {
    return '[data-testid="first-name"]';
  }

  private get lastNameInput() {
    return '[data-testid="last-name"]';
  }

  private get emailInput() {
    return '[data-testid="email"]';
  }

  private get passwordInput() {
    return '[data-testid="password"]';
  }

  private get confirmPasswordInput() {
    return '[data-testid="confirm-password"]';
  }

  private get submitButton() {
    return '[data-testid="submit"]';
  }

  //Methods or Steps
  async load() {
    await this.page.goto('/signup');
  }

  async register(user: User) {
    await this.page.fill(this.firstNameInput, user.getFirstName());
    await this.page.fill(this.lastNameInput, user.getLastName());
    await this.page.fill(this.emailInput, user.getEmail());
    await this.page.fill(this.passwordInput, user.getPassword());
    await this.page.fill(this.confirmPasswordInput, user.getPassword());
    await this.page.click(this.submitButton);
  }

  async registerUsingApi(user: User) {
    const response = await new UserApi(this.request!).register(user);
    const responseBody = await response.json();
    const accessToken = responseBody.access_token;
    const userID = responseBody.userID;
    const firstName = responseBody.firstName;

    // Update user object with tokens for API calls
    user.setAccessToken(accessToken);
    user.setUserID(userID);

    await this.context!.addCookies([
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
  }
}
