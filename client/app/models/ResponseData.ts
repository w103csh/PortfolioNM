
export class ResponseData {

  constructor(
    public success: boolean,
    public message: string,
    // maybe create an interface for the data
    public data: Object,
  ) {  }

}