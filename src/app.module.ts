import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { Config } from './config';
import { AppService } from '@app/app.service';


@Module({
  imports: [
    LoggerModule.forRootAsync({
      useFactory: () => Config.pino,
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
