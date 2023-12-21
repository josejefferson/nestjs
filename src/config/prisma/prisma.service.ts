import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // this.$use(this.excludeFieldsMiddleware())
    Object.assign(this, this.withHashPassword())
    await this.$connect()
  }

  private withHashPassword() {
    const hashPasswordMiddleware = async ({ args, query }: any) => {
      const rounds = 12
      if (!args.data.password) return query(args)
      const hashedPassword = await bcrypt.hash(args.data.password, rounds)
      args.data.password = hashedPassword
      return query(args)
    }

    return this.$extends({
      query: {
        user: {
          create: hashPasswordMiddleware,
          update: hashPasswordMiddleware,
          updateMany: hashPasswordMiddleware
        }
      }
    })
  }

  // private withExcludeFields() {
  //   // const hashPasswordMiddleware = async ({ args, query }: any) => {
  //   //   const rounds = 12
  //   //   if (!args.data.password) return query(args)
  //   //   const hashedPassword = await bcrypt.hash(args.data.password, rounds)
  //   //   args.data.password = hashedPassword
  //   //   return query(args)
  //   // }

  //   return this.$extends({
  //     query: {
  //       $allModels: {
  //         findMany: ({ model, operation, args, query }) => {
            
  //           return query(args)
  //         }
  //       }
  //     }
  //   })
  // }

  // private excludeFieldsMiddleware(): Prisma.Middleware {
  //   return async (params, next) => {
  //     const result = await next(params)
  //     // if (params.args?.select?.password)
  //     // if (params.model === 'User') delete result.password
  //     return result
  //   }
  // }
}
