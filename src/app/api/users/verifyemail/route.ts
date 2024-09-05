import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs'

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log("Token from the request:",token);

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiray: { $gt: Date.now() }
        });

        if (!user) {
            console.log("Invalid Token");
            return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
        }

        console.log(user);
        
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiray = undefined;

        await user.save();

        return NextResponse.json({ 
            message: "Email verified successfully",
            success:true }, 
            { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
