import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UnauthorizedError } from 'src/auth/errors/unauthorized.error';

@Injectable()
export class ExpenseService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(createExpenseDto: CreateExpenseDto, categoryName: string, userId: string) {
    const userCategories = await this.prisma.category.findMany({ where: { userId } });
    const category = await userCategories.find((category) => category.name === categoryName);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const data = await this.prisma.expense.create({
      data: {
        ...createExpenseDto,
        startDate: new Date(createExpenseDto.startDate),
        endDate: new Date(createExpenseDto.endDate),
        category: { connect: { id: category.id } },
        user: { connect: { id: userId } },
      },
    });

    return {
      ...data,
      message: 'Expense created successfully',
    };
  }

  async findAll() {
    return await this.prisma.expense.findMany();
  }

  async findById(id: string) {
    return await this.prisma.expense.findUnique({ where: { id } });
  }

  async findByUserId(userId: string) {
    return await this.prisma.expense.findMany({ where: { userId } });
  }

  async findByCurrentUser(userId: string) {
    return await this.prisma.expense.findMany({ where: { userId } });
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto, userId: string) {
    let expense: any;

    try {
      expense = await this.prisma.expense.findUnique({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Expense not found');
    }

    if (expense.userId !== userId) {
      throw new UnauthorizedError('You are not allowed to update this expense');
    }
    
    return await this.prisma.expense.update({
      where: { id },
      data: {
        ...updateExpenseDto,
      },
    });
  }

  async remove(id: string, userId: string) {
    let expense;

    try {
      expense = await this.prisma.expense.findUnique({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Expense not found');
    }

    if (expense.userId !== userId) {
      throw new UnauthorizedError('You are not allowed to delete this expense');
    }

    return await this.prisma.expense.delete({ where: { id } });
  }
}
