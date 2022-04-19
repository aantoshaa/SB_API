import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "../shared/enums/admin.enum";
import { User } from "./user.entity";

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "enum", enum: Role, default: Role.ADMIN })
  role: Role;

  @ManyToMany((type) => User, (user) => user.roles)
  @JoinTable()
  user: User[];
}
