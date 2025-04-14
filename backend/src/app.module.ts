import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './car/car.module';
import { ClientModule } from './client/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { DamageModule } from './damage/damage.module';
import { TypeOrmConfig } from './config/typeorm';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { DataInterceptor } from './interceptor/data.interceptor';
import { HttpExceptionFilter } from './exception/http-exception.exception';

@Module({
  imports: [
    AuthModule,
    CarModule,
    ClientModule,
    DamageModule ,
    ConfigModule.forRoot({isGlobal: true, load: [config]}),
    TypeOrmModule.forRoot(TypeOrmConfig()), 
    
  ],
  controllers: [AppController],
  providers: [AppService, JwtService,
    {provide: APP_PIPE, useClass: ValidationPipe},
    {provide: APP_GUARD, useClass: JwtAuthGuard},
    {provide: APP_INTERCEPTOR, useClass: DataInterceptor},
    {provide: APP_FILTER, useClass: HttpExceptionFilter}
  ],
})
export class AppModule {}
