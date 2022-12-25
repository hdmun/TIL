import User from "../entities/user";


export function findOneById(id: number): User | null {
  if (id === 1) {
    const user = new User();
    user.id = 1;
    user.email = 'test@email.com';
    user.firstName = '희대';
    user.lastName = '문';
    user.password = 'testpassword';
    return user;
  }

  return null
}

export function findOneBy(email: string): User | null {
  if (email === 'test@email.com') {
    const user = new User();
    user.id = 1;
    user.email = email;
    user.firstName = '희대';
    user.lastName = '문';
    user.password = 'testpassword';
    return user;
  }

  return null
}