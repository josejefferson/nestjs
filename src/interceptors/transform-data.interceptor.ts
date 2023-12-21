import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { ClassConstructor, plainToInstance } from 'class-transformer'
import { map } from 'rxjs'

/**
 * Transform response data based on DTO
 */
@Injectable()
export class TransformDataInterceptor implements NestInterceptor {
  constructor(private readonly classToUse: ClassConstructor<unknown>) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        // No response, or null
        if (!data) return data

        // Response with pagination
        if (data.meta) {
          return { ...data, data: plainToInstance(this.classToUse, data.data) }
        }

        // Normal response
        return plainToInstance(this.classToUse, data)
      })
    )
  }
}
