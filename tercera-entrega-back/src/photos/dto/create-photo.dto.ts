import { IsOptional, IsString } from "class-validator";

export class CreatePhotoDto {
    @IsString()
    photo_url: string;
    @IsString()
    @IsOptional()
    created_at?: string;  
}
