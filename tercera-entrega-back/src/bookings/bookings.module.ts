import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { User } from 'src/user/entities/user.entity';
import { Listings } from 'src/listings/entities/listing.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService,UserService],
  imports:[TypeOrmModule.forFeature([
    Booking,User,Listings  ]),Repository,
    JwtModule.register({
      global:true,
      secret: `${process.env.JWT_SECRET_KEY}`,
      signOptions: {expiresIn: '100m'}
    }) ]

})
export class BookingsModule {}
