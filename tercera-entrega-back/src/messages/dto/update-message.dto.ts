import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-message.dto';
import { Listings } from 'src/listings/entities/listing.entity';
import { IsNumber } from 'class-validator';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
    @IsNumber()
    message_id: number;  
}
