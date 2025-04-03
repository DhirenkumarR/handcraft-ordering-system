import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../schemas/order.schema';

@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

    async findAll(): Promise<Order[]> {
        return this.orderModel.find().populate('product').exec();
    }

    async create(order: Partial<Order>): Promise<Order> {
        const newOrder = new this.orderModel(order);
        return newOrder.save();
    }
}
