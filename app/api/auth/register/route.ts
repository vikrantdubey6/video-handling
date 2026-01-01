import dbConnect from "@/src/lib/db";
import User from "@/src/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }
    await dbConnect();
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "user already exist" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "user created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error",error);
    return NextResponse.json(
      { error: "failed to register user" },
      { status: 400 }
    );
  }
}
