import type { Request, Response } from "express";
import { GoogleSheetService } from "../services/googlesheet.service";
import { createTableSchema } from "comman/types";
import prismaClient from "db";

const USER_ID = "abc";

export const createTable = async (req: Request, res: Response) => {
    try {
        const parsedBody = createTableSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(411).json({
                message: "Invalid Inputs",
                errors: parsedBody.error
            })
        }
        const table = await prismaClient.table.create({
            data: {
                name: parsedBody.data.name,
                spreadSheetId: parsedBody.data.spreadSheetId,
                userId: USER_ID
            }
        })
        res.json({
            message: "Table Created Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const getTable = async (req: Request, res: Response) => {
    try {
        const tables = await prismaClient.table.findMany({
            where: {
                id: USER_ID
            }
        })
        res.json({
            tables
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}