import { ConflictException } from "@nestjs/common";

export class InvalidProductException extends ConflictException {
    constructor() {
        super("Invalid product format")
    }
}