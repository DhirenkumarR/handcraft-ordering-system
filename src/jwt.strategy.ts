import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model, Types } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@InjectModel(User.name) private userModel: Model<User>,) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    console.log('payload');

    const user = await this.userModel.findById(payload.sub).exec();
    console.log(user);

    if (!user) {
      throw new UnauthorizedException("You are not Authorized");
    }
    return { email: payload.email, _id: new Types.ObjectId(payload.sub), roles: user.roles, login_type: user.login_type };
  }
}
