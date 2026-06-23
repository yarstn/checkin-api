import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LogsService } from 'src/logs/logs.service';
@Injectable()
export class EventsService {
  constructor(
    private prisma: PrismaService,
    private logsService: LogsService,
  ) {}

  async create(data: any) {
    const event = await this.prisma.event.create({
      data,
    });

    await this.logsService.createLog(
      'admin',
      'EVENT_CREATED',
      {
        eventId: event.id,
      },
    );

    return event;
  }

  findAll() {
    return this.prisma.event.findMany();
  }

  findOne(id: string) {
    return this.prisma.event.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    data: any,
  ) {
    const event =
      await this.prisma.event.update({
        where: { id },
        data,
      });

    await this.logsService.createLog(
      'admin',
      'EVENT_UPDATED',
      {
        eventId: event.id,
      },
    );

    return event;
  }

  async register(
    eventId: string,
    userId: string,
  ) {
    const event =
      await this.prisma.event.findUnique({
        where: { id: eventId },
      });

    if (!event) {
      throw new Error(
        'Event not found',
      );
    }

    if (event.endsAt < new Date()) {
      throw new Error(
        'Event already ended',
      );
    }

    const existingRegistration =
      await this.prisma.eventRegistration.findUnique(
        {
          where: {
            userId_eventId: {
              userId,
              eventId,
            },
          },
        },
      );

    if (existingRegistration) {
      throw new Error(
        'Already registered',
      );
    }

    const registration =
      await this.prisma.eventRegistration.create(
        {
          data: {
            userId,
            eventId,
          },
        },
      );

    await this.logsService.createLog(
      userId,
      'EVENT_REGISTERED',
      {
        eventId,
      },
    );

    return registration;
  }

  async attendees(
    eventId: string,
  ) {
    return this.prisma.eventRegistration.findMany(
      {
        where: {
          eventId,
        },
        include: {
          user: true,
        },
      },
    );
  }
}