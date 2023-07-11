import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
      trim: true,
      maxLength: [20, "username is too long"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      trim: true,
      maxLength: [40, "Email is too long"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      maxLength: [100, "password is too long"],
    },
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    /* versionKey:false, */
  }
);

const User = models?.User || model("User", userSchema);
export default User;
