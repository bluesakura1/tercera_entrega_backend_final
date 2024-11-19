import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Listings } from 'src/listings/entities/listing.entity';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { DeleteBookingDto } from './dto/delete-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(User)
    private readonly userrepository: Repository<User>,
    @InjectRepository(Listings)
    private readonly listingrepository: Repository<Listings>,
    @InjectRepository(Booking)
    private readonly repository: Repository<Booking>,
  ) {}
  async createbooking( createBookingDto: CreateBookingDto) {
    const {
      user_id: userid,
      listing_id: listing_id,
      ...rest
    } = createBookingDto;
    const dto = rest;
    const user = await this.userrepository.findOneBy({ user_id: userid });
    const listing = await this.listingrepository.findOneBy({
      listing_id: listing_id,
    });
    const booking = await this.repository.findOneBy({
      listing: listing,
      start_date: new Date(dto.start_date),
      end_date: new Date(dto.end_date),
    });
    if (user !== null && booking == null) {
      dto.user = user;
      dto.listing = listing;
      this.repository.save(dto);
      return { Message: 'sucessfull booking', dto };
    } else {
      return { Message: 'fail booking', booking };
    }
  }

  async findallbooking(  dto: DeleteBookingDto) {
    const user = await this.userrepository.findOneBy({
      user_id: dto.user_id,
    });
    const booking = await this.repository.findBy({user:user});
    return booking;
  }

  async findallBookingOwner(  dto: DeleteBookingDto) {
    const user = await this.userrepository.findOneBy({
      user_id: dto.user_id,
    });
    const listing = await this.listingrepository.findBy({
      user: user,
    });
    const booking = await this.repository.findBy({listing:listing});
    return booking;
  }

  async finddAllOwner( updateListingDto: UpdateBookingDto) {
    const user = await this.userrepository.findOneBy({
      user_id: updateListingDto.user_id,
    });
    const listing = await this.listingrepository.findOneBy({
      user: user,
    });
    if (user == null || listing == null) {
      return { Message: 'fail' };
    } else {


      let ownerid="";

      const booking = await this.repository
      .createQueryBuilder('BO')
      .innerJoin(Listings, "lis", "BO.listingListingId = lis.listing_id")
      .where(" lis.userUserId=:user",{user:updateListingDto.user_id})
      .getRawMany();

      for (let index = 0; index < booking.length; index++) {
        if (index == 0) {
          ownerid=ownerid+`booking_id=${booking[index].BO_booking_id} `        
        }
        else{
         ownerid=ownerid+` or booking_id=${booking[index].BO_booking_id} `        
      }}

      await this.repository
      .createQueryBuilder()
      .update(Booking)
      .set({ Isread: true })
      .where(ownerid,{})
      .execute();

      return { booking,Message: 'sucessfull' };
    }
  }
  async finddAllmessagesOwner( updateListingDto: UpdateBookingDto) {
    const user = await this.userrepository.findOneBy({
      user_id: updateListingDto.user_id,
    });
    if (user == null) {
      return { Message: 'fail' };
    } else {

      const booking = await this.repository
      .createQueryBuilder('BO')
      .select("COUNT(*)")
      .innerJoin(Listings, "lis", "BO.listingListingId = lis.listing_id")
      .where(" lis.userUserId=:user and BO.Isread is false",{user:updateListingDto.user_id})
      .getRawMany();

      const counts = booking[0].count;

      return {counts , Message: 'sucessfull' };
    }
  }
  async finddAll( updateListingDto: UpdateBookingDto) {
    const user = await this.userrepository.findOneBy({
      user_id: updateListingDto.user_id,
    });
        const booking = await this.repository.findOneBy({
        user: user,
        booking_id: updateListingDto.booking_id,
      });
    if (user == null) {
      return { Message: 'fail' };
    } else {

      return { booking, Message: 'sucessfull' };
    }
  }
  async removebooking( deleteBookingDto: DeleteBookingDto) {
    const booking = await this.repository.findOneBy({
      booking_id: deleteBookingDto.booking_id,
    });
    if ( booking == null) {
      return { Message: 'fail delete'};
    } else {
      this.repository.softDelete({booking_id: booking.booking_id});
      return { Message: 'sucessfull delete' };
    }
  }



}
