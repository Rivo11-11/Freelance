import mongoose, { Schema, model, Document } from "mongoose"
import { uploadMultipleToCloudinary } from "../utils/cloudinaryUtils";

export interface IActivity extends Document {
    name: string;
    address: string;
    details: string;
    tags: string[];
    price: number;
    date: Date;
    medias: string[];
    time: string;
    activityTime: string;
    vendorId: string;
    createdAt: Date;
    updatedAt: Date;
}

const ActivitySchema = new Schema({
    name: {
        type: String,
        required: true,
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
    price: {
        type: Number,
        required: true
    },
    date : {
        type: Date,
        required: true
    },
    medias: {
        type: [String],
        required: false
    },
    time: {
        type: String,
        required: true
    },
    activityTime : {
        type: String,
        required: true
    },
    vendorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
   
    
}, {
    timestamps: true
})


ActivitySchema.pre('save', async function(next) {
    if (!this.isModified('medias')) {
        return next();
    }        
    
    const result = await uploadMultipleToCloudinary(this.medias as string[], 'activity/medias');
    this.medias = (result as any[]).map((item: any) => item.secure_url);
    next();
})

export default mongoose.model<IActivity>('Activity', ActivitySchema);