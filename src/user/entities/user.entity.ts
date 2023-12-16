import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class UserEnd {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  surname: string;

  @Column({ nullable: false })
  password: string;
}
