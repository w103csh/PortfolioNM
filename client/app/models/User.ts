
export class User {

  constructor(
    public email: string,
    public password: string,
    public id: string,
    public firstName?: string,
    public lastName?: string,
    public rememberMe?: boolean,
  ) {  }

}