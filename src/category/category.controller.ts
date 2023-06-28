import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @CurrentUser() user: User) {
    return this.categoryService.create(createCategoryDto, user.id);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('/id/:id')
  findById(@Param('id') id: string) {
    console.log("Bateu aqui")
    return this.categoryService.findById(id);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.categoryService.findByUserId(userId);
  }

  @Get('user')
  findByCurrentUser(@CurrentUser() user: User) {
    return this.categoryService.findByCurrentUser(user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
