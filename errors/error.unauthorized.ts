import { ApplicationError } from './error.application';
export class UnauthorizedError extends ApplicationError {
  readonly name: string = "Unauthorized Error";
  readonly status: number = 401;
}
