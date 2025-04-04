import { ConflictException, HttpCode, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import mongoose, { Model, Types } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { LoginDTO, SignUpDTO } from './users.dto';
import Response, { ResponseI } from 'src/utils/response.builder';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) { }

  async register(body: SignUpDTO): Promise<any> {

    const { email, name, password } = body;
    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ email, password: hashedPassword, name });
    const saved = await newUser.save();
    if (saved._id) {
      return Response(saved, HttpStatus.OK, 'User Saved Successfully');
    }

    return Response(null, HttpStatus.BAD_REQUEST, 'Something Went Wrong');

  }

  async login(
    body: LoginDTO
  ): Promise<any> {

    const { email, password } = body;

    // Find user

    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT
    const payload = { email: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload);

    return Response({ accessToken, email: user.email, name: user.name }, 200, 'Login Successfully')
  }

  async getUserProfile(user): Promise<any> {
    const userDetails = await this.userModel.findOne({_id : new Types.ObjectId(user._id)});

    if(userDetails){
      return Response({name : userDetails.name,email : userDetails.email, _id : userDetails._id});
    }

    return Response(null,404,'User Not found');
    
  }
}
