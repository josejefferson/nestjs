import * as dotenv from 'dotenv'
dotenv.config()

import { NestFactory, Reflector } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { swaggerConfig, swaggerOptions } from './config/swagger'
import { validationPipe } from './config/validation'
import { ClassSerializerInterceptor } from '@nestjs/common'
import { apiReference } from '@scalar/nestjs-api-reference'
// import { QueryExceptionFilter } from './filters/exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // app.useGlobalFilters(new QueryExceptionFilter())
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document, swaggerOptions)

  app.use('/reference', apiReference({ spec: { content: document } }))

  app.useGlobalPipes(validationPipe)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  await app.listen(3000)
}
bootstrap()

process.on('uncaughtException', console.error)
