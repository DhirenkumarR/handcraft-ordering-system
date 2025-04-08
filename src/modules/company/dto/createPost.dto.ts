import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, Matches, IsArray, ValidateNested, IsNumber } from "class-validator";
import { Message } from "src/utils/message.utils";

export class Address {
    @ApiProperty({ example: 'Sunflower Building' })
    street: string;

    @ApiProperty({ example: 'New York' })
    city: string;

    @ApiProperty({ example: '354770' })
    pincode: string;

    @ApiProperty({ example: 'USA' })
    country: string;

}

export class PostJobDTO {

    @ApiProperty({ example: '67f36d5d69fa5c476afae463' })
    @IsString()
    @IsNotEmpty()
    _id : string;

    @ApiProperty({ example: 'Senior Node Js Developer' })
    @IsString()
    @IsNotEmpty()
    jobTitle: string;

    @ApiProperty({ example: 'fullTime' })
    @IsString()
    @IsNotEmpty()
    jobType: string;

    @ApiProperty({ example: ['IT'] })
    jobCategory: string[];

    @ApiProperty({ example: 2 })
    minExperience: number;

    @ApiProperty({ example: 3 })
    maxExperience: number;

    @ApiProperty({ example: ['BE'] })
    degree: string[];

    @ApiProperty({ example: 20000 })
    minSalary: number;

    @ApiProperty({ example: 30000 })
    maxSalary: number;

    @ApiProperty({ example: 'monthly / yearly' })
    salaryType: string;

    @ApiProperty({ example: 'dollar / rupee' })
    currency: string;

    @ApiProperty({ example: 'Hello this is a job description' })
    jobDescription: string;

    @ApiProperty({ example: ['Hello this is a job responsibility', 'this is second job responsibility', 'this is a third responsibility'] })
    keyResponsibility: string[];

    @ApiProperty({ example: ['Hello this is a job skill', 'this is second job skill ', 'this is a third skill'] })
    professionalSkills: string[];

    @ApiProperty({ example: ['Software Engineer', 'experineced'] })
    tags: string[];

    @ApiProperty({ example: ['+91 456782357'] })
    contactNo: string[];

    @ApiProperty({ example: 4 })
    totalPositions: number;

    @ApiProperty({ example: 4 })
    occupiedPositions: number;

    @ApiProperty({ example: true })
    isActive: boolean;

    // @ApiProperty({ example: [] }) 
    // @IsArray()
    // @ValidateNested({ each: true })
    // @Type(() => Headquaters)   
    // headquater : Headquaters[];

    @ApiProperty({
        type: [Address],
        example: [
            {
                street: '123 Main St',
                city: 'New York',
                pincode: '456789',
                country: 'USA',
            },
            {
                street: '456 High St',
                city: 'London',
                pincode: '456789',
                country: 'UK',
            },
        ],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Address)
    addresses: Address[];

    // @ApiProperty({example : 'chatgpt@gmail.com'})
    // @IsString({ message: 'Email must be a string.' })
    // @IsNotEmpty({ message: 'Email is required.' })
    // @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
    //   message: Message.EMAIL_VALID
    // })
    // email: string;

    // @ApiProperty({example : 'Test@123'})
    // @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
    //   message:Message.PASSWORD_MUST_BE_VALIDE,
    // })
    // password: string;
}
