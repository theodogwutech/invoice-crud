import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfig {
  constructor(private readonly configService: ConfigService) {}

  server_token_Secret = this.configService.get<string>('SERVER_TOKEN_SECRET');
  google_secret_key = this.configService.get<string>('GOOGLE_SECRET_KEY');
  mongo_uri = this.configService.get<string>('MONGO_URI');
  port = this.configService.get<number>('SERVER_PORT');
  env = this.configService.get<string>('NODE_ENV');
  token_expire_time = this.configService.get<string>('TOKEN_EXPIRE_TIME');
  server_token_issuer = this.configService.get<string>('SERVER_TOKEN_ISSUER');
  server_token_secret = this.configService.get<string>('SERVER_TOKEN_SECRET');
  mailgun_api_key = this.configService.get<string>('MAILGUN_API_KEY');
  mailgun_domain = this.configService.get<string>('MAILGUN_DOMAIN');
  mailgun_from = this.configService.get<string>('MAILGUN_FROM');
  paystack_secret_key = this.configService.get<string>('PAYSTACK_SECRET_KEY');
  paystack_base_api_url = this.configService.get<string>(
    'PAYSTACK_BASE_API_URL',
  );
  aws_id = this.configService.get<string>('AWS_ID');
  aws_secret = this.configService.get<string>('AWS_SECRET');
  s3_bucket_name = this.configService.get<string>('S3_BUCKET_NAME');
  google_maps_base_api_url = this.configService.get<string>(
    'GOOGLE_MAPS_BASE_API_URL',
  );
  google_maps_api_key = this.configService.get<string>('GOOGLE_MAPS_API_KEY');
  server_refresh_token_Secret = this.configService.get<string>(
    'SERVER_REFRESH_TOKEN_SECRET',
  );
  refresh_token_expire_time = this.configService.get<string>(
    'REFRESH_TOKEN_EXPIRE_TIME',
  );
}
