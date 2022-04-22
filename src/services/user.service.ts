import jwt from "jsonwebtoken";
import { DeleteResult } from "typeorm";
import { User } from "../entities/user.entity";
import { CredentialsRepository } from "../repositories/credentials.repository";
import { UsersRoleRepository } from "../repositories/user-role.repository";
import { UserRepostirory } from "../repositories/user.repository";
import { CreateUserDto } from "../shared/interfaces/create-user.dto";

export class UserService {
  static async deleteUser(id: number): Promise<DeleteResult> {
    return UserRepostirory.delete({ id });
  }

  static async getAllUsers(): Promise<User[]> {
    return UserRepostirory.find({
      relations: {
        credentials: true,
        roles: true,
      },
    });
  }

  static async getUserById(id: number): Promise<User | null> {
    return UserRepostirory.findOne({
      where: {
        id,
      },
    });
  }

  static async isUserExistsByEmail(email: string): Promise<boolean> {
    const user = await UserRepostirory.findOne({
      where: { credentials: { email } },
    });

    if (user) return true;

    return false;
  }

  static async createUser(
    createUserDto: CreateUserDto
  ): Promise<Pick<User, "firstName" | "lastName">> {
    const { firstName, lastName, email, password } = createUserDto;
    const user = UserRepostirory.create({ firstName, lastName });
    const credentials = CredentialsRepository.create({ email, password });
    const role = UsersRoleRepository.create();

    user.credentials = credentials;
    user.roles = [role];

    await UserRepostirory.save(user);
    return { firstName, lastName };
  }

  static loginUser(id: number, roles: string[]): { token: string } {
    return {
      token: jwt.sign({ sub: id, roles }, process.env.TOKEN_KEY_WORD),
    };
  }
}
