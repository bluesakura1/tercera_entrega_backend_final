import { PartialType } from '@nestjs/mapped-types';
import { CreatePhotoDto } from './create-photo.dto';
import { IsNull } from 'typeorm';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class DeletePhotoDto extends PartialType(CreatePhotoDto) {
    @IsNumber()
    listing_id: number;
    @IsString()
    @IsOptional()
    deleted_at?: string;
}
