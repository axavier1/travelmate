import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongoose";
import User from "@/models/User";

export async function POST(req: Request) {
  await connectDB();
  const { name, email, password } = await req.json();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashed });

  return NextResponse.json({ success: true });
}
