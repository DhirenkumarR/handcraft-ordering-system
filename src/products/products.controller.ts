import { Body, Controller, Get, Post } from '@nestjs/common';
import { Product } from '../schemas/product.schema';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async findAll(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    @Post()
    async create(@Body() product: Partial<Product>): Promise<Product> {
        return this.productsService.create(product);
    }
}
