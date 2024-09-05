import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import {NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const { username,email,password} = reqBody;
        //validation
        console.log(reqBody);

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error:"User already Exist"},{status:400})
        }
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPasword = await bcryptjs.hash(password,salt);
        console.log(hashedPasword);
        
        const newUser = new User({
            username,
            email,
            password:hashedPasword
        })
        
        const saveduser = await newUser.save();
        console.log(saveduser);

        //send verification email
        await sendEmail({email,emailType:"VERIFY",userId:saveduser._id});
        
        return NextResponse.json({
            message:"User Registered successfully",
            success:true,
            saveduser
        })
    } catch (error:any) {
        return NextResponse.json({
            error:error.message,
            status:500
        })
    }
}