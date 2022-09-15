import Joi from "joi";
const registerControllers = {
    //register
   register(req, res, next) {
    //Validation
    const registerSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3-30}$"))
        .required(),
      repeat_password: Joi.ref("password"),
    });

    const { error } = registerSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    res.json({
      msg: "Hello",
    });
  },
};

export default registerControllers;
