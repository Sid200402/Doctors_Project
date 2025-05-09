import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from './entities/setting.entity';
import { Repository } from 'typeorm/repository/Repository';
import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';
import { Brackets } from 'typeorm';

@Injectable()


export class SettingService {

  constructor(
@InjectRepository(Setting) private readonly  settingRepo: Repository<Setting>,



  ){}
  async create(dto:CreateSettingDto){
    const setting = await this.settingRepo.findOne({where:{title:dto.title}});
    if (setting) {
        throw new ConflictException('Setting alredy exist')
    }
    const obj = Object.create(dto);
    return this.settingRepo.save(obj);

}
async findAll(dto: CommonPaginationDto){
    const keyword = dto.keyword ||'';
    const queryBuilder =this.settingRepo.createQueryBuilder('setting');
  if(keyword)
 queryBuilder.andWhere(
    new Brackets((qb) => {
      qb.where('setting.title LIKE :keyword', { keyword: `%${keyword}%` })

    }),
  );

const [result, total] = await queryBuilder
  .skip(dto.offset)
  .take(dto.limit)
  .getManyAndCount();

return { result, total };
}
async findOne(id:string) {
const result = await this.settingRepo.findOne({where:{id}});
if (!result) {
  throw new NotFoundException('About Us Not Exist..')
}
return result;
}

async logo(logo: string, result: Setting) {
  const obj = Object.assign(result, {
    logo: process.env.NEST_URL + logo,
    logoPath: logo,
  });
  return this.settingRepo.save(obj);
}

async update(id: string, dto: UpdateSettingDto) {
  const result = await this.settingRepo.findOne({where:{id:id}});
  if (!result) {
    throw new NotFoundException('Setting Not Exist..')
  }
  const obj  = Object.assign(result,dto);
  return this.settingRepo.save(obj);
}

  remove(id: number) {
    return `This action removes a #${id} setting`;
  }
}
