// use server to make sure that the function is executed on the server side
// server actions are not exposed to client side, so they can't be called directly from the browser

"use server";

import { auth } from "@/auth";
import { parserServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";


export const createPitch = async (state: any, form: FormData, pitch: string) => {
    const session = await auth();

    if(!session){
        return parserServerActionResponse({error:"You must be logged in to create a pitch", status: "ERROR"});
    }

    const {title, description, category, link} = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== "pitch"),
    );

    const slug = slugify(title as string, {lower: true, strict: true});

    try{
        const startup = {
            title, 
            description,
            category,
            image: link,
            slug: {
                _type: slug,
                current: slug,
            },
            author: {
                type: 'reference',
                _ref: session.id,
            },
            pitch,
        };

        const result = await writeClient.create({_type: "startup", ...startup});

        return parserServerActionResponse({
            ...result,
            error: "",
            status: "SUCCESS",
        })
    }catch(err){
        console.log(err);
        return parserServerActionResponse({error: JSON.stringify(err), status: "ERROR"});
    }

};