import { CreateUserDTO } from './model/create-user.dto';
import { User } from './model/user.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User')
        private readonly userModel: Model<User>
    ) { }

    async create(createdUserDTO: CreateUserDTO): Promise<User> {
        const createdUser = new this.userModel(createdUserDTO);
        return createdUser.save();
    }

    async getAll(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        return users;
    }

    async getById(id: string): Promise<User | undefined> {
        return await this.userModel.findById(id).exec();
    }

    async getByUsername(username: string): Promise<User | undefined> {
        return await this.userModel.findOne({ username }).exec();
    }

    async getByEmail(email: string): Promise<User | undefined> {
        return await this.userModel.findOne({ email }).exec();
    }
    
    async update(id: string, user: User): Promise<any> {
        return await this.userModel.findByIdAndUpdate(id, user)
    }

    async delete(id: string) {
        return await this.userModel.findByIdAndDelete(id)
    }
}