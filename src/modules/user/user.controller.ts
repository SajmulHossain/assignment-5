import { Request, Response } from "express"

const getAllUser = (req:Request, res:Response) => {

    res.send("user retrived")
}

export const UserController = {
    getAllUser
}