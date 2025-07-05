import mongoose, { Schema, Document, model } from "mongoose";
import { PropertyType } from "../utils/enumHelper";
import { uploadMultipleToCloudinary, uploadToCloudinary } from "../utils/cloudinaryUtils";


export interface IProperty extends Document {
    type: PropertyType;
    available: boolean;
    guestNumber: number;
    bedrooms: number;
    bathrooms: number;
    beds: number;
    address: string;
    details: string;
    tags: string[];
    pricePerNight: number;
    availableDates: Date[];
    maxDays: number;
    ownershipContract: string;
    facilityLicense?: string;
    medias: string[];
    vendor: string;
    createdAt: Date;
    updatedAt: Date;
}

const PropertySchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: Object.values(PropertyType)
    },
    available : {
        type: Boolean,
        default: true
    },
    guestNumber: {
        type: Number,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    beds: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    pricePerNight: {
        type: Number,
        required: true
    },
    availableDates: {
        type: [Date],
        required: true
    },
    maxDays: {
        type: Number,
        required: true
    },
    ownershipContract: {
        type: String,
        required: true
    },
    facilityLicense: {
        type: String,
        required: false
    },
    medias: {
        type: [String],
        required: false
    },
    vendor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
   
    
}, {
    timestamps: true
})

PropertySchema.pre('save', async function(next) {
    if (!this.isModified('medias')) {
        return next();
    }        
    const promises = [
        uploadMultipleToCloudinary(this.medias as string[], 'property/medias'),
        uploadToCloudinary(this.ownershipContract as string, 'property/ownershipContract'),
        this.facilityLicense ? uploadToCloudinary(this.facilityLicense as string, 'property/facilityLicense') : null,
    ]
    
    const result = await Promise.all(promises);
    this.medias = (result[0] as any[]).map((item: any) => item.secure_url);
    this.ownershipContract = (result[1] as any).secure_url;
    if (result[2]) {
        this.facilityLicense = (result[2] as any).secure_url;
    }
    next();
})
export default mongoose.model<IProperty>('Property', PropertySchema);