import { verify } from "jsonwebtoken";
import { serialize } from "cookie";
export default function logouthandler(req, res) {
  const { myTokenName } = req.cookies;

  if (!myTokenName) {
    return res.status(401).json({ error: "no token" });
  }

  try {
    verify(myTokenName, process.env.SECRET);

    const serialized = serialize("myTokenName", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    res.status(200).json("logout succesfully");
  } catch (error) {
    res.status(401).json("invalid token");
  }
}
