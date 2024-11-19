import { Injectable } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { DeleteListingDto } from './dto/delete-listing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Listings } from './entities/listing.entity';
import { FilterListingDto } from './dto/filter-listing.dto';
import { DeleteUserDto } from 'src/user/dto/delete-user.dto';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(User)
    private readonly userrepository: Repository<User>,
    @InjectRepository(Listings)
    private readonly repository: Repository<Listings>,

  ) {}

  async deletelistings( deleteListingDto: DeleteListingDto) {
    const user = await this.userrepository.findOneBy({ user_id:deleteListingDto.userid});
    const listing = await this.repository.findOneBy({ listing_id:deleteListingDto.listing_id});
    if (
      user == null ||
      listing == null 
    ) {
      return  {Message:"fail delete",user}
    }
    else{
       this.repository.softDelete(deleteListingDto.listing_id);
       return  {Message:"sucessfull delete"};
    }
  }
  async updatelisting( updateListingDto: UpdateListingDto) {
    const { userid: userid, ...rest } = updateListingDto;
    const dto = rest;
    const user = await this.userrepository.findOneBy({ user_id:userid});
    const listing = await this.repository.findOneBy({ listing_id:dto.listing_id});
    if (
      user == null ||
      listing == null 
    ) {
      return  {Message:"fail update",user}
    }
    else{
       dto.user=user;
       this.repository.update(dto.listing_id,dto);
       return  {Message:"sucessfull update",dto};
    }
  }

  async createliisting( createListingDto: CreateListingDto) {
    const { userid: userid, ...rest } = createListingDto;
    const dto = rest;
    const user = await this.userrepository.findOneBy({ user_id:userid});
    const listing = await this.repository.findOneBy({ address:dto.address});
    if (
      user !== null  &&
      listing == null 
    ) {
      dto.user=user;
      this.repository.save(dto);
      return  {Message:"sucessfull register"};
    }
    else{
      return  {Message:"fail register"};
    }
  }

  async findAllOwner( updateListingDto: UpdateListingDto)  {
    const user = await this.userrepository.findOneBy({ user_id:updateListingDto.userid});
    if (
      user == null 
    ) {
      return {Message:"fail"}
    }
    else{
      const listing=await this.repository.findBy({user:user});
      return  {listing,Message:"sucessfull"};

    }
  }

  async getPropertyFiltered( filterDto: FilterListingDto) {
    const listings = await this.repository.createQueryBuilder("Li")
        .select("*")
        .where(
          `
          ${filterDto.country == null?"": " Li.country=:country "}
          ${filterDto.city == null?"": " and Li.city=:city"}
          ${filterDto.price_per_nig == null?"": "  and andLi.price_per_nig=:price_per_nig "}
          ${filterDto.num_bedrooms == null?"": " and Li.num_bedrooms=:num_bedrooms "}
          ${filterDto.num_bathrooms == null?"": "  and Li.num_bathrooms=:num_bathrooms "}
          ${filterDto.max_guests == null?"": " and Li.max_guests=:max_guests"}
          ${filterDto.searchtermn == null?"": " and Li.title Like :searchtermn"}
          `, 
          {
            city: filterDto.city,
            country: filterDto.country,
            price_per_nig: filterDto.price_per_nig,
            num_bedrooms: filterDto.num_bedrooms,
            num_bathrooms: filterDto.num_bathrooms,
            max_guests: filterDto.max_guests,
           })
        .getRawMany();
    return listings;
  }

  async getPropertyBuyer() {
    const listings = await this.repository.createQueryBuilder("Li")
        .select("*")
        .getRawMany();
    return listings;
  }



}
