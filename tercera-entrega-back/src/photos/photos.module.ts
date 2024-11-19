import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [PhotosController],
  providers: [PhotosService],
  imports:[TypeOrmModule.forFeature([
    Photo  ]),Repository,
    JwtModule.register({
      global:true,
      secret: `${process.env.JWT_SECRET_KEY}`,
      signOptions: {expiresIn: '100m'}
    }) ]
})
export class PhotosModule {}
