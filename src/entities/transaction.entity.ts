import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  sum: number;

  @Column({ default: new Date().toLocaleString() })
  date: string;

  @ManyToOne((type) => User)
  from: User;

  @ManyToOne((type) => User)
  to: User;
}
