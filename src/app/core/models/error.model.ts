export class ErrorModel {
  constructor(public generalMessage: string | null, public validationErrors: { [key: string]: string[] }) {}
}
