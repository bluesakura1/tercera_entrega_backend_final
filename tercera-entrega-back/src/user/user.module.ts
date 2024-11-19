import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forFeature([
      User
    ]),
    JwtModule.register({
      global:true,
      secret: `${process.env.JWT_SECRET_KEY}`,
      signOptions: {expiresIn: '100m'}
    })  
  ]
})
export class UserModule {}

