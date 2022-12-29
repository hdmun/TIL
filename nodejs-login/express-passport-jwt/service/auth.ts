import { IVerifyOptions } from 'passport-local';

import dataSource from '../loaders/mysql'
import { User } from '../entities/user.entity';

export async function verifyPassport(
  username: string,
  password: string,
  done: (error: any, user?: any, options?: IVerifyOptions) => void
): Promise<void> {
  try {
    const loginResult = await login(username, password);
    if (!loginResult) {
      done(null, null, { message: 'invalid username or password' });
      return;
    }

    done(null, loginResult);
  } catch (error) {
    console.error(error);
    done(error);
  }
};


// dto로 전달하는게 깔끔할라나?
export async function register(email: string, password: string, firstName: string, lastName: string): Promise<User | null> {
  const userRepository = dataSource.getRepository(User);
  const duplicateUser =  await userRepository.findOneBy({ email })
  if (!!duplicateUser) {
    // duplicate email
    return null
  }

  const user = User.create(email, password, firstName, lastName);
  return await userRepository.save(user);
}

export async function login(email: string, password: string): Promise<User | null> {
  const user =  await dataSource.getRepository(User).findOneBy({ email })
  if (!user) {
    return null
  }

  // 임시
  if (user.password !== password) {
    return null;
  }

  return user;
}
