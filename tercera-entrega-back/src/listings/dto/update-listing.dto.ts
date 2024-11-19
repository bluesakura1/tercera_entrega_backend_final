import { PartialType } from '@nestjs/mapped-types';
import { CreateListingDto } from './create-listing.dto';
import { User } from 'src/user/entities/user.entity';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateListingDto extends PartialType(CreateListingDto) {
  @IsNumber()
  @IsOptional()
  listing_id: number;
  @IsNumber()
  @IsOptional()
  userid: number;
  @IsObject()
  @IsOptional()
  user?:User;
  @IsString()
  @IsOptional()
  title?: string;
  @IsString()
  @IsOptional()
  city?: string;
  @IsString()
  @IsOptional()
  country?: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsString()
  @IsOptional()
  address?: string;
  @IsNumber()
  @IsOptional()
  latitude?: number;
  @IsNumber()
  @IsOptional()
  longitude?: number;
  @IsNumber()
  @IsOptional()
  price_per_nig?: number;
  @IsNumber()
  @IsOptional()
  num_bedrooms?: number;
  @IsNumber()
  @IsOptional()
  num_bathrooms?: number;
  @IsNumber()
  @IsOptional()
  max_guests?: number;
  @IsString()
  @IsOptional()
  updated_at?: string;
}
