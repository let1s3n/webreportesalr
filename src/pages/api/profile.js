import { verify } from "jsonwebtoken";

export default function profileHandler(req, res) {
  const { myTokenName } = req.cookies;
  if (!myTokenName) {
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    const { email, username } = verify(
      myTokenName,
      process.env.NEXT_PUBLIC_SECRET
    );
    return res.status(200).json({ email: email, username: username });
  } catch (error) {
    return res.status(401).json({ error: "invalid token" });
  }
}
