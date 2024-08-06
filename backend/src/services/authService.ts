import User, { IUser } from '../models/userModel';
import bcrypt from 'bcrypt';

export class AuthService {
  public async registerUser(username: string, email: string, password: string): Promise<IUser> {
    // Check if the user already exists
    const userExists: IUser | null = await User.findOne({ email });
    if (userExists) {
      throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword: string = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser: IUser = new User({ username, email, password: hashedPassword });

    // Save the user to the database
    const savedUser: IUser = await newUser.save();
    return savedUser;
  }
}