import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class User{
  @Column({default: true })
  isActive: boolean;

  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({
    nullable:false,
    type: 'text',
    unique: true,
  })  username: string;

  @Column({
    nullable:false,
    type: 'text',
    unique: true,
  })
  email: string;
  @Column({nullable:false,type:'text'})
  password: string;

  @Column({nullable:true,type:'text'})
  profile_picture: string;

  @Column({nullable:true,type:'text'})
  bio: string;

  @Column({nullable:false,type:'boolean'})
  is_owner: boolean;

  @Column({nullable:true,type:"time with time zone"})
  created_at: Date;

  @Column({nullable:true,type:"time with time zone"})
  updated_at: Date;

  @Column({nullable:true,type:"time with time zone"})
  deleted_at: string;

}
