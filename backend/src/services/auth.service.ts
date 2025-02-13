import User, { IUser } from '../models/user.model';

interface CreateUserInput {
  fullName: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
}
export class AuthService {
  async createUser(userData: CreateUserInput): Promise<IUser> {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      throw new Error('Error creating user');
    }
  }

  async validateUser(email: string, password: string): Promise<IUser | null> {
    try {
      const user = await User.findOne({ email });
      if (!user) return null;

      const isValid = await user.comparePassword(password);
      return isValid ? user : null;
    } catch (error) {
      throw new Error('Error validating user');
    }
  }
} 