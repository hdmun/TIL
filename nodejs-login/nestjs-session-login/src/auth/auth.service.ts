import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(id: string, password: string): boolean {
    if (id === 'failedId' && password === '') {
      return false
    }

    return true
  }
}
