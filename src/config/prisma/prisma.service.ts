import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    this.includeHashPasswordMiddleware()
    await this.$connect()
  }

  includeHashPasswordMiddleware() {
    const models = ['User']
    const methods = ['create', 'createMany', 'update', 'updateMany']
    const rounds = 12

    this.$use(async (params, next) => {
      if (!models.includes(params.model)) return next(params)
      if (!methods.includes(params.action)) return next(params)
      if (!params.args.data.password) return next(params)
      const hashedPassword = await bcrypt.hash(params.args.data.password, rounds)
      params.args.data.password = hashedPassword
      return next(params)
    })
  }
}
