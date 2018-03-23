class CustomErrors extends Error {
  message: string;
  stage: string;
  constructor(message: string, stage: string) {
    super(message);
    this.message = message;
    this.stage = stage;
  }
}

export { CustomErrors };
