import { Listings } from 'src/listings/entities/listing.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ForeignKeyMetadata } from 'typeorm/metadata/ForeignKeyMetadata';


@Entity()
export class Review {
@PrimaryGeneratedColumn()
review_id : number;

@ManyToOne(() => Listings, { cascade: true })
@JoinColumn()
listing: Listings;

@ManyToOne(() => User, { cascade: true })
@JoinColumn()
user : User;

@Column("int4") 
rating : number;

@Column('text') 
comment : string;

@CreateDateColumn({nullable:true,type:"timestamptz"})
created_at: Date;

@UpdateDateColumn({nullable:true,type:"timestamptz"})
updated_at: Date;

@DeleteDateColumn({nullable:true,type:"timestamptz"})
deleted_at: Date;


}
 