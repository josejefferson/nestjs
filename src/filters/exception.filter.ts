import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  InternalServerErrorException
} from '@nestjs/common'
// import { Prisma } from '@prisma/client'
import { Response } from 'express'
import { QueryFailedError } from 'typeorm'

@Catch(QueryFailedError)
export class QueryExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    // exception.
    // if (exception.code === 'P2002') {
    //   const target = exception.meta!.target as string[]
    //   const error = new ConflictException(`Já existe um elemento com este "${target.join(', ')}"`)
    //   response.status(error.getStatus()).json(error.getResponse())
    //   return
    // }

    const error = new InternalServerErrorException()
    response.status(error.getStatus()).json(error.getResponse())
    throw exception
  }
}
