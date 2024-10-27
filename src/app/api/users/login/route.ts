import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/config/db.config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password)
      return NextResponse.json(
        {
          error: 'All Fields Are Required',
        },
        {
          status: 400,
        }
      );

    const user = await User.findOne({ email: email });

    if (!user)
      return NextResponse.json(
        {
          error: 'User does not exist - Signup please ⚠️',
        },
        {
          status: 404,
        }
      );

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      return NextResponse.json(
        {
          error: 'Invalid Credentials',
        },
        { status: 401 }
      );

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
      expiresIn: process.env.EXPIRES_IN,
    });

    const response = NextResponse.json({
      status: 200,
      messagee: 'looin succesful',
      sucess: true,
    });

    response.cookies.set('token', token, {
      httpOnly: true,
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
