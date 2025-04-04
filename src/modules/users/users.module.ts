import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Company, CompanySchema } from 'src/schemas/company.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{ name: Company.name, schema: CompanySchema }]),
    ],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}
