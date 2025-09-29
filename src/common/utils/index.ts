import * as Joi from 'joi';

import { AppConfig } from 'src/config/app.config';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { ApiResponseType } from '../interfaces';
import { IAppDomains } from '../enums';

@Injectable()
export class Utils {
  constructor(private readonly appConfig: AppConfig) {}

  apiResponse({ res, success, code, message, data = null }: ApiResponseType) {
    return res.status(code).json({
      success,
      code,
      message,
      data,
    });
  }

  generateRef({ length }: { length: number }) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      result += characters[Math.floor(Math.random() * characters.length)];
    }
    return result;
  }

  generateReferralCode() {
    return this.generateRef({ length: 6 });
  }

  // async generateWalletAccountNumber(currency?: string): Promise<string> {
  //   const prefixMap: Record<string, string> = {
  //     [ICurrency.GBP]: '123',
  //     [ICurrency.EUR]: '456',
  //     [ICurrency.CAD]: '789',
  //   };

  //   const prefix = currency ? prefixMap[currency] || '321' : '321';

  //   const result = `${prefix}${Math.floor(Math.random() * 9000000) + 1000000}`;

  //   const query = currency
  //     ? { wallet_account_number: result, currency }
  //     : { wallet_account_number: result };

  //   const checkWallets = await this.walletRepository.getOne(query);

  //   return checkWallets
  //     ? await this.generateWalletAccountNumber(currency)
  //     : result;
  // }

  formatPhoneNumber(phoneNumber: string) {
    const phone = phoneNumber.replace(/\D/g, '');
    if (phone.startsWith('234')) {
      return phone;
    }
    if (phone.startsWith('0')) {
      return `234${phone.slice(1)}`;
    }
    return `234${phone}`;
  }

  generateTXRef() {
    const key = `KALENDA_TX_REF${this.generateRef({
      length: 12,
    })}`.toUpperCase();
    return key;
  }

  generateTXHash() {
    return `KALENDA_TX_HASH_REF${this.generateRef({
      length: 12,
    })}`.toUpperCase();
  }

  check_card_expiry(exp_month: any, exp_year: any) {
    const today = new Date();

    const expiry = new Date(exp_year, exp_month);
    if (expiry < today) {
      return false;
    }
    return true;
  }

  paystack_charge = (amount: number): number => {
    const percentage = 2;
    const flat = 80;
    const total = (amount * percentage) / 100 + flat;
    if (total > 2000) return 2000;
    return total;
  };

  waitForMongooseConnection(mongoose): Promise<void> {
    return new Promise<void>((resolve) => {
      const connection = mongoose.connection;
      if (connection.readyState === 1) {
        resolve();
        return;
      }
      console.log(
        'Mongoose connection is not ready. Waiting for open or reconnect event.',
      );
      let resolved = false;
      const setResolved = () => {
        console.log(
          'Mongoose connection became ready. promise already resolved: ' +
            resolved,
        );
        if (!resolved) {
          console.log('Resolving waitForMongooseConnection');
          resolved = true;
          resolve();
        }
      };
      connection.once('open', setResolved);
      connection.once('reconnect', setResolved);
    });
  }

  repoPagination({
    page,
    perPage,
    total,
  }: {
    page: number;
    perPage: number;
    total: number;
  }) {
    return {
      hasPrevious: page > 1,
      prevPage: page - 1,
      hasNext: page < Math.ceil(total / perPage),
      next: page + 1,
      currentPage: Number(page),
      total: total,
      pageSize: perPage,
      lastPage: Math.ceil(total / perPage),
    };
  }

  async generateOrderOtp() {
    return this.appConfig.env === 'development'
      ? 1234
      : Math.floor(Math.random() * 8999 + 1000);
  }

  generateOrderTimeline({
    order_id,
    order_type,
  }: {
    order_id: Types.ObjectId;
    order_type: IAppDomains;
  }) {
    if (order_type === IAppDomains.KALENDA_FOOD) {
      return {
        order_id: order_id,
        events: [
          {
            status: 'VENDOR_ACCEPTED',
            message: 'Vendor has accepted your order',
            timestamp: new Date(),
            completed: true,
          },
          {
            status: 'PREPARING_ORDER',
            message: 'Vendor is preparing your order',
            timestamp: null,
            completed: false,
          },
          {
            status: 'RIDER_EN_ROUTE_PICKUP',
            message: 'Rider is on his way to pickup your food',
            timestamp: null,
            completed: false,
          },
          {
            status: 'RIDER_PICKED_UP',
            message: 'Rider has picked your food',
            timestamp: null,
            completed: false,
          },
          {
            status: 'RIDER_EN_ROUTE_DELIVERY',
            message: 'Rider is on his way to deliver your food',
            timestamp: null,
            completed: false,
          },
          {
            status: 'DELIVERED',
            message: 'Rider has delivered your food',
            timestamp: null,
            completed: false,
          },
        ],
      };
    } else if (order_type === IAppDomains.KALENDA_LAUNDRY) {
      return {
        order_id: order_id,
        events: [
          {
            status: 'VENDOR_ACCEPTED',
            message: 'Vendor has accepted your order',
            timestamp: new Date(),
            completed: true,
          },
          {
            status: 'PICKUP_SCHEDULED',
            message: 'Pickup has been scheduled for your laundry',
            timestamp: null,
            completed: false,
          },
          {
            status: 'RIDER_PICKED_UP',
            message: 'Rider has picked up your laundry',
            timestamp: null,
            completed: false,
          },
          {
            status: 'LAUNDRY_IN_PROGRESS',
            message: 'Your laundry is in progress',
            timestamp: null,
            completed: false,
          },
          {
            status: 'READY_FOR_DELIVERY',
            message: 'Your laundry is ready for delivery',
            timestamp: null,
            completed: false,
          },
          {
            status: 'RIDER_EN_ROUTE_DELIVERY',
            message: 'Rider is on his way to deliver your laundry',
            timestamp: null,
            completed: false,
          },
          {
            status: 'DELIVERED',
            message: 'Rider has delivered your laundry',
            timestamp: null,
            completed: false,
          },
        ],
      };
    } else if (order_type === IAppDomains.KALENDA_GAS) {
      return {
        order_id: order_id,
        events: [
          {
            status: 'VENDOR_ACCEPTED',
            message: 'Vendor has accepted your order',
            timestamp: new Date(),
            completed: true,
          },
          {
            status: 'PREPARING_ORDER',
            message: 'Vendor is preparing your gas order',
            timestamp: null,
            completed: false,
          },
          {
            status: 'RIDER_EN_ROUTE_DELIVERY',
            message: 'Rider is on his way to deliver your gas',
            timestamp: null,
            completed: false,
          },
          {
            status: 'DELIVERED',
            message: 'Rider has delivered your gas',
            timestamp: null,
            completed: false,
          },
        ],
      };
    } else if (order_type === IAppDomains.KALENDA_COURIER) {
      return {
        order_id: order_id,
        events: [
          {
            status: 'ORDER_PLACED',
            message: 'Your courier order has been placed',
            timestamp: new Date(),
            completed: true,
          },
          {
            status: 'RIDER_ASSIGNED',
            message: 'A rider has been assigned to your order',
            timestamp: null,
            completed: false,
          },
          {
            status: 'PICKUP_SCHEDULED',
            message: 'Pickup has been scheduled for your courier order',
            timestamp: null,
            completed: false,
          },
          {
            status: 'RIDER_PICKED_UP',
            message: 'Rider has picked up your package',
            timestamp: null,
            completed: false,
          },
          {
            status: 'RIDER_EN_ROUTE_DELIVERY',
            message: 'Rider is on his way to deliver your package',
            timestamp: null,
            completed: false,
          },
          {
            status: 'DELIVERED',
            message: 'Rider has delivered your package',
            timestamp: null,
            completed: false,
          },
        ],
      };
    }
  }

  /******
   *
   *
   *
   * Validate Image Upload
   */

  async validateUploadedFile({
    file: theFile,
    maxSize = 2000000, // 2 Mega bytes
    allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/avif',
      'image/webp',
      'image/gif',
      'application/pdf',
    ],
  }: {
    file?: Express.Multer.File | Express.Multer.File[];
    maxSize?: number;
    allowedMimeTypes?: string[];
  }): Promise<{
    success: boolean;
    error?: string;
    data?: Express.Multer.File[];
  }> {
    const files = Array.isArray(theFile) ? theFile : [theFile]; // Ensure it's always an array

    for (const file of files) {
      // Validate file size
      if (file.size > maxSize) {
        return {
          error: `File "${file.originalname}" exceeds the maximum size of ${maxSize / 1000000}MB.`,
          success: false,
        };
      }

      // Validate file type
      const fileType = file.mimetype;
      if (!allowedMimeTypes.includes(fileType)) {
        return {
          error: `Invalid file type for "${file.originalname}". Allowed types are: ${allowedMimeTypes.join(', ')}.`,
          success: false,
        };
      }
    }

    return {
      data: files,
      success: true,
    };
  }
}

export const JoiObjectId = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .message('Must be a valid MongoDB ObjectId');

export const getPagination = ({
  total,
  page = 1,
  perPage = 10,
}: {
  total: number;
  page: number;
  perPage: number;
}) => {
  console.log(
    `Pagination - Total: ${total}, Page: ${page}, PerPage: ${perPage}`,
  );
  const totalPages = Math.ceil(total / perPage);
  const skip = (page - 1) * perPage;

  return {
    total,
    page,
    perPage,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
    nextPage: page < totalPages ? page + 1 : null,
    previousPage: page > 1 ? page - 1 : null,
    lastPage: totalPages,
    skip,
  };
};
