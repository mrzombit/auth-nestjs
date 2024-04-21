import { CreateUserDTO } from './../user/model/create-user.dto';
import { User } from './../user/model/user.interface';
import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { hashPassword } from 'src/_utils/hashPassword';
import { validatePassword } from 'src/_utils/validatePassword';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.userService.getByUsername(username);
        const passwordValid = user && await validatePassword(password, user.password)
        if (!user) throw new BadRequestException('User does not exist!');
        if (!passwordValid) throw new UnauthorizedException('Password is not valid!');
        if (user && passwordValid) return user;
        else return null;
    }

    async login(user: any) {
        const payload = {
            _id: user._id,
            username: user.username
        }
        return {
            access_token: this.jwtService.sign(payload)
        };
    }

    async register(registerDTO: CreateUserDTO): Promise<User> {
        const emailValid = await this.userService.getByEmail(registerDTO.email)
        const usernameValid = await this.userService.getByUsername(registerDTO.username)

        if (usernameValid) {
            throw new ConflictException(`This username is already used`);
        } else if (emailValid) {
            throw new ConflictException(`This email is already used`);
        } else {
            const hashedPassword = await hashPassword(registerDTO.password)
            return await this.userService.create({ ...registerDTO, password: hashedPassword })
        }
    }

}