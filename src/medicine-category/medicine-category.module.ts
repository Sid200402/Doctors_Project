import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicineCategoryService } from './medicine-category.service';
import { MedicineCategoryController } from './medicine-category.controller';
import { MedicineCategory } from './entities/medicine-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicineCategory])],
  controllers: [MedicineCategoryController],
  providers: [MedicineCategoryService],
  exports: [MedicineCategoryService],
})
export class MedicineCategoryModule {}