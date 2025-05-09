import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicineCategory } from './entities/medicine-category.entity';
import { CreateMedicineCategoryDto, PaginationDto } from './dto/create-medicine-category.dto';
import { UpdateMedicineCategoryDto } from './dto/update-medicine-category.dto';

@Injectable()
export class MedicineCategoryService {
  constructor(
    @InjectRepository(MedicineCategory)
    private medicineCategoryRepository: Repository<MedicineCategory>,
  ) {}

  async create(dto: CreateMedicineCategoryDto) {
    const existingCategory = await this.medicineCategoryRepository.findOne({
      where: { name: dto.name },
    });
    if (existingCategory) {
      throw new ConflictException(`Category with name ${dto.name} already exists`);
    }
    const obj = Object.create(dto);
    return this.medicineCategoryRepository.save(obj);
  }

  async findAll(paginationDto: PaginationDto) {

    const queryBuilder = this.medicineCategoryRepository
    .createQueryBuilder('category');
    if (paginationDto.keyword) {
      queryBuilder.andWhere(
        `(LOWER(category.name) LIKE LOWER(:keyword) OR LOWER(category.description) LIKE LOWER(:keyword))`,
        { keyword: `%${paginationDto.keyword}%` }
      );
    }
    if (paginationDto.status) {
      queryBuilder.andWhere(`category.status = :status`, { status: paginationDto.status });
    }
    const [result, total] = await queryBuilder
    .take(paginationDto.limit)
    .skip(paginationDto.offset)
    .getManyAndCount();

    return { result, total };
  }

  async findOne(id: string){
    const category = await this.medicineCategoryRepository.findOne({
      where: { id },
      relations: ['medicines'],
    });

    if (!category) {
      throw new NotFoundException(`Medicine category with ID ${id} not found`);
    }

    return category;
  }

  async update(id: string, dto: UpdateMedicineCategoryDto) {
    const category = await this.medicineCategoryRepository.findOne({
      where: { id }});

    if (dto.name && dto.name !== category.name) {
      const existingCategory = await this.medicineCategoryRepository.findOne({
        where: { name: dto.name },
      });

      if (existingCategory) {
        throw new ConflictException(`Category with name ${dto.name} already exists`);
      }
    }
    const obj = Object.assign(category, dto);
    return this.medicineCategoryRepository.save(category);
  }
  
  async updateStatus(id: string, dto:UpdateMedicineCategoryDto) {
    const category = await this.medicineCategoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Medicine category with ID ${id} not found`);
    }
    const obj = Object.assign(category, dto);
    return this.medicineCategoryRepository.save(obj);

  }



  async remove(id: string): Promise<void> {
    const category = await this.findOne(id);

    if (category.medicines && category.medicines.length > 0) {
      throw new BadRequestException(`Cannot delete category with associated medicines`);
    }
    await this.medicineCategoryRepository.remove(category);
  }
}
