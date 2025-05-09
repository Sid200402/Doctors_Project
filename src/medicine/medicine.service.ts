import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, Not, IsNull } from 'typeorm';
import { Medicine } from './entities/medicine.entity';
import { CreateMedicineDto, PaginationDto } from './dto/create-medicine.dto';
import { PrescribedMedicine } from '../prescribed-medicine/entities/prescribed-medicine.entity';
import { MedicineCategory } from '../medicine-category/entities/medicine-category.entity';
import { MedicineStock } from '../medicine-stock/entities/medicine-stock.entity';
import { UpdateMedicineDto } from './dto/update-medicine.dto';

@Injectable()
export class MedicineService {
  constructor(
    @InjectRepository(Medicine)
    private medicineRepository: Repository<Medicine>,
    @InjectRepository(MedicineStock)
    private medicineStockRepository: Repository<MedicineStock>,
    @InjectRepository(PrescribedMedicine)
    private prescribedMedicineRepository: Repository<PrescribedMedicine>,
    @InjectRepository(MedicineCategory)
    private medicineCategoryRepository: Repository<MedicineCategory>,
  ) { }

  async create(dto: CreateMedicineDto) {
    const existingMedicine = await this.medicineRepository.findOne({
      where: { name: dto.name },
    });

    if (existingMedicine) {
      throw new BadRequestException(`Medicine with name ${dto.name} already exists`);
    }

    if (dto.categoryId) {
      const category = await this.medicineCategoryRepository.findOne({
        where: { id: dto.categoryId },
      });

      if (!category) {
        throw new NotFoundException(`Category with ID not found`);
      }
    }
    const obj = Object.create(dto);
    return this.medicineRepository.save(obj);
  }

  async findAll(dto: PaginationDto) {
    const queryBuilder = this.medicineRepository
      .createQueryBuilder('medicine')
      .leftJoinAndSelect('medicine.category', 'category')
      .leftJoinAndSelect('medicine.stock', 'stock')
      .select([
        'medicine.id',
        'medicine.name',
        'medicine.brand',
        'medicine.composition',
        'medicine.form',
        'medicine.strength',
        'medicine.dosageInstructions',
        'medicine.sideEffects',
        'medicine.contraindications',
        'medicine.isActive',
        'medicine.manufacturer',
        'medicine.minimumStockLevel',
        'medicine.createdAt',
        'category.id',
        'category.name',
        'stock.id',
        'stock.expiryDate',
        'stock.quantity',
        'stock.consumedQuantity',
        'stock.status',
        'stock.isActive',
      ]);

    if (dto.name) {
      queryBuilder.andWhere('medicine.name ILIKE :name', { name: `%${dto.name}%` });
    }

    if (dto.brand) {
      queryBuilder.andWhere('medicine.brand ILIKE :brand', { brand: `%${dto.brand}%` });
    }

    if (dto.categoryId) {
      queryBuilder.andWhere('medicine.categoryId = :categoryId', { categoryId: dto.categoryId });
    }

    if (dto.form) {
      queryBuilder.andWhere('medicine.form = :form', { form: dto.form });
    }

    if (dto.form) {
      queryBuilder.andWhere('medicine.form ILIKE :form', { form: `%${dto.form}%` });
    }

    if (dto.manufacturer) {
      queryBuilder.andWhere('medicine.manufacturer ILIKE :manufacturer', { manufacturer: `%${dto.manufacturer}%` });
    }
    else {
      queryBuilder.orderBy('medicine.name', 'ASC');
    }
    const [result, total] = await queryBuilder
      .take(dto.limit)
      .skip(dto.offset)
      .getManyAndCount();

    return { result, total };
  }


  async findOne(id: string): Promise<Medicine> {
    const medicine = await this.medicineRepository.findOne({
      where: { id },
      relations: ['category', 'stock'],
    });

    if (!medicine) {
      throw new NotFoundException(`Medicine with ID ${id} not found`);
    }

    return medicine;
  }

  async incrementUsageFrequency(medicineId: string) {
    const medicine = await this.medicineRepository.findOne({ where: { id: medicineId } });
    if (!medicine) {
      throw new NotFoundException(`Medicine with ID ${medicineId} not found`);
    }
    await this.medicineRepository.update(medicine.id, {
      usageFrequency: medicine.usageFrequency ? medicine.usageFrequency + 1 : 1,
    });
  }

  async update(id: string, dto: UpdateMedicineDto) {
    const existingMedicine = await this.medicineRepository.findOne({
      where: { id },
    });

    if (existingMedicine) {
      throw new BadRequestException(`Medicine already exists`);
    }

    if (dto.categoryId) {
      const category = await this.medicineCategoryRepository.findOne({
        where: { id: dto.categoryId },
      });

      if (!category) {
        throw new NotFoundException(`Category with ID ${dto.categoryId} not found`);
      }
    }

    const obj = Object.assign(existingMedicine, dto);

    return this.medicineRepository.save(obj);
  }
}
