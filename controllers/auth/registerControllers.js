import Joi from "joi";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import { User } from "../../models";

const registerControllers = {
  //register
  async register(req, res, next) {
    //Validation
    const registerSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3-30}$"))
        .required(),
      repeat_password: Joi.ref("password"),
    });

    console.log(req.body);

    const { error } = registerSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    //check if user is in the database
    try {
      const exist = await User.exists({ email: req.body.email });
      if (exist) {
        return next(
          CustomErrorHandler.alreadyExist("Thes email is already taken.")
        );
      }
    } catch (err) {
      return next(err);
    }

    res.json({
      msg: "Hello",
    });
  },
};

export default registerControllers;
