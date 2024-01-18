import router from "koa-joi-router";

const MAX_CHAR = 256;

const Joi = router.Joi;

export const JoiNote = Joi.object({
  userId: Joi.string().max(MAX_CHAR),
  title: Joi.string().min(1).max(MAX_CHAR).required(),
  body: Joi.string().min(0).max(MAX_CHAR),
});
