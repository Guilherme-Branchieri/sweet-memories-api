import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsArray, IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator"

export class EditProductDto {

    @ApiProperty()
    @IsString()
    id!: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    name!: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description!: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    price!: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsArray()
    images!: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    available!: boolean

    @ApiProperty()
    @IsOptional()
    @IsString()
    category!: string;

    @ApiProperty()
    @IsOptional()
    @IsDate()
    createdAt!: Date;

    @ApiProperty()
    @IsOptional()
    @IsDate()
    updatedAt!: Date
}