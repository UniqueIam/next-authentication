import { NextRequest,NextResponse } from "next/server";
import User from "@/models/user.model";
import { connect } from "@/dbConfig/dbConfig";
import jwt from 'jsonwebtoken';

connect();

export const getDataFromToken = ( request:NextRequest ) =>{
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken:any = jwt.verify(token,process.env.TOKEN_SECRET!)
        return decodedToken.id
    } catch (error:any) {
        return NextResponse.json({error:error.message})
    }
}