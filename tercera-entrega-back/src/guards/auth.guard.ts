import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../user/interfaces/jwt-payload';
import { UserService } from '../user/user.service';
import { consumers } from 'stream';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService,
    private UserService:UserService,
    @InjectRepository(User)
    private readonly userrepository: Repository<User>,
  ){

  }
  
  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    
    if(!token){
      throw new UnauthorizedException('Token is required');
    }
    let payload:JwtPayload;
    try{
        payload = await this.jwtService.verifyAsync<JwtPayload>(
          token, {secret: `${process.env.JWT_SECRET_KEY}`,
        }
        );
    }catch(error){
      throw new UnauthorizedException('Invalid token');
    }    
    const user = await this.userrepository.findOneBy({user_id:payload.id});    
    if(user==null || user.deleted_at!=null){
      throw new UnauthorizedException('User not exists');
    }        
    request.body['email'] = user.email;
    return Promise.resolve(true);
  }
  extractToken(request: Request):string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ')??[];
    return type==='Bearer' ? token : undefined;
  }
}
