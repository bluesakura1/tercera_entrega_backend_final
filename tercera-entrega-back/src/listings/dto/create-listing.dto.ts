import { IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateListingDto {
    @IsObject()
    @IsOptional()
    user: User;
    @IsNumber()
    userid:number;
    @IsString()
    title: string;
    @IsString()
    description: string;
    @IsString()
    email: string;
    @IsString()
    address: string;
    @IsString()
    city: string;
    @IsString()
    country: string;  
    @IsNumber()
    latitude: number;
    @IsNumber()
    longitude: number;
    @IsNumber()
    price_per_nig: number;
    @IsNumber()
    num_bedrooms: number;
    @IsNumber()
    num_bathrooms: number;
    @IsNumber()
    max_guests: number;
    @IsString()
    @IsOptional()
    created_at?: string;
  
}
