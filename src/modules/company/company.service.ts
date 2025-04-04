import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from 'src/schemas/company.schema';
import { ComapnyRegisterDTO } from './company.dto';
import Response from 'src/utils/response.builder';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CompanyService {
    constructor(
        @InjectModel(Company.name) private companyModel: Model<Company>
    ) { }

    async companyRegister(body: ComapnyRegisterDTO): Promise<any> {

        const { name, overview, websiteUrl, industry, addresses, founded, staffSize } = body;

        // const isCompanyRegister = await this.companyModel.findOne({
        //     email: email
        // });

        // if (isCompanyRegister) {
        //     throw new ConflictException('Company with email already exists!');
        // }

        // const isCompanyNameExists = await this.companyModel.findOne({
        //     companyName: name
        // });

        // if (isCompanyNameExists) {
        //     throw new ConflictException('Company with name already exists!');
        // }

        // const hashedPassword = await bcrypt.hash(password, Number(process.env.PASSWORD_HASH));

        const companyObject = new this.companyModel({
            companyName: name,
            overview,
            websiteUrl,
            industryType: industry,
            founded,
            addresses,
            headquarters: addresses.filter((ele) => ele.isHeadquater).map((ele) => {
                return {
                    city: ele.city,
                    country: ele.country
                }
            }),
            country: addresses.map((ele) => ele.country),
            city: addresses.map((ele) => ele.city),
            staffSize,
            // email,
            // password: hashedPassword
        });

        const save = await companyObject.save();

        if (save) {
            return Response(save, 200, "Company Registration Successfully");
        }

        throw new HttpException("Company Registration failed", HttpStatus.BAD_REQUEST);

    }

}
