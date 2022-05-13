//* validators/register.validator.js
import Joi from 'joi';

const fantasyMovieSchema = Joi.object({
    name: Joi.string().min(2).required(),
    genreId: Joi.number().required(),
    userId: Joi.string().required(),
    runtime: Joi.number().required(),
    overview: Joi.string().min(5).required(),
    releaseDt: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/s).required(),
    actorIds: Joi.array().items(Joi.number()).required()
});


export default fantasyMovieSchema;