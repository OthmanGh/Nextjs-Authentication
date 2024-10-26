import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/config/db.config';
import bcrypt from 'bcryptjs';
connect();

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password)
      return NextResponse.json(
        {
          error: 'All Fields Are Required',
        },
        {
          status: 400,
        }
      );

    const userExists = await User.findOne({
      email: email,
    });

    if (userExists)
      return NextResponse.json(
        {
          error: 'User Already Exists!',
        },
        {
          status: 400,
        }
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { newUser },
      {
        status: 201,
      }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
