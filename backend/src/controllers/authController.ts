import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  // Register a new user
  public registerUser = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;

    // Validate the request body
    if (!username || !email || !password) {
      res.status(400).json({ message: "All fields are mandatory" });
      return;
    }

    if (!email.includes("@") || !email.includes(".com")) {
      res.status(400).json({ message: "Invalid email format" });
      return;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      res
        .status(400)
        .send("Password must be alphanumeric and at least 8 characters long");
      return;
    }

    // Register the user
    try {
      const newUser = await this.authService.registerUser(username, email, password);
      res.status(201).json({result: newUser});
    } catch (error) {
      res.status(500).json({ message: "Error registering user" });
    }
  };
}
