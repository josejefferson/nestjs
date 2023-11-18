import { NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { swaggerConfig, swaggerOptions } from './config/swagger'
import { validationPipe } from './config/validation'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document, swaggerOptions)
  app.useGlobalPipes(validationPipe)
  await app.listen(3000)
}
bootstrap()
