import { verify } from "jsonwebtoken";
export default function profileHandler(req, res) {
  /* const { myTokenName } = req.cookies; */
  /* if (!myTokenName) {
    return res.status(401).json({ error: "Not logged in" });
  } */

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
    /* return res.status(401).json({ error: "invalid token" }); */
    console.log("NAPO: ", req.headers.referer);
    return res.redirect(401, req.headers.referer);
  }
}
