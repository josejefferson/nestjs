import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { ormConfig } from './config/orm'
import { ProductsModule } from './products/products.module'
import { UsersModule } from './users/users.module'
import { CategoriesModule } from './categories/categories.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule
  ]
})
export class AppModule {}
