import { ConfigService } from '@nestjs/config';

export const jwtFactory = {
    useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: {
            expiresIn: configService.get('JWT_EXP_H'),
        },
    }),
    inject: [ConfigService],
};