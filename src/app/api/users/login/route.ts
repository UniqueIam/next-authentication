import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import {NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const { email,password} = reqBody;

        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({error:"User not exist"},{status:500});
        }
        console.log("User Exists:",user);

        console.log("password hash stored in db",user.password);

        const validPassword = await bcryptjs.compare(password,user.password);
        console.log(validPassword);

        if(!validPassword){
            return NextResponse.json({error:"Invalid credentials"},{status:400})
        }

        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email
        }

        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{ expiresIn:'1d'});

        const response = NextResponse.json({
            message:"User successfully registered",
            success:true
        })

        response.cookies.set("token",token,{
            httpOnly:true
        })
        console.log("response",response);
        
        return response;

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}