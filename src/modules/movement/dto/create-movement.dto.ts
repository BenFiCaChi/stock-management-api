import { IsInt, IsEnum, IsOptional } from 'class-validator';

export class CreateMovementDto {
  @IsInt()
  productId: number;

  @IsInt()
  quantity: number;

  @IsInt()
  warehouseId: number;

  @IsEnum(['ENTRY', 'EXIT', 'TRANSFER'])
  type: 'ENTRY' | 'EXIT' | 'TRANSFER';

  @IsOptional()
  @IsInt()
  toWarehouseId: number; // para transferências
}
