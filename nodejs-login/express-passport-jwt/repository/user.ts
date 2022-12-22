import User from "../entities/user";


export function findOneBy(id: string): User | null {
  if (id === 'testid') {
    const user = new User();
    user.id = id;
    user.name = '유저 이름';
    return user;
  }

  return null
}