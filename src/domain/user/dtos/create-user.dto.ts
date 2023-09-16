import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { ROLE } from "@prisma/client";
import { IsDate, IsEmail, IsEnum, IsPhoneNumber, IsString, Max, Min } from "class-validator"

export class CreateUserDto {

    @ApiProperty()
    @IsString()
    id!: string;

    @ApiProperty()
    @IsString()
    firstName!: string;

    @ApiProperty()
    @IsString()
    lastName!: string;

    @ApiProperty()
    @IsEmail()
    email!: string;

    @ApiProperty()
    @IsString()
    @Min(8)
    password!: string;

    @ApiPropertyOptional()
    @IsString()
    image!: string;

    @ApiPropertyOptional()
    @IsPhoneNumber()
    @Min(11)
    @Max(11)
    phone!: string;

    @ApiProperty()
    @IsString()
    adress!: string;

    @ApiProperty()
    @IsString()
    @Min(8)
    @Max(8)
    cep!: string;

    @ApiProperty()
    @IsEnum(ROLE)
    role!: ROLE;

    @ApiProperty()
    @IsDate()
    createdAt!: Date;

    @ApiPropertyOptional()
    @IsDate()
    updatedAt!: Date;
}