import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
  } from '@nestjs/common';
  
  import { EventsService } from './events.service';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { RolesGuard } from '../auth/roles.guard';
  
  @Controller('events')
  export class EventsController {
    constructor(
      private eventService: EventsService,
    ) {}
  
    @UseGuards(
      JwtAuthGuard,
      RolesGuard,
    )
    @Post()
    create(
      @Body() body: {
        title: string;
        location: string;
        startsAt: Date;
        endsAt: Date;
        isGated: boolean;
        gateQrCode?: string;
      },
    ) {
      return this.eventService.create(body);
    }
  
    @Get()
    findAll() {
      return this.eventService.findAll();
    }
  
    @Get(':id')
    findOne(
      @Param('id') id: string,
    ) {
      return this.eventService.findOne(id);
    }
  
    @UseGuards(
      JwtAuthGuard,
      RolesGuard,
    )
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() body: {
        title?: string;
        location?: string;
        startsAt?: Date;
        endsAt?: Date;
        isGated?: boolean;
        gateQrCode?: string;
      },
    ) {
      return this.eventService.update(
        id,
        body,
      );
    }
  
    @UseGuards(JwtAuthGuard)
    @Post(':id/register')
    register(
      @Param('id') id: string,
      @Req() req: any,
    ) {
      return this.eventService.register(
        id,
        req.user.userId,
      );
    }
  
    @UseGuards(
      JwtAuthGuard,
      RolesGuard,
    )
    @Get(':id/attendees')
    attendees(
      @Param('id') id: string,
    ) {
      return this.eventService.attendees(id);
    }
  }