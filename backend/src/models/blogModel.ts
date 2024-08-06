import mongoose, {Schema, Document} from "mongoose";
export interface IBlog extends Document {
    blogName: string;
    category: string;
    article: string;
    authorName: string;
    timestamp: Date;
}

const blogSchema: Schema = new Schema({
    blogName: { type: String, required: true },
    category: { type: String, required: true },
    article: { type: String, required: true },
    authorName: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model<IBlog>('Blog', blogSchema);