import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class DeleteReviewDto {
    @IsNumber()
    review_id: number;
    @IsObject()
    @IsOptional()
    user: User;  
    @IsString()
    @IsOptional()  
    deleted_at?: string;
}
