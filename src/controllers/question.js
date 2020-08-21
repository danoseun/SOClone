import { Question } from '../models';
import { errorResponse, successResponse, successResponseWithData } from '../utils/response';
import { statusCodes } from '../utils/statuscode';
import { messages } from '../utils/message';
import { getQuestionById } from '../validations/question';

export const questionController = {
  /**
     * Ask question on the application
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof questionController object
     */

  async askQuestion(req, res) {
    const {
        title, text
    } = req.body;
   

    const newQuestion = new Question({
      user:req.authData.payload._id,
      title,
      text,
      name:req.authData.payload.username
    });

    try {
      const result = await newQuestion.save();
      successResponseWithData(res, statusCodes.created, messages.created, result);
    } catch (error) {
        errorResponse(res, statusCodes.serverError, error.message);
    }
  },

  /**
     * View questions on the application
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof questionController object
     */
  async viewQuestions(req, res){
      try{
        let questions = await Question.find().sort({ date: 'desc' });
        questions ? successResponseWithData(res, statusCodes.success, messages.ok, questions) : successResponse(res, statusCodes.notFound, messages.notFound);
      } catch(error){
        errorResponse(res, statusCodes.serverError, error.message);
      }   
  },

  /**
     * Answer a particular question on the application
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof questionController object
     */
  async answerQuestion(req, res){
      let question;
      try {
          question = await getQuestionById(req.params.id);
          if(!question){
            successResponse(res, statusCodes.notFound, messages.notFound);
          }
          const newAnswer = {
            user: req.authData.payload._id,
            text: req.body.text,
            name: req.authData.payload.username
        };
        question.answers.unshift(newAnswer);
        question = await question.save();
        successResponseWithData(res, statusCodes.success, messages.ok, question);
      } catch(error){
        errorResponse(res, statusCodes.serverError, error.message);
      }
  },
  
  /**
     * Upvote a particular question on the application
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof questionController object
     */
    async upVoteQuestion(req,res){
        let question;
        try {
            question = await getQuestionById(req.params.id);
            if(!question){
                successResponse(res, statusCodes.notFound, messages.notFound);
            }
            else {
                if(question.upvotes.some(vote => vote.user.toString() === req.authData.payload._id)){
                    errorResponse(res, statusCodes.badRequest, messages.alreadyUpvoted);
                    return;
                }
                question.upvotes.unshift({ user: req.authData.payload._id });
                await question.save();
                successResponseWithData(res, statusCodes.success, messages.ok, question);
                return;
            }
        } catch(error){
            errorResponse(res, statusCodes.serverError, error.message);
          }
    },

    /**
     * DownVote a particular question on the application
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof questionController object
     */
    async downVoteQuestion(req, res){
        let question;
        try {
            question = await getQuestionById(req.params.id);
            if(!question){
                successResponse(res, statusCodes.notFound, messages.notFound);
            }
            else {
                if(!question.upvotes.some(vote => vote.user.toString() === req.authData.payload._id)){
                    errorResponse(res, statusCodes.badRequest, messages.notUpvoted);
                    return;
                }
                question.upvotes = question.upvotes.filter(({ user }) => user.toString() !== req.authData.payload._id);
                await question.save();
                successResponseWithData(res, statusCodes.success, messages.downVoted, question);
                return;
            }
        } catch(error){
            errorResponse(res, statusCodes.serverError, error.message);
        }
    }
};






        
        
        