import { dbConnect } from "@/utils/mongoose";
import User from "@/models/User";
import Role from "@/models/Role";
dbConnect();

export default async function createHandler(req, res) {
  const { username, email, password, isAdmin } = req.body;

  try {
    const newUser = new User({ username, email, password });

    if (isAdmin) {
      const foundRoles = await Role.find({ name: { $in: ["user", "admin"] } });
      newUser.roles = foundRoles;
      
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles.push(role);
    }

    await newUser.save();

    return res.status(200).json("User created succesfully!");
  } catch (error) {
    console.log("Error Message:", error);
    return res.status(401).json("Something Wrong happened!");
  }
}
