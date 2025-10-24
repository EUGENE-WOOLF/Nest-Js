import { AuthGuard } from '@nestjs/passport';

export class JwtGaurd extends AuthGuard('jwtForSambhavi') {
  constructor() {
    super();
  }
}
