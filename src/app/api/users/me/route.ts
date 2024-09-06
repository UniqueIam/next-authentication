import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from "@/helpers/getDataFromToken";

// Ensure this function only establishes a connection and does not return the MongoClient instance
connect();

export async function POST(request: NextRequest) {
    try {
        // Extract data from token
        const userId = await getDataFromToken(request);

        // Fetch the user data excluding the password and ensure to use lean() to avoid Mongoose metadata
        const user = await User.findOne({ _id: userId }).select("-password").lean();

        // If user is not found, return a 404-like error
        if (!user) {
            return NextResponse.json({
                message: "User not found",
                success: false
            });
        }

        // Return only the user data (not the entire response object)
        return NextResponse.json({
            message: "User found",
            data: user
        });

    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            success: false
        }, { status: 500 });
    }
}
