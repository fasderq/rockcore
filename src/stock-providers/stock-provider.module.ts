import { Module } from '@nestjs/common';
import { StockProviderService } from './stock-provider.service';
import { StockProviderController } from './stock-providers.controller';


@Module({
    controllers: [StockProviderController],
    providers: [StockProviderService],
})
export class StockProviderModule { }
