import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { User } from 'src/user/entities/user.entity';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Listings } from 'src/listings/entities/listing.entity';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
dotenv.config();

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService,UserService],
   imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forFeature([
      Review ,Booking,Listings,User
    ]),Repository,
    JwtModule.register({
      global:true,
      secret: `${process.env.JWT_SECRET_KEY}`,
      signOptions: {expiresIn: '100m'}
    })  
  ]

})
export class ReviewsModule {}
