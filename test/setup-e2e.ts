import "dotenv/config"

import { Prisma, PrismaClient } from "@prisma/client"
import { randomUUID } from "crypto"
import { execSync } from "child_process"

const prisma = new PrismaClient()



function generateUniqueDataBaseURL(schemaId: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error("Please provide DATABASE_URL environment variable")
    }
    const url = new URL(process.env.DATABASE_URL)

    url.searchParams.set("schema", schemaId)

    return url.toString()
}

const schemaId = randomUUID()

beforeAll(async () => {
    const databaseUrl = generateUniqueDataBaseURL(schemaId)

    process.env.DATABASE_URL = databaseUrl
    execSync("yarn prisma migrate deploy")
})

afterAll(async () => {
    const query = `DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`
    await prisma.$queryRaw`${Prisma.raw(query)}`
    await prisma.$disconnect()

})