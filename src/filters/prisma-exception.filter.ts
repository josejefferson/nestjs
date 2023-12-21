import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  InternalServerErrorException
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { Response } from 'express'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    if (exception.code === 'P2002') {
      const target = exception.meta!.target as string[]
      const error = new ConflictException(`Já existe um elemento com este "${target.join(', ')}"`)
      response.status(error.getStatus()).json(error.getResponse())
      return
    }

    const error = new InternalServerErrorException()
    response.status(error.getStatus()).json(error.getResponse())
    throw exception
  }
}
