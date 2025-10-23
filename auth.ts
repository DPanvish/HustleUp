import NextAuth from "next-auth"
import GitHub  from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import { client } from "./sanity/lib/client"
import { writeClient } from "./sanity/lib/write-client"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // Creating Author from the Login information

    async signIn({user: {name, email, image}, profile: {id, login, bio}}){
      const existingUser = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {id});
      
      // If user doesnt exist in sanity then create the database for the user
      if(!existingUser){
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        })
      }
      
      // If the user already exists in sanity then continue
      return true;
    },

    // Giving a unique token to the sanity user
    // Connecting the user to sanity author
    async jwt({token, account, profile}){
      if(account && profile){
        const user = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {id: profile?.id});

        if(!user){
          token.id = user?._id;
        }
      }

      return token;
    },

    // Modify the session of the user
    async session({session, token}){
      Object.assign(session, {id: token.id});
      return session;
    }    
  }
})