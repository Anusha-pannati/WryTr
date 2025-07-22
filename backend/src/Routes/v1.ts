import { Hono } from 'hono'
import  { userRoutes }from './user'
import { blogRoutes }  from './blog'

export const v1Routes = new Hono()

v1Routes.route('/user', userRoutes)

v1Routes.route('/blog',blogRoutes)

