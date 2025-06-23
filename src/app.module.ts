import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { Config } from './config';
import { AppService } from '@app/app.service';
import { StockProviderModule } from './stock-providers';


@Module({
  imports: [
    LoggerModule.forRootAsync({
      useFactory: () => Config.pino,
    }),
    StockProviderModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
