import { BadRequestException, ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Company } from 'src/schemas/company.schema';
import { ComapnyRegisterDTO } from './dto/company.dto';
import Response from 'src/utils/response.builder';
import * as bcrypt from 'bcrypt';
import { REQUEST } from '@nestjs/core';
import { PostJobDTO } from './dto/createPost.dto';
import { CompanyJobPost } from 'src/schemas/company_post.schema';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class CompanyService {
    constructor(
        @InjectModel(Company.name) private companyModel: Model<Company>,
        @InjectModel(CompanyJobPost.name) private JobPostModel: Model<CompanyJobPost>,
        @InjectModel(User.name) private userModel: Model<User>,
        @Inject(REQUEST) private readonly Req: any
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
            throw new ConflictException('Company with same name already exists!');
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

        const updateCompanyDetails = await this.companyModel.updateOne({companyLoginId : new Types.ObjectId(user._id)},{$set : updateObj});

        if (updateCompanyDetails.modifiedCount > 0) {
            updateObj['companyLoginId'] = user._id;
            return Response(updateObj, 200, "Company details updated Successfully");
        }
        throw new HttpException("Company details update failed", HttpStatus.BAD_REQUEST);
    }

    async getCompanyProfile(): Promise<any> {
        const { user }: any = this.Req;
        
        const findCompany:any = await this.companyModel.findOne({ companyLoginId: user._id, isDeleted: false });
        
        if(findCompany){
            findCompany['profile'] = findCompany.profile ? `${process.env.AWS_S3_BUCKET_URL}/${findCompany.profile}` : null;
            findCompany['coverProfile'] = findCompany.coverProfile ? `${process.env.AWS_S3_BUCKET_URL}/${findCompany.coverProfile}` : null;
            return Response(findCompany,200);
        }

        throw new NotFoundException('Company Doesnt Exists');
    }


    async jobPost(body : PostJobDTO): Promise<any> {
        const {jobTitle , jobType, jobCategory, minExperience, maxExperience, degree, minSalary, maxSalary, salaryType, currency, jobDescription, keyResponsibility, professionalSkills, tags , contactNo, addresses, totalPositions, _id, isActive, occupiedPositions } = body;
        const { user } : any = this.Req;

        const company = await this.companyModel.findOne({companyLoginId : user._id,isDeleted : false});
        const companyId = company?._id;

        if(companyId){
                if(_id) {
                    const updateObj = {
                        jobTitle,
                        jobType,
                        jobCategory,
                        minExperience,
                        maxExperience,
                        degree,
                        minSalary,
                        maxSalary,
                        salaryType,
                        currency,
                        jobDescription,
                        keyResponsibility,
                        professionalSkills,
                        tags,
                        contactNo,
                        country: addresses.map((ele) => ele.country),
                        city: addresses.map((ele) => ele.city),
                        companyId,
                        totalPositions,
                        occupiedPositions,
                        isActive,
                        addresses
                    }
        
                    const updateJobDetails = await this.JobPostModel.updateOne({_id : new Types.ObjectId(_id)},{$set : updateObj});
        
                    if(updateJobDetails.modifiedCount > 0){
                        updateObj['_id'] = _id;
                        return Response(updateObj,200,'Post updated successfully');
                    }
        
                    throw new HttpException('Post update failed',500);
                }
        
                const saveJobPost = new this.JobPostModel({
                    jobTitle,
                    jobType,
                    jobCategory,
                    minExperience,
                    maxExperience,
                    degree,
                    minSalary,
                    maxSalary,
                    salaryType,
                    currency,
                    jobDescription,
                    keyResponsibility,
                    professionalSkills,
                    tags,
                    contactNo,
                    country: addresses.map((ele) => ele.country),
                    city: addresses.map((ele) => ele.city),
                    companyId,
                    totalPositions,
                    addresses
                })
        
                const sv = await saveJobPost.save();
        
                if(sv._id){
                    return Response(sv,200,'Post uploaded successfully');
                }
        
                throw new BadRequestException("Post upload failed");
        }

        throw new HttpException('Please create a comapny account',500);
    }

    async getJobByCompany(companyId,page,limit) : Promise<any> {
        const { user } = this.Req;
        let pipeline:any = [];
        let match = {
            isDeleted : false
        };

        const companyDetails:any = await this.companyModel.findOne({ companyLoginId: user._id, isDeleted: false });

        match['companyId'] = new Types.ObjectId(companyId);

        console.log(companyDetails.companyLoginId);
        console.log(user._id);
        
        
        if(companyDetails.companyLoginId !== user._id){
            match['isActive'] = true;
        }

        console.log(match);
        
        pipeline = [
            {
                $match : match
            },
            {
                $sort : {
                    createdAt : -1
                }
            }
        ];

        if(page){
            pipeline.push({
                $skip : (page-1)*limit
            });
        }
        
        if(limit) {
            pipeline.push({
                $limit : limit
            });
        }

        const result = await this.JobPostModel.aggregate(pipeline)
        if(result.length) {
            return Response(result,200,'Success');
        }
        return Response(result,200,'Not Found');
    }


}
