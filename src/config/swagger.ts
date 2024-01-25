import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger'

export const swaggerConfig = new DocumentBuilder()
  .setTitle('API')
  .setDescription('API description')
  .addBearerAuth()
  .setVersion('1.0')
  .addTag('authentication', 'Autenticação')
  .addTag('users', 'Usuários')
  .addTag('products', 'Produtos')
  .addTag('categories', 'Categorias')
  .build()

export const swaggerOptions: SwaggerCustomOptions = {
  swaggerOptions: {}
}
