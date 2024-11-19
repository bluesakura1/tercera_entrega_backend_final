import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Message } from './entities/message.entity';
import { Listings } from 'src/listings/entities/listing.entity';
import { ResiveMessageDto } from './dto/resive-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(User)
    protected readonly userrepository: Repository<User>,
    @InjectRepository(Listings)
    protected readonly listingrepository: Repository<Listings>,
    @InjectRepository(Message)
    private readonly repository: Repository<Message>,
  ) {}

  async send( createMessageDto: CreateMessageDto) {
    const {
      sender_user_id: sender_user_id,
      receiver_user_id: receiver_user_id,
      ...rest
    } = createMessageDto;
    const dto = rest;
    const senderUserid = await this.userrepository.findOneBy({ user_id: sender_user_id });
    const receiverUserid = await this.userrepository.findOneBy({ user_id: receiver_user_id });
    
    const listing = createMessageDto.listing_id == null?
    null :
     await this.listingrepository.findOneBy({
      listing_id: createMessageDto.listing_id,
    });

    if (senderUserid !== null && receiverUserid !== null) {
      dto.sender_user = senderUserid;
      dto.receiver_user = receiverUserid;
      listing != null? dto.listing = listing:null;
      this.repository.save(dto);
      return { Message: 'sucessfull booking', dto };
    } else {
      return { Message: 'fail'};
    }
  }

  async recive( resiveMessageDto: ResiveMessageDto) {
    const listings = await this.repository
      .createQueryBuilder('me')
      .select('*')
      .where(" me.receiver_user=:receiveruser or me.sender_user=:receiveruser",{receiveruser: resiveMessageDto.receiver_user_id})
      .getRawMany();
    return listings;
  }

  async findAll( resiveMessageDto: ResiveMessageDto) {
    
    await this.repository
      .createQueryBuilder()
      .update(Message)
      .set({ Isread: true })
      .where(" receiver_user=:receiveruser and sender_user=:senderuser",{senderuser:resiveMessageDto.sender_user_id,receiveruser: resiveMessageDto.receiver_user_id})
      .execute();

      const messages = await this.repository
      .createQueryBuilder('me')
      .select('*')
      .where(" me.receiver_user=:receiveruser and me.sender_user=:senderuser",{senderuser:resiveMessageDto.sender_user_id,receiveruser: resiveMessageDto.receiver_user_id})
      .getRawMany();


    //this.repository.update(resiveMessageDto.receiver_user_id,)
    return messages;
  }


  async findUnread( resiveMessageDto: ResiveMessageDto) {
    const messages = await this.repository
    .createQueryBuilder('me')
    .select('COUNT(*)')
    .where("me.Isread=:read and me.receiver_user=:receiveruser",{read:false,receiveruser: resiveMessageDto.receiver_user_id})
    .getRawMany();


  //this.repository.update(resiveMessageDto.receiver_user_id,)
  return messages;
}


}
