import Joi from 'joi';
import { UserProps } from 'src/types';

export const validateUser = (user: UserProps) => {
  const schema = Joi.object({
    firstname: Joi.string().min(2).max(255).required(),
    middlename: Joi.string().min(2).max(255),
    lastname: Joi.string().min(2).max(255).required(),
    email: Joi.string().email().min(2).max(255).required(),
    mobile_number: Joi.string().min(3).max(45).required(),
    gender: Joi.string().min(4).max(6).required(),
    age: Joi.number().min(1).required(),
    role: Joi.string().min(5).max(10).required(),
    password: Joi.string().min(3).max(25).required(),
    upline: Joi.string().email(),
  });

  return schema.validate(user);
};

interface LoginProps {
  email_address: string;
  password: string;
}

const validateAuth = (credential: LoginProps) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
  });
  return schema.validate(credential);
};

export default validateAuth;
