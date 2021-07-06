import { Module, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core/constants';
import { JwtAuthGuard } from 'guards/jwtAuth.guard';
import { RolesGuard } from 'guards/roles.guard';
import { HttpExceptionFilter } from 'filters/httpException.filter';
import { UsersModule } from 'modules/users/users.module';
import { AppController } from 'app.controller';
import { AuthModule } from 'modules/auth/auth.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { CaslModule } from './modules/casl/casl.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    UsersModule,
    AuthModule,
    ArticlesModule,
    CaslModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
