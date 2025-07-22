import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { v1Routes } from './Routes/v1'

const app = new Hono()
app.use('*', cors())

app.route('/api/v1', v1Routes)

export default app
