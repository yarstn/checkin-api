import {
    BadRequestException,
    Injectable,
  } from '@nestjs/common';
  import * as bcrypt from 'bcrypt';
   import { PrismaService } from '../prisma/prisma.service';
  import { JwtService } from '@nestjs/jwt';
import { LogsService } from 'src/logs/logs.service';
  @Injectable()
  export class AuthService {
    constructor(
      private prisma: PrismaService,
      private jwtService: JwtService,
      private logsService: LogsService,


    ) {}
  
    async register(
      name: string,
      email: string,
      password: string,
    ) {
      const existingUser =
        await this.prisma.user.findUnique({
          where: {
            email,
          },
        });
  
      if (existingUser) {
        throw new BadRequestException(
          'Email already exists',
        );
      }
  
      const hashedPassword =
        await bcrypt.hash(password, 10);
  
      const user =
        await this.prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        });
  
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
          }

    async login(
      email: string,
      password: string,
    ) {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
    
      if (!user) {
        throw new BadRequestException('Invalid credentials');
      }
    
      const isMatch = await bcrypt.compare(
        password,
        user.password,
      );
    
      if (!isMatch) {
        throw new BadRequestException('Invalid credentials');
      }
    
      const token = this.jwtService.sign({
        sub: user.id,
        email: user.email,
        role: user.role,
      });
      await this.logsService.createLog(
        user.id,
        'LOGIN',
        {},
      );
      await this.logsService.createLog(
        user.id,
        'LOGIN',
        {},
      );
      return {
        accessToken: token,
      };
    }
    async getQrCode(userId: string) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
    
      const registration =
        await this.prisma.eventRegistration.findFirst({
          where: {
            userId,
            event: {
              isGated: true,
              startsAt: {
                lte: new Date(),
              },
              endsAt: {
                gte: new Date(),
              },
            },
          },
          include: {
            event: true,
          },
        });
    
      if (registration) {
        await this.logsService.createLog(
          userId,
          'QR_CODE_VIEWED',
          {
            type: 'event_gate_qr',
            eventId: registration.event.id,
          },
        );
        await this.logsService.createLog(
          userId,
          'QR_CODE_VIEWED',
          {
            type: 'event_gate_qr',
            eventId: registration.event.id,
          },
        );
        return {
          type: 'event_gate_qr',
          qrCode: registration.event.gateQrCode,
          eventId: registration.event.id,
          validUntil: registration.event.endsAt,
        };
      }
      await this.logsService.createLog(
        userId,
        'QR_CODE_VIEWED',
        {
          type: 'membership_qr',
        },
      );
      return {
        type: 'membership_qr',
        qrCode: user?.membershipQrCode,
      };
    }
    
  }
  