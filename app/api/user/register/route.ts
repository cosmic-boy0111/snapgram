import connectToDB from "@utils/database";
import User from "@models/user";
import { serialize } from "cookie";
import { NextRequest } from "next/server";


export const POST = async (req : NextRequest) => {
    try {
        await connectToDB();

        const data = await req.json();
        const user = await User.create(data);
        await user.encryptPassword();


        return new Response(JSON.stringify({
            message : 'user register successfully'
        }), { 
            status : 200
        });

    } catch (error) {
        return new Response(JSON.stringify(error), { status : 500 })
    }
}