import { createBlogInput, updateBlogInput } from '@anusha-pannati/medium-common'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { verify } from 'hono/jwt'
import generateRoute from './generateBlogRoutes'
import { format } from 'date-fns'

export const blogRoutes = new Hono<{
	Bindings : {
        DATABASE_URL: string
        JWT_SECRET: string 
    },
	Variables: {
		userId: any
	}
}>()

blogRoutes.use("/*",async (c, next) => {
	try{
	const jwt= c.req.header("Authorization");
	if (!jwt) {
		c.status(401);
		return c.json({error: "unauthorized"});
	}
	const token = jwt.split(' ')[0];
	const verified =await verify(token, c.env.JWT_SECRET);
	if(!verified)
	{
		c.status(401);
		return c.json({
			error: "user not found"
		});
	}
	c.set('userId',verified.id);
	await next();
	}catch(e){
		c.status(403);
		return c.json({
			message: "you are not logged in"
		})
	}
})

blogRoutes.post('/',async (c) => {
	const body = await c.req.json();
	const {success} = createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            msg: "inputs not correct"
        })
    } 
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())


	const blog = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: c.get('userId'),
		}
	})

	return c.json({
		id: blog.id
	})
})

blogRoutes.put('/',async (c) => {
	const body = await c.req.json();
	const {success} = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            msg: "inputs not correct"
        })
    }  
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

	const blog = await prisma.post.update({
		where:{
			id: body.id
		},
		data:{
			title: body.title,
			content: body.content
		}
	})
	return c.json({
		id: blog.id
	})
})

// to do: pagination technique-learn
blogRoutes.get('/bulk',async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

	const blogs = await prisma.post.findMany({
		select: {
			content: true,
			title: true,
			id: true,
			createdAt: true,
			author: {
				select: {
					name: true
				}
			}
		}
	});

	const formattedBlogs = blogs.map(blog => ({
		...blog,
		createdAt: format(blog.createdAt, 'dd MMM yyyy')
	}));

	return c.json({
		posts: formattedBlogs
	})
})

blogRoutes.get('/:id',async (c) => {
	const id = c.req.param("id");
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

	try{
		const post = await prisma.post.findFirst({
			where:{
				id: id
			},
			select: {
				id: true,
				title: true,
				content: true,
				createdAt: true,
				author: {
					select: {
						name: true
					}
				}
			}
		})

		if (!post) {
			c.status(404);
			return c.json({ message: "Post not found" });
		}

		const formattedPost = {
			...post,
			createdAt: format(post.createdAt, 'dd MMM yyyy')
		};

		return c.json({
			post: formattedPost
		})
	}catch(e){
		c.status(411);
		return c.json({
			message: "error while fetching the blog post"
		})
	}
})

blogRoutes.route('/generate', generateRoute);




// export default blogRoutes
