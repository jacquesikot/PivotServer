import { model } from 'mongoose';
import { IUserDocument } from './user.types';
import userSchema from './user.schema';

const User = model<IUserDocument>('User', userSchema);

export default User;
