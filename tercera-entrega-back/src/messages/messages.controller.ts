import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listings } from 'src/listings/entities/listing.entity';
import { User } from 'src/user/entities/user.entity';
import { getConnection, Repository } from 'typeorm';
import { ResiveMessageDto } from './dto/resive-message.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('messages')
export class MessagesController {
  constructor(
    @InjectRepository(User)
    private readonly userrepository: Repository<User>,
    @InjectRepository(Listings)
    private readonly listingrepository: Repository<Listings>,
    @InjectRepository(Message)
    private readonly repository: Repository<Message>,
    private readonly messagesService: MessagesService

  ) {}
  @UseGuards(AuthGuard)
  @Post("enviar-mensajes")
  async send(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.send(createMessageDto);
  }
  @UseGuards(AuthGuard)
  @Post("historial-de-mensajes")
  async recive(@Body() resiveMessageDto: ResiveMessageDto) {
    return this.messagesService.recive(resiveMessageDto);
  }
  @UseGuards(AuthGuard)
  @Post("recibir-mensajes")
  async findAll(@Body() resiveMessageDto: ResiveMessageDto) {
    return this.messagesService.findAll(resiveMessageDto);
  }
  @UseGuards(AuthGuard)
  @Post("notificaciones-mensajes-recibidos")
  async findUnread(@Body() resiveMessageDto: ResiveMessageDto) {
    return this.messagesService.findUnread(resiveMessageDto);
  }
}
