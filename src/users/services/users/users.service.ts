import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/typeorm/entities/Address';
import { Post } from 'src/typeorm/entities/Post';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, CreateUserProfileParams, UpdateUserParams, CreateUserPostParams, CreateUserAddressParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
        @InjectRepository(Post) private postRepository: Repository<Post>,
        @InjectRepository(Address) private addressRepository: Repository<Address>,
    ) {}
    findUsers() {
        return this.userRepository.find({ relations: ['profile', 'posts', 'addresses']});
    }
    createUser(userDetails: CreateUserParams) {
        const newUser  = this.userRepository.create({
            ...userDetails, 
            createdAt: new Date(),
        });

        return this.userRepository.save(newUser);
    }
    updateUser(id: number, updateUserDetails: UpdateUserParams) {
        return this.userRepository.update({ id }, { ...updateUserDetails });
    }
    deleteUserById(id: number) {
        return this.userRepository.softDelete({ id });
    }
    async createUserProfile(id: number, createUserProfileDetails: CreateUserProfileParams) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new HttpException(
                'User not found. Cannot create Profile',
                HttpStatus.BAD_REQUEST,
            );
        }
        const newProfile = this.profileRepository.create(createUserProfileDetails);
        const savedProfile = await this.profileRepository.save(newProfile);
        user.profile = savedProfile;
        return this.userRepository.save(user);
    }

    async createUserPost(id: number, createUserPostDetails: CreateUserPostParams) {
        const user = await this.userRepository.findOneBy({ id });
        if(!user) {
            throw new HttpException(
                'User not Found. Cannot create Post',
                HttpStatus.BAD_REQUEST,
            );
        }
        const newPost = this.postRepository.create({
            ...createUserPostDetails,
            user
        });
        return this.postRepository.save(newPost);
    }
    async createUserAddress(id: number, createUserAddressDetails: CreateUserAddressParams) {
        const user = await this.userRepository.findOneBy({ id });
        if(!user) {
            throw new HttpException(
                'User not found. Cannot create Address',
                HttpStatus.BAD_REQUEST,
            );
        }
        const newAddress = this.addressRepository.create(createUserAddressDetails);
        const savedAddress = await this.addressRepository.save(newAddress);
        user.addresses = [savedAddress];
        return this.userRepository.save(user);

    }
}
