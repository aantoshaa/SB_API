import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Credentials {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne((type) => User, (user) => user.credentials)
  @JoinColumn()
  user: User;
}
