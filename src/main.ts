import * as dotenv from 'dotenv'
dotenv.config()

import { NestFactory, Reflector } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { swaggerConfig, swaggerOptions } from './config/swagger'
import { validationPipe } from './config/validation'
import { ClassSerializerInterceptor } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document, swaggerOptions)
  app.useGlobalPipes(validationPipe)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  await app.listen(3000)
}
bootstrap()

process.on('uncaughtException', console.error)
