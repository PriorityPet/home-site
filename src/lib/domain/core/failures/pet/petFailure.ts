import { Failure } from "../failure";

export class PetFailure extends Failure {}

export const enum petFailuresEnum {
  uploadPictureError = "UPLOAD_PICTURE_ERROR",
  serverError = "SERVER_ERROR"
}
