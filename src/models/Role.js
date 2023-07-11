import { Schema, model, models } from "mongoose";

const roleSchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

const Role = models?.Role || model("Role", roleSchema);
export default Role;
