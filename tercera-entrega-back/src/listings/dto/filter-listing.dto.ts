import { PartialType } from '@nestjs/mapped-types';
import { CreateListingDto } from './create-listing.dto';
import { User } from 'src/user/entities/user.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterListingDto extends PartialType(CreateListingDto) {
  title?: string; //
  @IsString()
  @IsOptional()
  city?: string;  //
  @IsString()
  @IsOptional()
  country?: string; //
  @IsString()
  @IsOptional()
  email?: string; //
  @IsNumber()
  @IsOptional()
  price_per_nig?: number;//
  @IsNumber()
  @IsOptional()
  num_bedrooms?: number; //
  @IsNumber()
  @IsOptional()
  num_bathrooms?: number; //
  @IsNumber()
  @IsOptional()
  max_guests?: number; //
  @IsString()
  @IsOptional()
  searchtermn?: string; //

}
