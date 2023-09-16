import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsDate, IsEmail, IsPhoneNumber, IsString, Max, Min } from "class-validator"

export class EditUserDto {

    @ApiPropertyOptional()
    @IsString()
    firstName!: string;

    @ApiPropertyOptional()
    @IsString()
    lastName!: string;

    @ApiPropertyOptional()
    @IsEmail()
    email!: string;

    @ApiPropertyOptional()
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

    @ApiPropertyOptional()
    @IsString()
    adress!: string;

    @ApiPropertyOptional()
    @IsString()
    @Min(8)
    @Max(8)
    cep!: string;

    @ApiProperty()
    @IsDate()
    updatedAt!: Date;
}