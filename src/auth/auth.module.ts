import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { Patient } from 'src/patient/entities/patient.entity';
@Module({
  imports:[
    TypeOrmModule.forFeature([
      Account,
     Patient,
     
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: process.env.JWT_EXPIRE,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports: [
    AuthService,
    JwtStrategy,
    PassportModule,
    JwtModule,
  
  ],
})
export class AuthModule {}
