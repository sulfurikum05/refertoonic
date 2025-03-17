// Local Modules
import AuthService from "./auth.service";
import { ErrorsUtil } from "../utils";

const { UnauthorizedError } = ErrorsUtil;

export default class AuthMiddlaware {
  static async authenticate(accessToken) {
    try {
      if (!accessToken)
        throw new UnauthorizedError("Missing authorization header");
      if (!accessToken) throw new UnauthorizedError("Missing access token");
      const id = await AuthService.validateAccessToken(accessToken);
      if (!id) throw new UnauthorizedError("Invalid token");
      return id;
    } catch (error) {
      console.log(error);
    }
  }
}
