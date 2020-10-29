import * as _ from 'lodash';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserProps } from '../types';
import { User } from '../models';
import { JWT_KEY } from '../constants';

export default class UserService {
  public async findUser(user_params: UserProps) {
    try {
      let user = await User.findOne({ email: user_params.email });
      if (user) return user.toObject();
      return false;
    } catch (e) {
      console.log(e.message);
    }
  }

  public async findUserById(id: number) {
    try {
      let user = await User.findById(id).select('-password');
      return user;
    } catch (e) {
      console.log(e.message);
    }
  }

  public async addLeg(upline: string, user_id: number) {
    try {
      const upline_user = await User.findOne({ email: upline });

      if (upline_user)
        upline_user.legs?.push({
          user_id: user_id,
        });
      await upline_user?.save();
      return upline_user;
    } catch (e) {
      console.log(e.message);
    }
  }

  public async createUser(user_params: UserProps) {
    try {
      const salt = await bcrypt.genSalt(10);
      user_params.password = await bcrypt.hash(user_params.password, salt);
      let user = new User({
        firstname: user_params.firstname,
        middlename: user_params.middlename,
        lastname: user_params.lastname,
        email: user_params.email,
        mobile_number: user_params.mobile_number,
        gender: user_params.gender,
        age: user_params.age,
        role: user_params.role,
        password: user_params.password,
        upline: user_params.upline ? user_params.upline : 'admin@admin.com',
      });

      await user.save();

      await this.addLeg(user_params.upline, user._id);

      return _.pick(user, [
        '_id',
        'firstname',
        'lastname',
        'email',
        'mobile_number',
        'upline',
      ]);
    } catch (e) {
      console.log(e.message);
    }
  }

  public async validatePassword(reqPassword: string, userPassword: string) {
    const validPassword = await bcrypt.compare(reqPassword, userPassword);
    if (!validPassword) return false;
    return true;
  }

  public async getToken(id: number | undefined) {
    const token = jwt.sign({ user_id: id }, JWT_KEY);
    return token.toString();
  }
}
