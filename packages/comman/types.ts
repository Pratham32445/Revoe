import { z } from "zod";

export const signUpUser = z.object({
    name: z.string().nonempty("Name should not be empty"),
    email: z.string().email("Please provide a valid email"),
    password: z.string().min(6, "password should be min 6 characters")
})

export const signInUser = z.object({
    email: z.string().email("Please provide a valid email"),
    password: z.string().nonempty()
})

export const createTableSchema = z.object({
    name: z.string(),
    columns: z.array(
        z.object({
            name: z.string(),
            type: z.string(),
            isDynamic: z.boolean()
        })
    ),
    spreadSheetId: z.string(),
    range: z.string()
})