import { Order, ROLE } from "@prisma/client"

export type UserWithoutPasswordEntity = {
    id: string
    firstName: string
    lastName: string
    email: string
    image: string | null
    phone: string
    adress: string
    cep: string
    role: ROLE | null
    createdAt: Date
    updatedAt: Date | null
    order?: Order[] | null
}