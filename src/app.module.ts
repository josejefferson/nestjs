import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './config/prisma/prisma.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [UsersModule, AuthModule, PrismaModule]
})
export class AppModule {}
