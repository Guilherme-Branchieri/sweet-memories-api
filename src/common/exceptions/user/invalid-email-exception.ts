import { ConflictException } from "@nestjs/common";

export class InvalidEmailException extends ConflictException {
    constructor() {
        super("Invalid e-mail format or email already taken")
    }
}