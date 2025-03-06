import type { Request, Response } from "express";
import { signInUser, signUpUser } from "comman/types"
import prismaClient from "db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

export const signUp = async (req: Request, res: Response) => {
    try {
        const parsedBody = signUpUser.safeParse(req.body);
        if (!parsedBody.success) return res.status(411).json({
            message: "Invalid Inputs",
            errror: parsedBody.error
        })
        let user = await prismaClient.user.findFirst({
            where: {
                email: parsedBody.data.email
            }
        })
        if (user) return res.status(400).json({
            message: "User already exist"
        })
        const hashedPassword = await bcrypt.hash(parsedBody.data.password, 10);
        user = await prismaClient.user.create({
            data: {
                email: parsedBody.data.email,
                password: hashedPassword,
                name: parsedBody.data.name
            }
        })
        const token = jwt.sign({ Id: user.id }, process.env.JWT_SECRET!);
        res.json({
            success: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const signIn = async (req: Request, res: Response) => {
    try {
        const parsedBody = signInUser.safeParse(req.body);
        if (!parsedBody.success) return res.status(411).json({
            message: "Invalid Inputs",
            error: parsedBody.error
        })
        const user = await prismaClient.user.findFirst({
            where: {
                email: parsedBody.data.email
            }
        })
        console.log(user);
        if (user) {
            const password = await bcrypt.compare(parsedBody.data.password, user.password);
            console.log(password);
            if (password) {
                const token = jwt.sign({ Id: user.id }, process.env.JWT_SECRET!);
                res.json({
                    success: true,
                    token
                })
            }
        }
        return res.status(400).json({
            message: "email or password is wrong"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}