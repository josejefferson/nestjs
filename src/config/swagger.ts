import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger'

export const swaggerConfig = new DocumentBuilder()
  .setTitle('API')
  .setDescription('API description')
  .addBearerAuth()
  .setVersion('1.0')
  .addTag('users', 'Usuários')
  .addTag('authentication', 'Autenticação')
  .build()

export const swaggerOptions: SwaggerCustomOptions = {
  swaggerOptions: {}
}
