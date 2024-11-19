import { IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { Listings } from "src/listings/entities/listing.entity";
import { User } from "src/user/entities/user.entity";

export class CreateMessageDto {
    @IsObject()
    @IsOptional()
    sender_user: User;
    @IsNumber()
    @IsOptional()
    listing_id?: number;
    @IsNumber()
    sender_user_id: number;
    @IsNumber()
    receiver_user_id: number;
    @IsObject()
    @IsOptional()
    receiver_user: User;
    @IsObject()
    @IsOptional()
    listing?: Listings;
    @IsString()
    message: string;
    @IsString()
    @IsOptional()
    created_at?: string; 
    @IsString()
    @IsOptional()
    email?: string; 

 
}
