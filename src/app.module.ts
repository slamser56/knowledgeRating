import { Module, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { APP_PIPE } from '@nestjs/core/constants';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGO_DB_URI), UsersModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
