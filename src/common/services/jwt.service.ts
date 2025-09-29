import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { stringify } from 'querystring';
import { AppConfig } from 'src/config/app.config';

@Injectable()
export class InvoiceJwtService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly appConfig: AppConfig,
  ) {}

  generateToken(payload: any): string {
    try {
      return this.jwtService.sign(payload, {
        secret: this.appConfig.server_token_Secret,
        expiresIn: this.appConfig.token_expire_time,
      });
    } catch (e) {
      return stringify(e);
    }
  }

  verifyToken(token: string) {
    try {
      const verifyToken = this.jwtService.verify(token, {
        secret: this.appConfig.server_token_Secret,
      });

      return {
        success: true,
        data: verifyToken,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Invalid or expired token',
        data: error,
      };
    }
  }
}
