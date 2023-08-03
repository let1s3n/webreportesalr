import { verify } from "jsonwebtoken";
export default function check(req, res) {
  try {
    const { myTokenName } = req.cookies;
    const { email, username, roles } = verify(
      myTokenName,
      process.env.NEXT_PUBLIC_SECRET
    );

    return res
      .status(200)
      .json({ email: email, username: username, roles: roles });
  } catch (error) {
    return res.status(202).json("Unsuccess");
  }
}
