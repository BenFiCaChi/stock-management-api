import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { getPagination } from 'src/common/utils/pagination.util';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';

@Injectable()
export class WarehouseService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateWarehouseDto) {
    return await this.prisma.warehouse.create({ data });
  }

  async findAll(pagination: PaginationDto) {
    const { page, limit } = pagination;

    const { skip, take } = getPagination(page ?? 1, limit ?? 10);

    const [data, total] = await Promise.all([
      this.prisma.warehouse.findMany({
        skip,
        take,
      }),
      this.prisma.warehouse.count({ where: { deletedAt: null } }),
    ]);
    return new PaginatedResponseDto(data, total, page ?? 1, limit ?? 10);
  }

  async findOne(id: number) {
    const warehouse = await this.prisma.warehouse.findUnique({
      where: { id },
    });
    if (!warehouse) {
      throw new NotFoundException(`Warehouse with id ${id} not found`);
    }

    return warehouse;
  }

  async update(id: number, data: UpdateWarehouseDto) {
    await this.findOne(id); // Ensure the warehouse exists before updating

    return this.prisma.warehouse.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Ensure the warehouse exists before deleting

    return await this.prisma.warehouse.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
