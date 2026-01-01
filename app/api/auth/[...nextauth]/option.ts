import dbConnect from "@/src/lib/db";
import User from "@/src/models/User";
import bcrypt from "bcryptjs";
import  {NextAuthOptions} from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {

    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"},
            },


            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Missing credentials")
                }
                try {
                    await dbConnect();
                    const user = await User.findOne({email: credentials.email})
                
                    if(!user){
                        throw new Error(
                            "Invalid email or password"
                        )
                    }

                    const isPasswordValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );

                    if(!isPasswordValid){
                        throw new Error (" Invalid password ")
                    }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    
                }
                
                
                } catch (error) {
                     console.error("auth error", error)
                     throw error
                }
            }

        }),
    ],
    callbacks:{
        async session({session, token}){
            if(session.user){
                session.user.id = token.id as string
            }
            return session
        },
          async jwt({token, user}){
            if(user){
                token.id = user.id
            }
            return token
          } 
    },

    pages: {
        signIn: "/login",
        error: "/login"
    },
    session: {
        strategy: "jwt",
        maxAge: 30*24*60*60,
    },

    secret: process.env.NEXTAUTH_SECRET
}
