import { IsDate, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { Listings } from "src/listings/entities/listing.entity";
import { User } from "src/user/entities/user.entity";

export class CreateBookingDto {
    @IsObject()
    @IsOptional()
    listing: Listings;
    @IsObject()
    @IsOptional()
    user: User;
    @IsNumber()
    listing_id: number;
    @IsNumber()
    user_id: number;
    @IsString()
    start_date: Date;
    @IsString()
    end_date: Date;
    @IsNumber()
    total_price:number;
    @IsString()
    @IsOptional()
    created_at?: Date;
    @IsString()
    email:string;

}
