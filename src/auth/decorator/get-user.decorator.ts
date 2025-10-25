import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!data) {
      return request.user; // this comes from your JwtGuard
    }
    return request.user[data]; // this comes from your JwtGuard
  },
);
