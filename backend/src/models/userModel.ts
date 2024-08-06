import mongoose, {Schema, Document} from "mongoose";
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

const userSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true}
})

export default mongoose.model<IUser>('User', userSchema);