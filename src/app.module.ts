import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { DataSourceOptions } from 'typeorm'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'

export const ormConfig: DataSourceOptions = {
  type: 'sqlite',
  database: '.db/sql',
  synchronize: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}']
}

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(ormConfig), AuthModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
