import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../../../.env` });
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

const connectionString =
  process.env.MONGODB_CONN_STRING && process.env.DB_NAME
    ? `${process.env.MONGODB_CONN_STRING}/${process.env.DB_NAME}`
    : `mongodb://localhost:27017/${process.env.DB_NAME || 'EG-Auth'}`;
@Module({
  imports: [MongooseModule.forRoot(connectionString), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
