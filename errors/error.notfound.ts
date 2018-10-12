import { ApplicationError } from './error.application';
export class NotFoundError extends ApplicationError {
  readonly name: string = "Not Found";
  readonly status: number = 404;
}
