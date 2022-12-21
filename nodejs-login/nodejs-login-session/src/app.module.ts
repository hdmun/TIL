import { Module } from '@nestjs/common';
import { SessionModule } from 'nestjs-session';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SessionModule.forRoot({
      session: {
        secret: 'session-secret',
        resave: false,  // recommand
        saveUninitialized: false,  // recommand
        cookie: {
          maxAge: 3000,  // 3 seconds
        }
      }
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
