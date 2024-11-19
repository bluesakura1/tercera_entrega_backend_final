import { PartialType } from '@nestjs/mapped-types';
import { CreatePhotoDto } from './create-photo.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePhotoDto extends PartialType(CreatePhotoDto) {
    @IsNumber()
    @IsOptional()
    listing_id: number;
    @IsString()
    @IsOptional()
    photo_url?: string;  
}
