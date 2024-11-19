import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class DeleteUserDto extends PartialType(CreateUserDto) {
    @IsNumber()
    id:number;
    @IsString()
    email:string;
    @IsString()
    @IsOptional()
    username?:string;
    @IsString()
    password:string;
    @IsString()
    @IsOptional()
    deleted_at?: string;

}
