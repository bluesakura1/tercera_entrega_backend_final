import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  photo_id: number;
  
  listing_id: number;
  
  @Column('text')
  photo_url: string;
  
  @Column({nullable:true,type:"time with time zone"})
  created_at: string;
  
  @Column({nullable:true,type:"time with time zone"})
  deleted_at: string;
  

}
