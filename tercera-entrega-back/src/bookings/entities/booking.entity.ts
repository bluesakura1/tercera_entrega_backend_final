import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Listings } from '../../listings/entities/listing.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  booking_id: number;

  @ManyToOne(() => Listings, { cascade: true })
  @JoinColumn()
  listing: Listings;

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User;

  @Column({nullable:true,type:"timestamptz"})
  start_date: Date;
  
  @Column({nullable:true,type:"timestamptz"})
  end_date: Date;
  
  @Column("float8")
  total_price:number;

  @Column({default:false,type:"boolean"})
  Isread: boolean;

  @CreateDateColumn({nullable:true,type:"timestamptz"})
  created_at: Date;

  @UpdateDateColumn({nullable:true,type:"timestamptz"})
  updated_at: Date;

  @Column({nullable:true,type:"timestamptz"})
  deleted_at: Date;

  @DeleteDateColumn({nullable:true,type:"timestamptz"})
  canceled: boolean;
}
