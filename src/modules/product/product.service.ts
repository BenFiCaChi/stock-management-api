import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { getPagination } from 'src/common/utils/pagination.util';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductDto) {
    return await this.prisma.product.create({ data });
  }

  async findAll(pagination: PaginationDto) {
    const { page, limit } = pagination;

    const { skip, take } = getPagination(page ?? 1, limit ?? 10);

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        skip,
        take,
      }),
      this.prisma.product.count({ where: { deletedAt: null } }),
    ]);
    return new PaginatedResponseDto(data, total, page ?? 1, limit ?? 10);
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async update(id: number, data: UpdateProductDto) {
    await this.findOne(id);
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
