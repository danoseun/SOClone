import { User } from '../models';
import { hashPassword } from '../utils/password';
import { createToken } from '../middleware';
import { errorResponse, successResponse, successResponseWithData } from '../utils/response';
import { statusCodes } from '../utils/statuscode';
import { messages } from '../utils/message';

export const userController = {
  /**
     * Create user account on the application
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
      return;
    } catch (error) {
        errorResponse(res, statusCodes.serverError, error.message);
        return;
    }
  },

  /**
     * Log user in to the application
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof userController object
     */

  async loginUser(req, res) {
    try {
      const token = createToken(req.body);
      successResponseWithData(res, statusCodes.success, messages.loggedIn, token);
      return;
    } catch (error) {
        errorResponse(res, statusCodes.serverError, error.message);
    }
  },

  /**
     * Search for users by username on the application
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof userController object
     */
    async searchUsers(req, res){
      let { page, perPage, username } = req.query;
      perPage = perPage ? Number(perPage, 10) : 10;
      page = page ? Number(page, 10) : 1;
  
      try {
        username = username.trim();
        let result = await User.find({username:{'$regex' : `${username}`, '$options' : 'i'}}).select(['-password']).skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ date: -1 })
      .exec();
      result.length > 0 ? successResponseWithData(res, statusCodes.success, messages.ok, result) : successResponse(res, statusCodes.notFound, messages.notFound);
      return;
      }catch(error){
        errorResponse(res, statusCodes.serverError, error.message);
      }
    }
};