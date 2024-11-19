import { IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { Listings } from "src/listings/entities/listing.entity";

import { User } from "src/user/entities/user.entity";


export class CreateReviewDto {
    @IsNumber()
    user_id: number;
    @IsNumber()
    listing_id: number;
    @IsObject()
    @IsOptional()
    listing: Listings;
    @IsObject()
    @IsOptional()
    user: User;
    @IsNumber()
    rating: number;
    @IsString()
    comment: string;
    @IsString()
    @IsOptional()
    created_at?: string;
      
}
