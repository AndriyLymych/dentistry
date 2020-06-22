const Joi = require('joi');

const {ResponseStatusCodes} = require('../../constant');
const {doctorRatingService} = require('../../services');
const {doctorMarkValidator} = require('../../validators');
const CustomError = require('../../error/CustomError');

module.exports = async (req, res, next) => {
    try {

        const evaluatedData = req.body;
        const {user_id} = req.user;
        const {doctor_id} = req.query;

        evaluatedData.user_id = user_id;
        evaluatedData.doctor_id = doctor_id;
        evaluatedData.isEvaluated = true;

        const validatedDoctorMark = Joi.validate(evaluatedData, doctorMarkValidator);

        if (validatedDoctorMark.error) {

            throw new CustomError(validatedDoctorMark.error.details[0].message, 400, 'evaluate doctor');
        }

        await doctorRatingService.setDoctorMark(evaluatedData);


        res.status(ResponseStatusCodes.CREATED).end();

    } catch (e) {
        next(new CustomError(e))
    }
};