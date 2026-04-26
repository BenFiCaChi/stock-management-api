import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { MovementService } from './movement.service';
import { CreateMovementDto } from './dto/create-movement.dto';

@Controller('movements')
export class MovementController {
  constructor(private movementService: MovementService) {}

  @Post()
  create(@Body() body: CreateMovementDto) {
    return this.movementService.create(body);
  }

  @Get()
  findAll() {
    return this.movementService.findAll();
  }

  @Get('stock')
  getStock(
    @Query('productId') productId: number,
    @Query('warehouseId') warehouseId: number,
  ) {
    return this.movementService.getStock(productId, warehouseId);
  }
}
