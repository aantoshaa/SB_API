import { UserRole } from "../entities/role.entity";
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

    const user = UserRepostirory.create({ firstName, lastName });

    const credentials = CredentialsRepository.create({ email, password });

    const role = UsersRoleRepository.create();

    user.credentials = credentials;

    user.roles = [role];

    await UserRepostirory.save(user);

    return { firstName, lastName };
  }
}
