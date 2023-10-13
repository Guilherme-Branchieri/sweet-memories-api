import { ROLE } from "@prisma/client"

export type User = {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    image: string | null
    phone: string
    adress: string
    cep: string
    role: ROLE
}