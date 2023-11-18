import { Type, applyDecorators } from '@nestjs/common'
import { ApiExtraModels, ApiOkResponse, ApiQuery, getSchemaPath } from '@nestjs/swagger'
import { PageDto, PerPageDto } from '../dto/paginated-query.dto'

export const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiQuery({ name: 'page', type: PageDto }),
    ApiQuery({ name: 'perPage', type: PerPageDto }),
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        title: `PaginatedResponseOf${model.name}`,
        allOf: [
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) }
              }
            }
          },
          {
            properties: {
              meta: {
                type: 'object',
                properties: {
                  total: { type: 'number' },
                  lastPage: { type: 'number' },
                  currentPage: { type: 'number' },
                  perPage: { type: 'number' },
                  prev: { type: 'number' },
                  next: { type: 'number' }
                }
              }
            }
          }
        ]
      }
    })
  )
}
