import { faker } from "@faker-js/faker";

export default class User {
  private firstName: string;
  private lastName: string;
  private email: string;
  private password: string;
  private access_token: string = '';
  private userID: string = '';

  constructor() {
    this.firstName = faker.person.firstName();
    this.lastName = faker.person.lastName();
    this.email = faker.internet.email();
    this.password = 'Test@1234';
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getAccessToken(): string {
    return this.access_token;
  }

  getUserID(): string {
    return this.userID;
  }

  setAccessToken(access_token: string) {
    this.access_token = access_token;
  }

  setUserID(userID: string) {
    this.userID = userID;
  }
}
