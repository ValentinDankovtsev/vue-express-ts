
 export type ErrorDetail = {
  [key: string]: string[];
};

export class HttpException extends Error {
  public status: number;
  public errors: ErrorDetail[];

  constructor(status: number, errors: ErrorDetail[]) {
    super();
    this.status = status;
    this.errors = errors;
  }
}
