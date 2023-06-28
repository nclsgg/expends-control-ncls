import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExpenseService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(createExpenseDto: CreateExpenseDto, categoryName: string, userId: string) {
    const userCategories = await this.prisma.category.findMany({ where: { userId } });
    const category = await userCategories.find((category) => category.name === categoryName);

    if (!category) {
      throw new Error('Category not found');
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

    await this.prisma.category.update({
      where: { id: category.id },
      data: {
        expenses: {
          connect: {
            id: data.id,
          },
        },
      },
    })

    return {
      ...data,
    }

  }

  findAll() {
    return `This action returns all expense`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
