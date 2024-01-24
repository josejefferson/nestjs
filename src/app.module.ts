import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { ormConfig } from './config/orm'
import { UsersModule } from './users/users.module'

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), UsersModule, AuthModule]
})
export class AppModule {}
