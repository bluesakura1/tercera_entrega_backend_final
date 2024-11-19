import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Delete,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(
    protected readonly userservice: UserService,
  ) {}

  // Registro de propietario
  @Post('register-owner')
  async registerowner(@Body() createUserDto: CreateUserDto) {
    return this.userservice.registerowner(createUserDto);
  }

  // Registro de comprador
  @Post('register-buyer')
  async registerbuyer(@Body() createUserDto: CreateUserDto) {
    return this.userservice.registerbuyer(createUserDto);
  }

  // Login
  @Post("login")  // Usar POST para el login
  async login(@Body() createUserDto: CreateUserDto) {
    return this.userservice.loging(createUserDto);
  }

    // Login
  @UseGuards(AuthGuard)
  @Post("getuser")  // Usar POST para el login
    async getuser(@Body() updateUserDto: UpdateUserDto) {
      return this.userservice.getuser(updateUserDto);
    }

  // Actualización del perfil (requiere autenticación)
  @UseGuards(AuthGuard)
  @Patch('update-profile')
  async updateprofile(@Body() updateUserDto: UpdateUserDto) {
    return this.userservice.updateprofile(updateUserDto);
  }

  // Eliminación del perfil (requiere autenticación)
  @UseGuards(AuthGuard)
  @Delete('delete-profile')
  async deleteprofile(@Body() deleteUserDto: DeleteUserDto) {
    return this.userservice.deleteprofile(deleteUserDto);
  }
}
