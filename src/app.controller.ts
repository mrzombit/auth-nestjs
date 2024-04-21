import { JWTAuthGuard } from './auth/guard/jwt-auth.guard';
import { CreateUserDTO } from './user/model/create-user.dto';
import { AuthService } from './auth/auth.service';
import { Controller, Post, Body, Request, Get, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  //Public route without protection
  @Post('register')
  register(@Body() registerDTO: CreateUserDTO): any{
    return this.authService.register(registerDTO)
  }
  
  //LocalStrategy requires username and password
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req){
    return this.authService.login(req.user)
  }

  //JWTStrategy requires Bearer Token
  @UseGuards(JWTAuthGuard)
  @Get('profile')
  profile(@Request() req): any{
    return req.user
  }

}
