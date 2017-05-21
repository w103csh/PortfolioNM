
export class User {
  constructor(
    public email: string,
    public id?: string,
    public firstName?: string,
    public lastName?: string,
    public password?: string,
    public rememberMe?: boolean,
    public address?: string,
    public address2?: string,
    public city?: string,
    public state?: string,
    public zip?: string,
    public phone?: string,
  ) { }

  // TODO: Write the below methods with generics and extend them for the models
  // I know this is easy to do in C#. Not sure about Typescript.
  // If you do this again you should really change this. Its really dumb.

  copy(): User {
    return new User(
      this.email,
      this.id,
      this.firstName,
      this.lastName,
      this.password,
      this.rememberMe,
      this.address,
      this.address2,
      this.city,
      this.state,
      this.zip,
      this.phone,
    );
  }

  isDiff(user: User): boolean {
    return user.email != this.email ||
      user.id != this.id ||
      user.firstName != this.firstName ||
      user.lastName != this.lastName ||
      user.password != this.password ||
      user.rememberMe != this.rememberMe ||
      user.address != this.address ||
      user.address2 != this.address2 ||
      user.city != this.city ||
      user.state != this.state ||
      user.zip != this.zip ||
      user.phone != this.phone;
  }
}