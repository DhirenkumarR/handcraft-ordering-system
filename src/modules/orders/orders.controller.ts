import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from '../../schemas/order.schema';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    async findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
    }

    @Post()
    async create(@Body() order: Partial<Order>): Promise<Order> {
    return this.ordersService.create(order);
    }
}
