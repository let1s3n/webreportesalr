import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { dbConnect } from "@/utils/mongoose";
import User from "@/models/User";
import Role from "@/models/Role";

dbConnect();

export default async function loginHandler(req, res) {
  try {
    const { email, password } = req.body;
    const users = await User.find();
    const checkCredentials = (obj) =>
      obj.email === email && obj.password === password;

    const { username, roles } = users.find(checkCredentials);

    const foundRoles = await Role.find({
      _id: { $in: roles },
    });

    if (users.some(checkCredentials)) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
          username: username,
          email: email,
          roles: foundRoles,
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
      /* NextResponse.next().headers.append("Set-Cookie", serialized); */
      return res.status(200).json("login route");
      /* return res.writeHead(302, { "Location" : "/mi-cuenta" }); */
      /* return res.redirect(302, req.headers.origin + "/mi-cuenta"); */
    }
  } catch (error) {
    return res.status(401).json({ error: "invalid email or password" });
  }
}
