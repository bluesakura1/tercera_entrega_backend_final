import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteUserDto } from './dto/delete-user.dto';
import { User } from './entities/user.entity';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { Message } from 'src/messages/entities/message.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    protected readonly repository: Repository<User>,
    protected jwtService: JwtService
  ) {}

  // Método de prueba
  async helow() {
    return "ok";
  }

  // Registrar un propietario
  async registerowner(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const newUser = this.repository.create({
        password: bcryptjs.hashSync(password, 10),
        ...userData
      });
      newUser.is_owner = true;
      await this.repository.save(newUser);
      const { password: _, ...user } = newUser;
      return user;
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(`${createUserDto.email} already exists!`);
      }
      throw new InternalServerErrorException('Something went wrong, please contact support!');
    }
  }

  // Registrar un comprador
  async registerbuyer(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const newUser = this.repository.create({
        password: bcryptjs.hashSync(password, 10),
        ...userData
      });
      newUser.is_owner = false;
      await this.repository.save(newUser);
      const { password: _, ...user } = newUser;
      return user;
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(`${createUserDto.email} already exists!`);
      }
      throw new InternalServerErrorException('Something went wrong, please contact support!');
    }
  }

  // Login
  async loging(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user = await this.repository.findOneBy({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    if (!bcryptjs.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    const { password: _, ...rest } = user;
    const token = this.getJwtToken({ id: user.user_id, email: user.email });
    return {
      user: rest,
      token: token
    };
  }

    // Login
    async getuser(updateUserDto: UpdateUserDto) {
      const { id } = updateUserDto;
      const user = await this.repository.findOneBy({ user_id:id });
      if (!user) {
        return {message:"fail not found"};
      }else{
        return user
      }

    }

  // Actualizar el perfil
  async updateprofile(updateUserDto: UpdateUserDto) {
    try {
      const { password, id, ...userData } = updateUserDto;
      const newUser = this.repository.create({
        password: bcryptjs.hashSync(password, 10),
        ...userData
      });
      await this.repository.update(id, newUser);
      const { password: _, ...user } = newUser;
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong, please contact support!');
    }
  }

  // Eliminar el perfil
  async deleteprofile(deleteUserDto: DeleteUserDto) {
    const { email, password } = deleteUserDto;
    const user = await this.repository.findOneBy({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    if (!bcryptjs.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    const { password: _, ...rest } = user;
    return this.repository.softDelete(user.user_id);
  }

  // Generar el token JWT
  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
