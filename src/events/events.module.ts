import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { PrismaModule } from '../prisma/prisma.module';
import { LogsModule } from '../logs/logs.module';
@Module({
  imports: [
    PrismaModule,
    LogsModule,
  ],  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}