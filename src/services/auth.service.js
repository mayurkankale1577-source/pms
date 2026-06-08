import bcrypt from "bcryptjs";

import { getUserByEmail } from "./user.service";
import { generateToken } from "@/lib/auth";

export async function loginUser(data) {
  const { email, password } = data;

  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}