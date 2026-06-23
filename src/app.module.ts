import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { EventsModule } from './events/events.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LogsModule } from './logs/logs.module';
@Module({
  imports: [
    AuthModule,
    PrismaModule,
    EventsModule,
    LogsModule,
    MongooseModule.forRoot(
      process.env.MONGODB_URI ||
      'mongodb://localhost:27017/checkin',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}