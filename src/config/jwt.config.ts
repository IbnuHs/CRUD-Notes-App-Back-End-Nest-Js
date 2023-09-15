import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  secret: 'dsfses',
  signOptions: { expiresIn: '60s' },
};
