import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { dbConnect } from "@/utils/mongoose";
import User from "@/models/User";
dbConnect();

export default async function loginHandler(req, res) {
  console.log(req.body);
  const { username, email, password } = req.body;
  const users = await User.find();
  console.log("USERS: ", users);
  const checkCredentials = (obj) =>
    obj.email === email && obj.password === password;
  if (users.some(checkCredentials)) {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        email: email,
        /* username: username, */
      },
      process.env.NEXT_PUBLIC_SECRET
    );

    const serialized = serialize("myTokenName", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialized);
    return res.json("login route");
  }

  return res.status(401).json({ error: "invalid email or password" });
}
