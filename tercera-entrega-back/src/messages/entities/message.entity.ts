import { Listings } from 'src/listings/entities/listing.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Message  {
  @PrimaryGeneratedColumn()
  message_id: number;
  
  @ManyToOne(() => User, { cascade: true })
  @JoinColumn()
  sender_user: User;
  
  @ManyToOne(() => User, { cascade: true })
  @JoinColumn()
  receiver_user: User;
  
  @ManyToOne(() => Listings, {nullable:true, cascade: true })
  @JoinColumn()
  listing: Listings;
  
  @Column('text')
  message: string;
  
  @Column({default:false,type:"boolean"})
  Isread: boolean;

  @CreateDateColumn({nullable:true,type:"time with time zone"})
  created_at: string;

  @CreateDateColumn({nullable:true,type:"time with time zone"})
  updated_at: string;

  @CreateDateColumn({nullable:true,type:"time with time zone"})
  deleted_at: string;
  
}
