import Validator from 'validatorjs';
import { Question } from '../models';
import { errorResponse } from '../utils/response';
import { statusCodes } from '../utils/statuscode';
import { messages } from '../utils/message';


export const questionValidator = {

  /** This functions validates question data
      * @param {object} req - The request object
      * @param {object} res - The response oject
      * @param {function} next
      * @returns {object} JSON representing the failure message
      */
  async validateQuestion(req, res, next) {
    let {
      title, text
    } = req.body;

    const rules = {
      title: 'required',
      text: 'required'
    };

    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
        errorResponse(res, statusCodes.badRequest, validation.errors.errors);
        return;
    }
    title = title.trim();
    try {
      const foundTitle = await Question.findOne({ title });
      if (foundTitle) {
        errorResponse(res, statusCodes.conflict, messages.askedQuestion);
      }
    } catch (error) {
        errorResponse(res, statusCodes.serverError, error.message);
    }
    req.body.title = title
    req.body.text = text.trim();
    return next();
  },

  /** This function validates answer data
      * @param {object} req - The request object
      * @param {object} res - The response oject
      * @param {function} next
      * @returns {object} JSON representing the failure message
  */
  async validateAnswer(req, res, next) {
    let { text } = req.body;

    const rules = {
      text: 'required'
    };
    const validation = new Validator(req.body, rules);

    if (validation.fails()){
        errorResponse(res, statusCodes.badRequest, validation.errors.errors);
    }

    text = text.trim();
    
    req.body.text = text;
    next();
  }
};

/**
 * Returns a question document
 * If found
 */
export const getQuestionById = async (id) => {
  try {
      const question = await Question.findById(id);
      return question;
    } catch (error) {
      throw error;
    }
}