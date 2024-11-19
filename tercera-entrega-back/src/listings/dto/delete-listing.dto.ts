import { PartialType } from '@nestjs/mapped-types';
import { CreateListingDto } from './create-listing.dto';
import { User } from 'src/user/entities/user.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class DeleteListingDto extends PartialType(CreateListingDto) {
    @IsNumber()
    listing_id: number;
    @IsNumber()
    userid: number;
    @IsString()
    Password:string;
    @IsString()
    @IsOptional()
    deleted_at?: string;
}
