import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovementDto } from './dto/create-movement.dto';

@Injectable()
export class MovementService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateMovementDto) {
    switch (data.type) {
      case 'ENTRY':
        return await this.handleEntry(data);

      case 'EXIT':
        return await this.handleExit(data);

      case 'TRANSFER':
        return await this.handleTransfer(data);

      default:
        throw new BadRequestException('Invalid movement type');
    }
  }

  async findAll() {
    return await this.prisma.movement.findMany();
  }

  // 🔹 ENTRADA
  private async handleEntry(data: CreateMovementDto) {
    return await this.prisma.movement.create({
      data: {
        productId: data.productId,
        quantity: data.quantity,
        warehouseId: data.warehouseId,
        type: 'Entry',
      },
    });
  }

  // 🔹 SAÍDA
  private async handleExit(data: CreateMovementDto) {
    const stock = await this.getStock(data.productId, data.warehouseId);

    if (stock < data.quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    return await this.prisma.movement.create({
      data: {
        productId: data.productId,
        quantity: data.quantity,
        warehouseId: data.warehouseId,
        type: 'Exit',
      },
    });
  }

  // 🔹 TRANSFERÊNCIA
  private async handleTransfer(data: CreateMovementDto) {
    const stock = await this.getStock(data.productId, data.warehouseId);

    if (stock < data.quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    return await this.prisma.$transaction([
      // saída
      this.prisma.movement.create({
        data: {
          productId: data.productId,
          quantity: data.quantity,
          warehouseId: data.warehouseId,
          type: 'Exit',
        },
      }),

      // entrada
      this.prisma.movement.create({
        data: {
          productId: data.productId,
          quantity: data.quantity,
          warehouseId: data.warehouseId,
          type: 'Entry',
        },
      }),
    ]);
  }

  // 🔹 STOCK ATUAL
  private async calculateStock(productId: number, warehouseId: number) {
    const entries = await this.prisma.movement.aggregate({
      _sum: { quantity: true },
      where: { productId, warehouseId, type: 'Entry' },
    });

    const exits = await this.prisma.movement.aggregate({
      _sum: { quantity: true },
      where: { productId, warehouseId, type: 'Exit' },
    });

    return (entries._sum.quantity || 0) - (exits._sum.quantity || 0);
  }

  async getStock(productId: number, warehouseId: number) {
    return await this.calculateStock(productId, warehouseId);
  }
}
