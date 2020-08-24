import { Question } from '../models';
import { pusher } from '../config/pusher';
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
    let { page, perPage, title } = req.query;
    perPage = perPage ? Number(perPage, 10) : 10;
    page = page ? Number(page, 10) : 1;
    
      try {
          if(title) {
            title = title.trim();
            let result = await Question.find({title:{'$regex' : `${title}`, '$options' : 'i'}}).skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ date: -1 })
        .exec();
        result.length > 0 ? successResponseWithData(res, statusCodes.success, messages.ok, result) : successResponse(res, statusCodes.notFound, messages.notFound);
        return;
        }
        let questions = await Question.find().sort({ date: 'desc' });
        questions ? successResponseWithData(res, statusCodes.success, messages.ok, questions) : successResponse(res, statusCodes.notFound, messages.notFound);
      } catch(error){
        errorResponse(res, statusCodes.serverError, error.message);
        return;
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
            return;
          }
          const newAnswer = {
            user: req.authData.payload._id,
            text: req.body.text,
            name: req.authData.payload.username
        };
        question.answers.unshift(newAnswer);
        question = await question.save();
        const message = `${newAnswer.name} just answered your question`
        pusher.trigger('stackoverflow-notifications', `notify-${question.user}`, { message });
        successResponseWithData(res, statusCodes.created, messages.ok, question);
        return;
      } catch(error){
        errorResponse(res, statusCodes.serverError, error.message);
        return;
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
                return;
            }
            else {
                if(question.upvotes.some(vote => vote.user.toString() === req.authData.payload._id)){
                    errorResponse(res, statusCodes.badRequest, messages.alreadyUpvoted);
                    return;
                }
                question.upvotes.unshift({ user: req.authData.payload._id });
                await question.save();
                successResponseWithData(res, statusCodes.created, messages.ok, question);
                return;
            }
        } catch(error){
            errorResponse(res, statusCodes.serverError, error.message);
            return;
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
                return;
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
            return;
        }
    },

    /**
     * Search for Questions by title on the application
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof questionController object
     */
    async searchQuestions(req, res){
        let { page, perPage, username } = req.query;
        perPage = perPage ? Number(perPage, 10) : 10;
        page = page ? Number(page, 10) : 1;
        username = username.trim();
      
        let result = await Question.find({username:{'$regex' : `${title}`, '$options' : 'i'}}).skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ date: -1 })
        .exec();
        result.length > 0 ? successResponseWithData(res, statusCodes.success, messages.ok, result) : successResponse(res, statusCodes.notFound, messages.notFound);
        return;
      }
};






        
        
        