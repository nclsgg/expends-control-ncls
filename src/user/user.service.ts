import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const data = {
      ...createUserDto,
      password: await bcrypt.hashSync(createUserDto.password, 10),
    }

    if ( await this.prisma.user.findUnique({ where: { email: data.email } }) )
      throw new Error('Email already exists')

    const createdUser = await this.prisma.user.create({ data });

    return {
      message: 'User created successfully',
      data: {
        ...createdUser,
        password: undefined,
      }
    };
  }

  async findAll() {
    const users = await this.prisma.user.findMany();

    const data = users.map((user) => ({
      ...user,
    }));

    return {
      message: 'Users retrieved successfully',
      data: [
        ...data,
      ]
    }
  }

  async findOne(email: string) {
    const data = await this.prisma.user.findUnique({ where: { email } });

    return {
      message: 'User retrieved successfully',
      data: {
        ...data,
      }
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const data = await this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        password: updateUserDto.password ? bcrypt.hashSync(updateUserDto.password, 10) : undefined,
      },
    });

    return {
      message: 'User updated successfully',
      data: {
        ...data,
      }
    };
  }

  async remove(id: string) {
    const data = await this.prisma.user.delete({ where: { id } })

    return {
      message: 'User deleted successfully',
      data: {
        ...data,
      }
    };
  }
}
