import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from '../prisma/prisma.service';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';

describe('ProductService', () => {
  let service: ProductService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PrismaService,
          useValue: {
            product: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              count: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const dto = {
        name: 'Product 1',
      };

      const expectedResult = {
        id: 1,
        name: 'Product 1',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      jest.spyOn(prisma.product, 'create').mockResolvedValue(expectedResult);

      const result = await service.create(dto);

      expect(result).toEqual(expectedResult);

      expect(prisma.product.create).toHaveBeenCalledWith({
        data: dto,
      });
    });
  });

  describe('findAll', () => {
    it('should return paginated products', async () => {
      const pagination = { page: 1, limit: 10 };

      const products = [
        {
          id: 1,
          name: 'Product 1',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];

      jest.spyOn(prisma.product, 'findMany').mockResolvedValue(products);
      jest.spyOn(prisma.product, 'count').mockResolvedValue(1);

      const expectedResult = new PaginatedResponseDto(products, 1, 1, 10);

      const result = await service.findAll(pagination);

      expect(result).toEqual(expectedResult);

      expect(prisma.product.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
      });

      expect(prisma.product.count).toHaveBeenCalledWith({
        where: { deletedAt: null },
      });
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      const expectedResult = {
        id: 1,
        name: 'Product 1',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      jest
        .spyOn(prisma.product, 'findUnique')
        .mockResolvedValue(expectedResult);

      const result = await service.findOne(1);

      expect(result).toEqual(expectedResult);

      expect(prisma.product.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if product not found', async () => {
      jest.spyOn(prisma.product, 'findUnique').mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(
        'Product with id 999 not found',
      );

      expect(prisma.product.findUnique).toHaveBeenCalledWith({
        where: { id: 999 },
      });
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const dto = {};

      const expectedResult = {
        id: 1,
        name: 'Updated Product',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);
      jest.spyOn(prisma.product, 'update').mockResolvedValue(expectedResult);

      const result = await service.update(1, dto);

      expect(result).toEqual(expectedResult);

      expect(service.findOne).toHaveBeenCalledWith(1);

      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: dto,
      });
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      const expectedResult = {
        id: 1,
        name: 'Product 1',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);
      jest.spyOn(prisma.product, 'update').mockResolvedValue(expectedResult);

      const result = await service.remove(1);

      expect(result).toEqual(expectedResult);

      expect(service.findOne).toHaveBeenCalledWith(1);

      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { deletedAt: expect.any(Date) },
      });
    });
  });
});
