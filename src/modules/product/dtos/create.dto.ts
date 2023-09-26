import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsArray, IsBoolean, IsDate, IsNumber, IsString } from "class-validator"

export class CreateProductDto {

    @ApiProperty()
    @IsString()
    id!: string;

    @ApiProperty()
    @IsString()
    name!: string;

    @ApiProperty()
    @IsString()
    description!: string;

    @ApiProperty()
    @IsNumber()
    price!: string;

    @ApiPropertyOptional()
    @IsArray()
    images!: string;

    @ApiPropertyOptional()
    @IsBoolean()
    available!: boolean

    @ApiProperty()
    @IsString()
    category!: string;

    @ApiProperty()
    @IsDate()
    createdAt!: Date;
}