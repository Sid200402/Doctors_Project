import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MedicineCategoryService } from './medicine-category.service';
import { CreateMedicineCategoryDto, PaginationDto } from './dto/create-medicine-category.dto';
import { UpdateMedicineCategoryDto } from './dto/update-medicine-category.dto';


@Controller('medicine-category')
export class MedicineCategoryController {
  constructor(private readonly medicineCategoryService: MedicineCategoryService) {}

  @Post()
  create(@Body() dto: CreateMedicineCategoryDto) {
    return this.medicineCategoryService.create(dto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.medicineCategoryService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicineCategoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMedicineCategoryDto) {
    return this.medicineCategoryService.update(id, dto);
  }
  @Patch('status/:id')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateMedicineCategoryDto) {
    return this.medicineCategoryService.updateStatus(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicineCategoryService.remove(id);
  }
}
