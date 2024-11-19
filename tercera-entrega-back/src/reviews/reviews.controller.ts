import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Listings } from 'src/listings/entities/listing.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(
    @InjectRepository(User)
    private readonly userrepository: Repository<User>,
    @InjectRepository(Listings)
    private readonly listingrepository: Repository<Listings>,
    @InjectRepository(Booking)
    private readonly bookingrepository: Repository<Booking>,
    @InjectRepository(Review)
    private readonly repository: Repository<Review>,
    private readonly reviewsService: ReviewsService
  
  ) {}
  @UseGuards(AuthGuard)
  @Post("dejar-valoracion")
  async createreview(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.createreview(createReviewDto);
    }


    @UseGuards(AuthGuard)
    @Get("ver-valoraciones")
  async findAllreview() {
    return this.reviewsService.findAllreview();
  }

}
