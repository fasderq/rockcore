import { Injectable, Logger } from '@nestjs/common';


@Injectable()
export class StockProviderService {

    protected readonly logger: Logger = new Logger(StockProviderService.name);

    public async start() {
        return { runnning: false }
    }

    public async stop() {
        return { runnning: false }
    }

    public async status() {
        return { runnning: false }
    }
}