import {
  Check,
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Credentials } from "./credentials.entity";
import { UserRole } from "./role.entity";
import { Transaction } from "./transaction.entity";

@Entity()
@Check("sum > 0")
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

  @ManyToMany((type) => UserRole, (role) => role.user, { cascade: true })
  roles: UserRole[];
}
