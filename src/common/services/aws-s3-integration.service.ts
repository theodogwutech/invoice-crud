import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { AppConfig } from 'src/config/app.config';

export interface AwsUploadResponse {
  Etag?: string;
  Location?: string;
  Key?: string;
  Bucket?: string;
}

@Injectable()
export class AwsS3IntegrationService {
  private readonly s3: AWS.S3;

  constructor(private readonly appConfig: AppConfig) {
    this.s3 = new AWS.S3({
      accessKeyId: this.appConfig.aws_id,
      secretAccessKey: this.appConfig.aws_secret,
    });
  }

  // Upload to Bucket
  async uploadToBucket(parameters: {
    Bucket: string;
    Body: any;
    Key: string;
    ACL?: string;
    ContentType?: string;
  }): Promise<AWS.S3.ManagedUpload.SendData> {
    return new Promise((resolve, reject) => {
      this.s3.upload(parameters, (error, data) => {
        if (error) {
          return reject(error);
        }
        resolve(data);
      });
    });
  }

  // Delete from Bucket
  async deleteFromBucket(parameters: {
    Bucket: string;
    Key: string;
  }): Promise<string> {
    return new Promise((resolve, reject) => {
      this.s3.deleteObject(parameters, (error) => {
        if (error) {
          return reject(error);
        }
        resolve('File deleted');
      });
    });
  }
}
