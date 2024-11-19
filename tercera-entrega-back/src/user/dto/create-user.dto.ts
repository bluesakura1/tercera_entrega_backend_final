import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    email:string;
    @IsString()
    username:string;
    @IsString()
    password:string;
    @IsDate()
    @IsOptional()
    created_at?:Date
    @IsBoolean()
    is_owner:boolean;
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
