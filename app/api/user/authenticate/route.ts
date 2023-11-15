import connectToDB from "@utils/database";
import User from "@models/user";
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req : NextRequest, res : NextResponse) => {

    try {

        await connectToDB();
        const cookieStore = cookies();
        const token = cookieStore.get('jwToken')?.value;
        if(!token){
            throw new Response(JSON.stringify({
                message : "Invalid token",
            }), { status: 500 })
        }
        const SECRETKEY : string = process.env.SECRET_KEY === undefined ? "GAURAVBHAGAT" : process.env.SECRET_KEY;
        const verifyToken : any = jwt.verify(token, SECRETKEY);

        const rootUser = await User.findOne({_id: verifyToken._id, "tokens.token": token });

        if(!rootUser){
            throw new Response(JSON.stringify({
                message : "user not found",
            }), { status: 500 })
        }

        return new Response(JSON.stringify(rootUser), { status: 200 })
        
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 })
    }
}