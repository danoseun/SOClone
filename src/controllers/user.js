import { User } from '../models';
import { hashPassword } from '../utils/password';
import { createToken } from '../middleware';
import { errorResponse, successResponse, successResponseWithData } from '../utils/response';
import { statusCodes } from '../utils/statuscode';
import { messages } from '../utils/message';

export const userController = {
  /**
     * Create user account on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof userController object
     */

  async signupUser(req, res) {
    const {
        firstname,lastname, email, password, username
    } = req.body;
    const hash = hashPassword(password);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hash,
      username
    });

    try {
      const result = await newUser.save();
      successResponseWithData(res, statusCodes.created, messages.created, result);
    } catch (error) {
        errorResponse(res, statusCodes.serverError, error.message);
    }
  },

  /**
     * Log user in to the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof userController object
     */

  async loginUser(req, res) {
    try {
      const token = createToken(req.body);
      successResponseWithData(res, statusCodes.success, messages.loggedIn, token);
    } catch (error) {
        errorResponse(res, statusCodes.serverError, error.message);
    }
  }
};