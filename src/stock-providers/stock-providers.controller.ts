import { Controller, Get, Post } from '@nestjs/common';
import { StockProviderService } from './stock-provider.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('stock providers')
@Controller('stock-provider')
export class StockProviderController {

    protected readonly service: StockProviderService;

    constructor(service: StockProviderService) {
        this.service = service
    }

    @Get('status')
    public async status() {
        return this.service.status();
    }

    @Post('start')
    public async start() {
        return this.service.start();
    }

    @Post('stop')
    public async stop() {
        return this.service.stop();
    }
}