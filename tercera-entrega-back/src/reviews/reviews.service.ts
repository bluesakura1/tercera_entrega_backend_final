import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Listings } from 'src/listings/entities/listing.entity';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService { constructor(
  @InjectRepository(User)
  protected readonly userrepository: Repository<User>,
  @InjectRepository(Listings)
  protected readonly listingrepository: Repository<Listings>,
  @InjectRepository(Review)
  private readonly repository: Repository<Review>,
) {}

  async createreview(createReviewDto: CreateReviewDto) {
    const {
      user_id: userid,
      listing_id: listing_id,
      ...rest
    } = createReviewDto;
    const dto = rest;
    const user = await this.userrepository.findOneBy({ user_id: userid });
    const listing = await this.listingrepository.findOneBy({
      listing_id: listing_id,
    });
    if (user !== null ) {
      dto.user = user;
      dto.listing = listing;
      this.repository.save(dto);
      return { Message: 'sucessfull booking' ,dto};
    } else {
      return { Message: 'fail booking' };
    }
  }

  async findAllreview() {
    const reviews = await this.repository.createQueryBuilder("re")
        .select("*")
        .getRawMany();
    return reviews;}

}
