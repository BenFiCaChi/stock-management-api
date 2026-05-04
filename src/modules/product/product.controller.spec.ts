import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  const mockProductService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      mockProductService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(dto);

      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return paginated products', async () => {
      const query = { page: 1, limit: 10 };
      const expectedResult = {
        data: [
          {
            id: 1,
            name: 'Product 1',
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
          },
        ],
        total: 1,
        page: 1,
        limit: 10,
      };

      mockProductService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll(query);

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalledWith(query);
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      const id = 1;
      const expectedResult = {
        id: 1,
        name: 'Product 1',
        createdAt: new Date(),
        updateAt: new Date(),
        deletedAt: null,
      };

      mockProductService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne(id);

      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const id = 1;
      const dto = { name: 'Updated Product' };
      const expectedResult = {
        id: 1,
        name: 'Updated Product',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      mockProductService.update.mockResolvedValue(expectedResult);

      const result = await controller.update(id, dto);

      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      const id = 1;
      const expectedResult = {
        id: 1,
        name: 'Product 1',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      };

      mockProductService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove(id);

      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
