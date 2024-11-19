import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-message.dto';
import { IsOptional, IsString } from 'class-validator';

export class DeleteMessageDto extends PartialType(CreateMessageDto) {
    @IsString()
    @IsOptional()
    deleted_at?: string;  
}
