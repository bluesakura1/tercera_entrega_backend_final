import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsModule } from './bookings/bookings.module';
import { ListingsModule } from './listings/listings.module';
import { MessagesModule } from './messages/messages.module';
import { PhotosModule } from './photos/photos.module';
import { ReviewsModule } from './reviews/reviews.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModule,ConfigModule.forRoot(),TypeOrmModule.forRoot({
    type:"postgres",
    host:process.env.APP_DB_HOST,
    port:+process.env.APP_DB_PORT,
    database:process.env.APP_DB_DATABASE,
    username:process.env.APP_DB_USERNAME,
    password:process.env.APP_DB_PASSWORD,
    autoLoadEntities:true,
    synchronize:true
  }), BookingsModule, ListingsModule, MessagesModule, PhotosModule, ReviewsModule],
  controllers: [AppController],
  providers: [AppService,JwtService],
})
export class AppModule {}

