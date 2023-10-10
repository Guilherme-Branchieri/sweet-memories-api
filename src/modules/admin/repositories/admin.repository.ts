import { Order } from "@prisma/client"
import { UserEntity } from "@/modules/user/entities/user.entity";
import { UserWithoutPasswordEntity } from "@/modules/user/entities/user-without-password.entity";

export type AdminRepository = {
    findAllOrders(): Promise<Order[] | null>;
    findAllUsers(): Promise<UserEntity[] | UserWithoutPasswordEntity[]>;
    deleteUser(id: string): Promise<void>
}