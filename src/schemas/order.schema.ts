import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from './product.schema';

@Schema()
export class Order extends Document {
  @Prop({ required: true })
  customerName: string;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Product;

  @Prop({ required: true })
  quantity: number;

  @Prop({ default: 'pending' })
  status: string; // e.g., 'pending', 'shipped'
}

export const OrderSchema = SchemaFactory.createForClass(Order);