import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Credentials } from "./credentials.entity";
import { UserRole } from "./role.entity";
import { Transaction } from "./transaction.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: 300 })
  sum: number;

  @OneToOne((type) => Credentials, (credentials) => credentials.user, {
    cascade: true,
  })
  credentials: Credentials;

  @OneToMany((type) => Transaction, (transaction) => transaction)
  transaction: Transaction[];

  @ManyToMany((type) => UserRole, (role) => role.user, { cascade: true })
  roles: UserRole[];
}
