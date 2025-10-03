import { Router } from "express"

export const appRouter = Router()
export const Get = (path, func) => appRouter.get(path, func)
export const Post = (path, func) => appRouter.post(path, func)
export const Put = (path, func) => appRouter.put(path, func)
export const Patch = (path, func) => appRouter.patch(path, func)
export const Delete = (path, func) => appRouter.delete(path, func)