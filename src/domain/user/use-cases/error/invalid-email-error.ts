import { ConflictException } from "@nestjs/common";

export class InvalidEmailError extends ConflictException {
    constructor() {
        super("Invalid e-mail format or email already taken")
    }
}