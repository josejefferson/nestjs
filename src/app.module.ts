import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { ormConfig } from './config/orm'
import { ProductsModule } from './products/products.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), UsersModule, AuthModule, ProductsModule]
})
export class AppModule {}
