import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { DeleteBookingDto } from './dto/delete-booking.dto';
import { Listings } from 'src/listings/entities/listing.entity';
import { count } from 'console';
import { AuthGuard } from 'src/guards/auth.guard';
@Controller('bookings')
export class BookingsController {
  constructor(
    @InjectRepository(User)
    private readonly userrepository: Repository<User>,
    @InjectRepository(Listings)
    private readonly listingrepository: Repository<Listings>,
    @InjectRepository(Booking)
    private readonly repository: Repository<Booking>,
    private readonly servicebooking:BookingsService
  ) {}
  @UseGuards(AuthGuard)
  @Post('realizar-reserva')  // realiza una reserva
  async createbooking(@Body() createBookingDto: CreateBookingDto) {
    return this.servicebooking.createbooking(createBookingDto)
  }
  @UseGuards(AuthGuard)
  @Post('todas-las-reserva-buyer')  // obtiene todas las reserva de un usuario determinador
  async findallbooking(@Body()  dto: DeleteBookingDto) {
    return this.servicebooking.findallbooking(dto)
  }
  @UseGuards(AuthGuard)
  @Post('estado-reserva-dueno ')  // obtiene info de una reserva en especifico del dueño
  async findallBookingOwner(@Body()  dto: DeleteBookingDto) {
    return this.servicebooking.findallBookingOwner(dto)
  }
  @UseGuards(AuthGuard)
  @Post('todas-las-reserva-owner') // da todas las reservas que tiene un propetario
  async finddAllOwner(@Body() updateListingDto: UpdateBookingDto) {
    return this.servicebooking.finddAllOwner(updateListingDto)
  }
  @UseGuards(AuthGuard)
  @Post('mensaje-estado-reserva-dueno') // da el numero de reservas que el dueño no ha visto (notificacion)
  async finddAllmessagesOwner(@Body() updateListingDto: UpdateBookingDto) {
    return this.servicebooking.finddAllmessagesOwner(updateListingDto)

  }
  @UseGuards(AuthGuard)
  @Post('estado-reserva') // da las reservas de un usuario ha pedido
  async finddAll(@Body() updateListingDto: UpdateBookingDto) {
    return this.servicebooking.finddAll(updateListingDto)
  }
  @UseGuards(AuthGuard)
  @Post('cancelar-reserva')  // cancela reservas
  async removebooking(@Body() deleteBookingDto: DeleteBookingDto) {
    return this.servicebooking.removebooking(deleteBookingDto)
  }
}
