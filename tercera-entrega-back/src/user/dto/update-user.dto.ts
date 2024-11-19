import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNumber()
    @IsOptional()
    id?:number;
    email?:string;
    @IsString()
    @IsOptional()
    username?:string;
    @IsString()
    @IsOptional()
    password:string;
    @IsDate()
    @IsOptional()
    created_at?:Date
    @IsString()
    @IsOptional()
    deleted_at?: string;
    @IsDate()
    @IsOptional()
    updated_at?: Date;
    @IsBoolean()
    @IsOptional()
    is_owner?:boolean;
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
    @IsString()
    @IsOptional()
    profile_picture?: string;
    @IsString()
    @IsOptional()
    bio?: string;
}
