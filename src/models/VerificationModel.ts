// src/models/verification.model.ts
import mongoose from 'mongoose';
import { SignupMethod } from '../utils/enumHelper';

const verificationSchema = new mongoose.Schema({
  method: { type: String, enum: Object.values(SignupMethod), required: true },
  value: { type: String, required: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
}, {
  timestamps: true,
});

verificationSchema.index({ value: 1, method: 1 }, { unique: true });
verificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const VerificationModel = mongoose.model('Verification', verificationSchema);
