import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SessionModule } from 'nestjs-session';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    SessionModule.forRoot({
      session: {
        secret: 'session-secret',
        resave: false,  // recommand
        saveUninitialized: false,  // recommand
        cookie: {
          maxAge: 60 * 1000,  // 예제용 코드이므로 대충 1분으로 잡자
        }
      }
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
