import { NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { swaggerConfig, swaggerOptions } from './config/swagger'
import { validationPipe } from './config/validation'
import { PrismaExceptionFilter } from './filters/prisma-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new PrismaExceptionFilter())
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document, swaggerOptions)
  app.useGlobalPipes(validationPipe)
  await app.listen(3000)
}
bootstrap()
