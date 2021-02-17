class AppError {
  public readonly message: string;

  public readonly statusCosde: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCosde = statusCode;
  }
}
export default AppError;
