import { ConfigService } from '@nestjs/config';

export const mongooseFactory = {
    useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URL'),
        dbName: configService.get('DBNAME'),
    }),
    inject: [ConfigService],
}