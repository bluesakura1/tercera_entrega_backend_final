import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { User } from 'src/user/entities/user.entity';
import { Listings } from 'src/listings/entities/listing.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService,UserService],
  imports:[TypeOrmModule.forFeature([
    Message,User,Listings  ]),Repository,
    JwtModule.register({
      global:true,
      secret: `${process.env.JWT_SECRET_KEY}`,
      signOptions: {expiresIn: '100m'}
    }) ]
})
export class MessagesModule {}
