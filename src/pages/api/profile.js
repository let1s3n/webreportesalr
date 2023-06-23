import { verify } from "jsonwebtoken";

export default function profileHandler(req, res) {
  const { myTokenName } = req.cookies;
  if (!myTokenName) {
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    const { email } = verify(myTokenName, process.env.SECRET);
    return res.status(200).json({ email: email });
  } catch (error) {
    return res.status(401).json({ error: "invalid token" });
  }
}
