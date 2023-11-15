import connectToDB from "@utils/database";
import User from "@models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { serialize } from "cookie";

export const POST = async (req : NextRequest, res : NextResponse) => {
    try {

        await connectToDB();

        const data = await req.json();

        const email = data.email;
        const password = data.password;

        const user = await User.findOne({email : email});

        if(user){
            const isMatch = await bcrypt.compare(password, user.password);

            const token = await user.generateAuthToken();

            console.log(token);

            const serialized = serialize('jwToken', token, {
                httpOnly : true,
                path : '/',
                maxAge : 60 * 60 * 24 * 30
            });

            if(!isMatch){
                return new Response(JSON.stringify({
                    message : "Invalid credentials"
                }), { status : 400 })
            }else{
                return new Response(JSON.stringify({
                    message : 'user login successfully'
                }), { 
                    status : 200,
                    headers : {'Set-Cookie': serialized}
                });
            }
        }else{
            return new Response(JSON.stringify({
                message : "Invalid credentials"
            }), { status : 400 })
        }

    } catch (error) {
        return new Response(JSON.stringify({
            message : "Invalid credentials"
        }), { status : 400 })
    }
}