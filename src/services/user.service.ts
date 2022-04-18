import jwt from "jsonwebtoken";
import { CredentialsRepository } from "../repositories/credentials.repository";
import { UsersRoleRepository } from "../repositories/user-role.repository";
import { UserRepostirory } from "../repositories/user.repository";
import { CreateUserDto } from "../shared/interfaces/create-user.dto";

export class UserService {
  static async isUserExists(email: string) {
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

  static loginUser(id: number): { token: string } {
    return {
      token: jwt.sign({ sub: id }, "secret"),
    };
  }
}
