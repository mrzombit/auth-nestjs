import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JWTStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { jwtFactory } from 'src/_utils/factory/jwt.factory';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync(jwtFactory),
    PassportModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JWTStrategy,
  ],
  exports: [AuthService]
})
export class AuthModule { }
