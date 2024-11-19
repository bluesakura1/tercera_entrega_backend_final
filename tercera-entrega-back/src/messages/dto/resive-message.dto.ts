import { IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { Listings } from "src/listings/entities/listing.entity";
import { User } from "src/user/entities/user.entity";

export class ResiveMessageDto {
    @IsNumber()
    receiver_user_id: number;
    @IsNumber()
    @IsOptional()
    sender_user_id?: number;
    @IsObject()
    @IsOptional()
    receiver_user: User;
    @IsOptional()
    @IsString()
    email: string;
    @IsObject()
    @IsOptional()
    sender_user?: User;
    @IsString()
    @IsOptional()
    created_at?: string;  
}
