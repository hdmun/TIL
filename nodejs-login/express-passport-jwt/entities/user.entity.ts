import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('IDX_USERS_EMAIL', { unique: true })
  @Column({ length: 255, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  static create(email: string, password: string, firstName: string, lastName: string): User {
    const user = new User();
    user.email = email;
    user.password = password;
    user.firstName = firstName;
    user.lastName = lastName;
    return user;
  }
}
