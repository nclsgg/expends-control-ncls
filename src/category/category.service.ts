import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto, userId: string) {
    const data = await this.prisma.category.create({
      data: {
        ...createCategoryDto,
        user: { connect: { id: userId } },
      },
    });

    return {
      ...data,
    };
  }

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async findById(id: string) {
    return await this.prisma.category.findUnique({ where: { id } });
  }

  async findByUserId(userId: string) {
    return await this.prisma.category.findMany({ where: { userId } });
  }

  async findByCurrentUser(userId: string) {
    return await this.prisma.category.findMany({ where: { userId } });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
