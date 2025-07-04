import mongoose, { Schema, Document } from 'mongoose';

export enum UserRole {
  VENDOR = 'vendor',  
  USER = 'user',
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  profilePicture: string;
  role: UserRole;
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  profilePicture: { type: String, required: false },
  role: { type: String, enum: Object.values(UserRole) },
});

UserSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

export default mongoose.model<IUser>('User', UserSchema); 