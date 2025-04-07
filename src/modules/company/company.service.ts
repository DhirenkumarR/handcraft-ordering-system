import { ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Company } from 'src/schemas/company.schema';
import { ComapnyRegisterDTO } from './company.dto';
import Response from 'src/utils/response.builder';
import * as bcrypt from 'bcrypt';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class CompanyService {
    constructor(
        @InjectModel(Company.name) private companyModel: Model<Company>,
        @Inject(REQUEST) private readonly Req: Request
    ) { }

    async companyRegister(body: ComapnyRegisterDTO): Promise<any> {

        const { companyName, overview, websiteUrl, industry, addresses, founded, staffSize, profile, coverProfile } = body;
        const {user} : any = this.Req;

        // const isCompanyRegister = await this.companyModel.findOne({
        //     email: email
        // });

        // if (isCompanyRegister) {
        //     throw new ConflictException('Company with email already exists!');
        // }

        const isCompanyNameExists = await this.companyModel.findOne({
            companyName: companyName
        });

        if (isCompanyNameExists) {
            throw new ConflictException('Company with name already exists!');
        }

        // const hashedPassword = await bcrypt.hash(password, Number(process.env.PASSWORD_HASH));

        const updateObj = {
            companyName,
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
        }

        if(profile){
            updateObj['profile'] = profile;
        }

        if(coverProfile){
            updateObj['coverProfile'] = coverProfile;
        }

        const updateCompanyDetails = await this.companyModel.updateOne({companyId : new Types.ObjectId(user._id)},{$set : updateObj});

        if (updateCompanyDetails.modifiedCount > 0) {
            updateObj['companyId'] = user._id;
            return Response(updateObj, 200, "Company details updated Successfully");
        }
        throw new HttpException("Company details update failed", HttpStatus.BAD_REQUEST);
    }

    async getCompanyProfile(): Promise<any> {
        const { user }: any = this.Req;
        const findCompany:any = await this.companyModel.findOne({ companyId: user._id, isDeleted: false });
        if(findCompany){
            findCompany['profile'] = findCompany.profile ? `${process.env.AWS_S3_BUCKET_URL}/${findCompany.profile}` : null;
            findCompany['coverProfile'] = findCompany.coverProfile ? `${process.env.AWS_S3_BUCKET_URL}/${findCompany.coverProfile}` : null;
            return Response(findCompany,200);
        }

        throw new NotFoundException('Company Doesnt Exists');
    }


    

}
