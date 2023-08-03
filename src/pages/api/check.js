import { verify } from "jsonwebtoken";
export default function check(req, res) {
  const { myTokenName } = req.cookies;
  if (myTokenName) {
    const { email, username, roles } = verify(
      myTokenName,
      process.env.NEXT_PUBLIC_SECRET
    );
    return res
      .status(200)
      .json({ email: email, username: username, roles: roles });
  }
}
