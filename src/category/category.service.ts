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

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.prisma.category.update({
      where: { id },
      data: {
        ...updateCategoryDto,
      },
    });
  }

  async remove(id: string) {
    const expensesDeleted = await this.prisma.expense.deleteMany({ where: { categoryId: id } });
    
    await this.prisma.category.delete({ where: { id } });

    return `Deleted ${expensesDeleted.count} expenses and category with id ${id}`
  }
}
