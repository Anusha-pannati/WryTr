import { Console } from './../../node_modules/@cloudflare/workers-types/2022-03-21/index';
import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign } from 'hono/jwt'
import { signinInput, signupInput } from '@anusha-pannati/medium-common'

export const userRoutes = new Hono<{
    Bindings : {
        DATABASE_URL: string
        JWT_SECRET: string 
    }
}>()

userRoutes.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()
    const {success} = signupInput.safeParse(body);
    console.log(success,"hello")
    if(!success){
        c.status(411);
        return c.json({
            msg: "inputs not correct"
        })
    } 
    try{
        console.log("inside signup")
        const user = await prisma.user.create({
            data:
            {
                email: body.username,
                name :body.name,
                password:body.password,
            }
        })


        const jwt = await sign({id:user.id}, c.env.JWT_SECRET)
        return c.json({jwt});
    }catch(e) {
        console.error("Signup Error:", JSON.stringify(e, null, 2));
        c.status(403);
        return c.json({error: "error while signing up"});
    }
	
})

userRoutes.post('/signin', async (c) => {
	const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()
    const {success} = signinInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            msg: "inputs not correct"
        })
    } 
    const user = await prisma.user.findUnique({
        where: {
            email: body.username,
            password: body.password,
        }
    })

    if(!user) {
        c.status(403);
        return c.json({error: "user not found"})
    }

    const jwt = await sign({id:user.id}, c.env.JWT_SECRET);
    return c.json({jwt});
})

// export default userRoutes

userRoutes.get('/userInfo', async (c) => {
	const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
        const jwt = c.req.header('Authorization') || "";

        const { header, payload } = decode(jwt)

        if (!payload || typeof payload.id !== "string") {
            return c.json({ error: "Invalid token" }, 401);
        }
    
        const user = await prisma.user.findUnique({
            where: { id: payload.id },
            select: {
                id: true,
                email: true,
                name: true,
            }
        });

        return c.json({user});
    
})