import 'reflect-metadata';
import { DataSource } from 'typeorm'
import { User } from '../entities/user.entity'

const mySqlDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'test',
  password: 'test-pw',
  database: 'login-test',
  entities: [User],
  logging: true,
  synchronize: process.env.environment === 'dev',
})

export default mySqlDataSource;