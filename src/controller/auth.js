import { signUpService, signInService } from "../service/auth.js";

class AuthController {
  async create(req, res) {
    const { fullname, email, password } = req.body;

    try {
      const result = await signUpService({
        fullname,
        email,
        password,
      });
      return result.EC === 0
        ? res.success(null, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError(error.message);
    }
  }

  async userSignIn(req, res) {
    const { email, password } = req.body;

    try {
      const result = await signInService(email, password);
      return result.EC === 0
        ? res.success(result.access_token, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError(error.message);
    }
  }
}

export default new AuthController();
