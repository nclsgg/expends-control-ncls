import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UnauthorizedError } from 'src/auth/errors/unauthorized.error';

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
      message: 'Category created successfully',
      data: {
        ...data,
      }
    }
  }

  async findAll() {
    const data = await this.prisma.category.findMany();

    return {
      message: 'Categories retrieved successfully',
      data: [
        ...data,
      ]
    }
  }

  async findById(id: string) {
    const data = await this.prisma.category.findUnique({ where: { id } });

    return {
      message: 'Category retrieved successfully',
      data: {
        ...data,
      }
    }
  }

  async findByUserId(userId: string) {
    const data = await this.prisma.category.findMany({ where: { userId } });

    return {
      message: 'Categories retrieved successfully',
      data: [
        ...data,
      ]
    }
  }

  async findByCurrentUser(userId: string) {
    const data = await this.prisma.category.findMany({ where: { userId } });

    return {
      message: 'Categories retrieved successfully',
      data: [
        ...data,
      ]
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto, userId: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.userId !== userId) {
      throw new UnauthorizedError('You are not allowed to update this category');
    }

    const data = await this.prisma.category.update({
      where: { id },
      data: {
        ...updateCategoryDto,
      },
    });

    return {
      message: 'Category updated successfully',
      data: {
        ...data,
      }
    }
  }

  async remove(id: string, userId: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.userId !== userId) {
      throw new UnauthorizedError('You are not allowed to delete this category');
    }

    await this.prisma.expense.deleteMany({ where: { categoryId: id } });
    
    const data = await this.prisma.category.delete({ where: { id } });

    return {
      message: 'Category deleted successfully',
      data: {
        ...data,
      }
    }

  }
}
