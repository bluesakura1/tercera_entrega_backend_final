import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingDto } from './create-booking.dto';
import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class DeleteBookingDto extends PartialType(CreateBookingDto) {
    @IsNumber()
    @IsOptional()
    booking_id?: number;
    @IsNumber()
    user_id: number;
    @IsDate()
    @IsOptional()
    deleted_at?: Date;

}
