import { User } from './../../user/model/user.interface';
import { AuthService } from './../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(private authService: AuthService){
       super();
    }

    async validate(username: string, password: string): Promise<User>{
        const user = await this.authService.validateUser(username, password)
        if(!user) throw new UnauthorizedException("Incorrect username or password!")
        else return user
    }

}