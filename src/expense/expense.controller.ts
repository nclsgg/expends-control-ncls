import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto, @CurrentUser() user: User) {
    const { categoryName } = createExpenseDto;
    const createExpenseDtoWithoutCategoryName = { ...createExpenseDto, categoryName: undefined };
    return this.expenseService.create(createExpenseDtoWithoutCategoryName, categoryName, user.id);
  }

  @Get()
  findAll() {
    return this.expenseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseService.findById(id);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.expenseService.findByUserId(userId);
  }

  @Get('user')
  findByCurrentUser(@CurrentUser() user: User) {
    return this.expenseService.findByCurrentUser(user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto, @CurrentUser() user: User) {
    return this.expenseService.update(id, updateExpenseDto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.expenseService.remove(id, user.id);
  }
}
