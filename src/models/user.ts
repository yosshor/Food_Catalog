/// enum for user type
export enum UserType {
  Admin = "Admin",
  Customer = "Customer"
}

/// User model
export class User {
  public id: string;
  public type: UserType;
  public email: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public address?: string;
  public phoneNumber: string;
  constructor(type: UserType, email: string, password: string, firstName: string, lastName: string, phoneNumber: string, address?: string) {
    this.id = `id${crypto.randomUUID()}`;
    this.type = type;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.address = address;
  }
}
