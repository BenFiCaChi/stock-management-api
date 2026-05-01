import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { MovementModule } from './modules/movement/movement.module';
import { WarehouseModule } from './modules/warehouse/warehouse.module';

@Module({
  imports: [ProductModule, PrismaModule, MovementModule, WarehouseModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
