import { dbConnect } from "@/utils/mongoose";
import User from "@/models/User";
dbConnect();

export default async function createHandler(req, res) {
  const { username, email, password } = req.body;

  try {
    const newUser = new User({ username, email, password });
    await newUser.save();

    return res.status(200).json("User created succesfully!");
  } catch (error) {
    console.log("Error Message:", error);
    return res.status(401).json("Something Wrong happened!");
  }
}
