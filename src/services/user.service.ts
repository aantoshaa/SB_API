import { CreateUserDto } from "../controllers/user.controller";
import { CredentialsRepository } from "../repositories/credentials.repository";
import { UserRepostirory } from "../repositories/user.repository";

export class UserService {
  static async isUserExists(email: string) {
    const user = await UserRepostirory.findOne({
      where: { credentials: { email } },
    });

    if (user) return true;

    return false;
  }

  static async createUser(createUserDto: CreateUserDto) {
    console.log(createUserDto);

    const { firstName, lastName, email, password } = createUserDto;

    const user = UserRepostirory.create({ firstName, lastName });

    const credentials = CredentialsRepository.create({ email, password });

    user.credentials = credentials;

    await UserRepostirory.save(user);

    return { firstName, lastName };
  }
}
