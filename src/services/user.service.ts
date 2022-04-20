import jwt from "jsonwebtoken";
import { User } from "../entities/user.entity";
import { ForbiddenException } from "../error-handnling/exceptions";
import { CredentialsRepository } from "../repositories/credentials.repository";
import { TransactionRepository } from "../repositories/transaction.repository";
import { UsersRoleRepository } from "../repositories/user-role.repository";
import { UserRepostirory } from "../repositories/user.repository";
import { CreateUserDto } from "../shared/interfaces/create-user.dto";

export class UserService {
  static async getUserById(id: number): Promise<User> {
    return UserRepostirory.findOne({
      where: {
        id,
      },
    });
  }

  static async isUserExistsByEmail(email: string) {
    const user = await UserRepostirory.findOne({
      where: { credentials: { email } },
    });

    if (user) return true;

    return false;
  }

  static async createUser(createUserDto: CreateUserDto) {
    const { firstName, lastName, email, password } = createUserDto;

    const user = UserRepostirory.create({ firstName, lastName }); // set user entity

    const credentials = CredentialsRepository.create({ email, password }); // set credentials entity

    const role = UsersRoleRepository.create(); // set role entity with default value ( UserRole.USER )

    user.credentials = credentials; // attach credentials to user

    user.roles = [role]; // attach role to user

    await UserRepostirory.save(user); // save user into repo

    return { firstName, lastName };
  }

  static loginUser(id: number, roles: string[]): { token: string } {
    return {
      token: jwt.sign({ sub: id, roles }, process.env.TOKEN_KEY_WORD),
    };
  }

  static async getAllUsers() {
    const users = await UserRepostirory.find({
      relations: {
        roles: true,
        credentials: true,
      },
    });

    return users;
  }
}

//cash withdrawal снятие денег
//account replenishment пополнение счёта
