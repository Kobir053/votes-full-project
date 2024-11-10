import { User } from "../types/user";
import bcrypt from "bcrypt";

// Mock database
let users: User[] = [];
let nextId = 1;

export class AuthService {

  static async register(username: string, password: string): Promise<User> {

    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      _id: (nextId++).toString(),
      username,
      password: hashedPassword,
    };

    users.push(newUser);
    return newUser;
  }

  static async validateUser(username: string, password: string): Promise<User> {
    const user = users.find((u) => u.username === username);
    if (!user) {
      throw new Error("User not found");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Invalid password");
    }

    return user;
  }
}
