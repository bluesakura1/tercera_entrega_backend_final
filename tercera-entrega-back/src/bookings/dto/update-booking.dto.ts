import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingDto } from './create-booking.dto';
import { Listings } from 'src/listings/entities/listing.entity';
import { IsNumber, IsOptional, IsString, isString } from 'class-validator';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
    @IsNumber()
    @IsOptional()
    booking_id?: number;
    @IsString()
    @IsOptional()
    updated_at?: string;

}
