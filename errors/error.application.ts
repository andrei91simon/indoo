import { VError } from 'verror';

export class ApplicationError extends VError {
  readonly name: string = "Application Error";
  readonly status: number = 500;
}
