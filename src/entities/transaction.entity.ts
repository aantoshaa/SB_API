import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  sum: number;

  @ManyToOne((type) => User, (user) => user.lastName)
  from: User;

  @ManyToOne((type) => User, (user) => user.transaction)
  to: User;
}
