import { Module } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { ListingsController } from './listings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Listings } from './entities/listing.entity';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [ListingsController],
  providers: [ListingsService,UserService],
  imports:[TypeOrmModule.forFeature([
    Listings,User  ]),Repository,
    JwtModule.register({
      global:true,
      secret: `${process.env.JWT_SECRET_KEY}`,
      signOptions: {expiresIn: '100m'}
    }) ]
})
export class ListingsModule {}
