import { Document, Model } from 'mongoose';
import { UserProps } from '../../types';

export interface IUserDocument extends UserProps, Document {}
export interface IUserModel extends Model<IUserDocument> {}
