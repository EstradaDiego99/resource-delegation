export default class ModelError extends Error {
  /** @type { [string] : string } The reason of invalidation for each field of the model. */
  err;

  constructor(message, err) {
    super(message);
    this.name = "ModelError";

    this.err = err;
  }
}
