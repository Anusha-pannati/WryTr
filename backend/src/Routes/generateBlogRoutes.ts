import { createBlogInput } from '@anusha-pannati/medium-common'
import { Hono } from 'hono'
import { OpenAI } from 'openai'
const generateRoute = new Hono<{
    Bindings : {
        OPENAI_API_KEY: string
    }
}>()


generateRoute.post('/', async (c) => { 

    const openai = new OpenAI({
        apiKey: c.env.OPENAI_API_KEY
    })


    const body = await c.req.json()

    const parsed = createBlogInput.safeParse(body)
    if (!parsed.success) {
        return c.json({ error: 'Invalid input', details: parsed.error.format() }, 400)
    }

    const { title, content } = parsed.data

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini', // or 'gpt-3.5-turbo'
            messages: [
                {
                    role: 'system',
                    content: `You are a professional blog writer who writes in a clear, simple, and engaging tone.`
                },
                {
                    role: 'user',
                    content: `Write a complete blog post using the following:

                                Title: "${title}"

                                Context: "${content}"   

                                The blog should have:
                                - An engaging introduction
                                - Well-structured body with helpful insights
                                - A simple and professional tone
                                - A short conclusion
                                -it should only contain the description and not the title

                                the output should be in a json format where 
                                {
                                    title: "should have a creative and eye catching title for the blog",
                                    content: "should have the blog content"
                                }

                            Make sure it's easy to read, informative, and avoids complex jargon.`
                }
            ],
            temperature: 0.7,
            max_tokens: 1000
        })

        const blog = response.choices[0]?.message?.content ?? ''
            const cleaned = blog.replace(/```json|```/g, '').trim()

        try {
            const { title, content } = JSON.parse(cleaned)
            return c.json({ title, content })
        } catch (err) {
            console.error("Failed to parse AI response:", err)
            return c.json({ error: 'Invalid AI response format' }, 500)
        }
    } catch (err) {
            console.error(err)
            return c.json({ error: 'Failed to generate blog' }, 500)
    }
})

    export default generateRoute
