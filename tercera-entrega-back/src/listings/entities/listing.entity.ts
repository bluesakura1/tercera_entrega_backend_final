import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';


@Entity()
export class Listings {
  @PrimaryGeneratedColumn()
  listing_id: number;
  
  @ManyToOne(() => User, {nullable:false, cascade: true })
  @JoinColumn()
  user: User;


  @Column({nullable:false,type:"text"})
  title: string;

  @Column('text')
  description: string;

  @Column({nullable:false,type:"text"})
  address: string;

  @Column({nullable:false,type:"text"})
  city: string;

  @Column({nullable:false,type:"text"})
  country: string;

  @Column({nullable:false,type:"float8"})
  latitude: number;

  @Column({nullable:false,type:"float8"})
  longitude: number;

  @Column({nullable:false,type:"float8"})
  price_per_nig: number;

  @Column({nullable:false,type:"int8"})
  num_bedrooms: number;

  @Column({nullable:false,type:"int8"})
  num_bathrooms: number;

  @Column({nullable:false,type:"int8"})
  max_guests: number;

  @CreateDateColumn({nullable:true,type:"time with time zone"})
  created_at: string;

  @UpdateDateColumn({nullable:true,type:"time with time zone"})
  updated_at: string;

  @DeleteDateColumn({nullable:true,type:"time with time zone"})
  deleted_at: string;

}
