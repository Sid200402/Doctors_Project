import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { MedicineStockService } from './medicine-stock.service';

import { PaginationDto } from '../medicine/dto/create-medicine.dto';
import { DecreaseStockDto, MedicineStockDto, UpdateBatchVendorInfoDto, UpdateStockDto } from './dto/create-medicine-stock.dto';

@Controller('medicine-stock')
export class MedicineStockController {
  constructor(private readonly medicineStockService: MedicineStockService) {}


  @Post('add')
  async addStock(@Body() dto: MedicineStockDto) {
    return this.medicineStockService.addStock(dto);
  }

  @Get('expiry-alerts')
  async checkExpiryAlerts() {
    return this.medicineStockService.checkExpiryAlerts();
  }

  @Put('update-or-add/:stockId')
  async updateOrAddStock(
    @Param('stockId') stockId: string,
    @Body() dto: UpdateStockDto,
  ) {
    dto.stockId = stockId;
    return this.medicineStockService.updateOrAddStock(dto);
  }

  @Put('decrease/:stockId')
  async decreaseStockQuantity(
    @Param('stockId') stockId: string,
    @Body()dto: DecreaseStockDto,
  ) {
    dto.stockId = stockId;
    return this.medicineStockService.decreaseStockQuantity(dto);
  }

  @Put('update-batch-vendor/:stockId')
  async updateBatchVendorInfo(
    @Param('stockId') stockId: string,
    @Body() dto:UpdateBatchVendorInfoDto) {
      dto.stockId = stockId;
    return this.medicineStockService.updateBatchVendorInfo(dto);
  }
}
