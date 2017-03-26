
export class User {

  constructor(
    public email: string,
    public id?: string,
    public firstName?: string,
    public lastName?: string,
    public password?: string,
    public rememberMe?: boolean,
  ) {  }

}