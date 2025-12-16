
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { DefaultResponseDto } from '../dto/default-response.dto';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, DefaultResponseDto<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<DefaultResponseDto<T>> {
    return next.handle().pipe(
      map(data => {
        return new DefaultResponseDto(context.switchToHttp().getResponse().statusCode, true, data, null)
      })
    );
  }
}
