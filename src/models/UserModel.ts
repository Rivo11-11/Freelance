import mongoose, { Schema, Document } from 'mongoose';
import { uploadToCloudinary } from '../utils/cloudinaryUtils';

export enum UserRole {
  VENDOR = 'vendor',  
  USER = 'user',
  ADMIN = 'admin'
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  profilePicture: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  profilePicture: { type: String, required: false },
  role: { type: String, required: true, enum: Object.values(UserRole) },
}, {
  timestamps: true
});

UserSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});


UserSchema.pre('save', async function(next) {
  if (!this.isModified('profilePicture')) {
    return next();
  }
  const result = await uploadToCloudinary(this.profilePicture, 'user-profiles');
  this.profilePicture = result.secure_url;
  next();
});

export default mongoose.model<IUser>('User', UserSchema); 