import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
const path = require('path');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity.js'],
      synchronize: process.env.DB_SYNC === 'true' ? true : false,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
