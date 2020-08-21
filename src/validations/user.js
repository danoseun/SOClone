import Validator from 'validatorjs';
import { User } from '../models';
import { errorResponse } from '../utils/response';
import { statusCodes } from '../utils/statuscode';
import { messages } from '../utils/message';
import { comparePassword } from '../utils/password';

export const userValidator = {

  /** This functions validates signup data
      * @param {object} req - The request object
      * @param {object} res - The response oject
      * @param {function} next
      * @returns {object} JSON representing the failure message
      */
  async validateSignup(req, res, next) {
    let {
      firstname, lastname, email, password, username
    } = req.body;

    const rules = {
      firstname: 'required|min:2|max:20|alpha',
      lastname: 'required|min:2|max:20|alpha',
      email: 'required|email|min:10|max:30',
      password: 'required|min:6|max:16',
      username: 'required|string'
    };

    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
        errorResponse(res, statusCodes.badRequest, validation.errors.errors);
    }
    email = email.toLowerCase().trim();
    try {
      const userEmail = await User.findOne({ email });
      if (userEmail) {
        errorResponse(res, statusCodes.conflict, messages.usedEmail(email));
      }
    } catch (error) {
        errorResponse(res, statusCodes.serverError, error.message);
    }
    req.body.firstname = firstname.toLowerCase().trim();
    req.body.lastname = lastname.toLowerCase().trim();
    req.body.email = email;
    req.body.password = password.trim();
    req.body.username = username.trim();
    return next();
  },

  /** This function validates login data
      * @param {object} req - The request object
      * @param {object} res - The response oject
      * @param {function} next
      * @returns {object} JSON representing the failure message
  */
  async validateLogin(req, res, next) {
    let { username, password } = req.body;

    const rules = {
      username: 'required',
      password: 'required'
    };
    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
        errorResponse(res, statusCodes.badRequest, validation.errors.errors);
    }

    username = username.toLowerCase().trim();
    let foundUser;
    try {
       foundUser = await User.findOne({ username });

      if (!foundUser) {
        errorResponse(res, statusCodes.unauthorized, messages.unAuthorized);
      }
      const compare = comparePassword(password, foundUser.password);
      
      if(!compare){
        errorResponse(res, statusCodes.unauthorized, messages.unAuthorized);
      }
    } catch (error) {
        errorResponse(res, statusCodes.serverError, error.message);
    }

    
    req.body = foundUser;
    next();
  }
};