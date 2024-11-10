import bcrypt from "bcrypt";
import userModel, { IUser } from "../models/userModel";


export class AuthService {

  static async register(username: string, password: string): Promise<IUser> {

    const existingUser = await userModel.findOne({username: username});
    if (existingUser) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: IUser = await userModel.create({username, password: hashedPassword});
    return newUser;

  }

  static async validateUser(username: string, password: string): Promise<IUser> {
    
    const user: IUser | null = await userModel.findOne({username: username});
    if (!user) {
      throw new Error("User not found");
    }

    const isValid: boolean = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Invalid password");
    }

    return user;
  }
}
