import { DeliveryStatus, OrderType } from '../types/express';

export enum WALLET_STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum ICurrency {
  NGN = 'NGN',
  USD = 'USD',
  GBP = 'GBP',
  EUR = 'EUR',
  CAD = 'CAD',
}

export enum ITransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit',
  WITHDRAWAL = 'withdrawal',
}

export enum ITransactionTypeCategory {
  FUND = 'fund',
  TRANSFER = 'transfer',
}

export enum ITransactionTo {
  WALLET = 'wallet',
  NGN_WALLET = 'ngn-wallet',
  REFERRAL_WALLET = 'referral-wallet',
  BANK = 'bank',
  ADD_CARD = 'add-card',
  ORDER = 'order',
  ORDER_GAS = 'order-gas',
  COURIER_ORDER = 'courier-order',
}

export enum ITransactionStatus {
  SUCCESSFUL = 'successful',
  FAILED = 'failed',
  PENDING = 'pending',
}

export enum IKalendaTransactionType {
  INTER_TRANSFER = 'inter-transfer',
  BANK_TRANSFER = 'bank-transfer',
  WALLET_DEBIT = 'wallet-debit',
  WALLET_FUNDING = 'wallet-funding',
  REFERRAL = 'referral',
  ORDER_PAYMENT = 'order-payment',
}

export enum ITransactionMedium {
  KALENDA = 'kalenda',
  WALLET = 'wallet',
  CARD = 'card',
  BANK = 'bank',
  DIRECT_DEBIT = 'direct-debit',
}

export enum IPaymentGateway {
  PAYSTACK = 'paystack',
  PAYSTACK_TRANSFER = 'paystack-transfer',
  FLUTTERWAVE = 'flutterwave',
  FLUTTERWAVE_APPLEPAY = 'flutterwave-applepay',
  MONO = 'mono',
  APPLE_PAY = 'apple-pay',
  WALLET = 'wallet',
  REFERRAL_WALLET = 'referral-wallet',
  KALENDA = 'kalenda',
  DIASPORA_TRANSFER = 'diaspora-transfer',
  REINVEST = 'reinvest',
  FINCRA = 'fincra',
}

export enum IChargeType {
  RECURRING = 'recurring',
  ONE_TIME_PAYMENT = 'one-time-payment',
}

export enum IEntityReference {
  PLANS = 'plans',
  SAVINGS = 'savings',
  SAVINGS_CHALLENGE = 'savings-challenge',
  INVESTMENTS = 'investments',
}

export enum ICardStatus {
  EXPIRED = 'expired',
  ACTIVE = 'active',
}

export enum IWalletTransactionType {
  FUND_WALLET = 'fund-wallet',
  DEBIT_WALLET = 'debit-wallet',
  WITHDRAWAL = 'withdrawal',
  SEND_TO_FRIEND = 'send-to-friend',
}

export enum IAction {
  WEBHOOK_SAVED = 'webhook_saved',
}

export enum IDirectInvestmentType {
  KALENDA_DIRECT_DOLLAR = 'kalenda-direct-dollar',
  KALENDA_DIRECT_NAIRA = 'kalenda-direct-naira',
  KALENDA_DIRECT_POUND = 'kalenda-direct-pounds',
}

export enum IOrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  RETURNED = 'returned',
}

export enum ICourierOrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  IN_TRANSIT = 'in_transit',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  RETURNED = 'returned',
}

export enum IInvestmentForm {
  RE_INVESTMENT = 're-investment',
  NEW_INVESTMENT = 'new-investment',
  INVESTMENT_TOPUP = 'investment-topup',
  RECURRING_INVESTMENT = 'recurring-investment',
}

export enum IAddressType {
  HOUSE = 'house',
  APARTMENT = 'apartment',
  OFFICE = 'office',
  OTHERS = 'others',
}

export enum IAppDomains {
  KALENDA_FOOD = 'kalenda-food',
  KALENDA_GROCERIES = 'kalenda-groceries',
  KALENDA_PHARMACY = 'kalenda-pharmacy',
  KALENDA_LAUNDRY = 'kalenda-laundry',
  KALENDA_GAS = 'kalenda-gas',
  KALENDA_COURIER = 'kalenda_courier',
  KALENDA_HOSPITALITY = 'kalenda-hospitality',
  KALENDA_PROFESSIONALS = 'kalenda-professionals',
  KALENDA_ESCROW_MARKETPLACE = 'kalenda-escrow-marketplace',
  KALENDA_EVENTS = 'kalenda-events',
}

export enum IFuelType {
  COOKING_GAS = 'cooking_gas',
  DIESEL = 'diesel',
  PETROL = 'petrol',
  KEROSENE = 'kerosene',
}

export enum IProductStatus {
  OUT_OF_STOCK = 'out_of_stock',
  AVAILABLE = 'available',
  COMING_SOON = 'coming_soon',
  PRE_ORDER = 'pre_order',
}

export enum IOrderDeliveryState {
  PENDING = 'pending',
  SHIPPED = 'shipped',
}

export enum IPaymentMethod {
  PAYSTACK = 'paystack',
  CASH = 'cash',
  WALLET = 'wallet',
}

export const DELIVERY_TIMELINES: Record<OrderType, DeliveryStatus[]> = {
  kalenda_food: [
    'accepted',
    'preparing',
    'rider_en_route_pickup',
    'rider_picked',
    'rider_en_route_delivery',
    'delivered',
  ],
  kalenda_groceries: [
    'accepted',
    'compiling',
    'rider_en_route_pickup',
    'rider_picked',
    'rider_en_route_delivery',
    'delivered',
  ],
  kalenda_courier: [
    'accepted',
    'rider_en_route_pickup',
    'rider_picked',
    'rider_en_route_delivery',
    'delivered',
  ],
  kalenda_pharmacy: [
    'accepted',
    'compiling',
    'rider_en_route_pickup',
    'rider_picked',
    'rider_en_route_delivery',
    'delivered',
  ],
  kalenda_gas: [
    'accepted',
    'preparing',
    'rider_en_route_delivery',
    'delivered',
  ],
  kalenda_laundry: [
    'accepted',
    'pickup_scheduled',
    'rider_picked',
    'laundry_in_progress',
    'ready_for_delivery',
    'rider_en_route_delivery',
    'delivered',
  ],
};

export const OrderTimelineStatus = {
  VENDOR_ACCEPTED: 'VENDOR_ACCEPTED',
  COMPILING_ORDER: 'COMPILING_ORDER',
  PREPARING_ORDER: 'PREPARING_ORDER',
  RIDER_EN_ROUTE_PICKUP: 'RIDER_EN_ROUTE_PICKUP',
  RIDER_PICKED_UP: 'RIDER_PICKED_UP',
  RIDER_EN_ROUTE_DELIVERY: 'RIDER_EN_ROUTE_DELIVERY',
  DELIVERED: 'DELIVERED',
  RETURNED: 'RETURNED',
  CANCELLED: 'CANCELLED',
  ORDER_PLACED: 'ORDER_PLACED',
  RIDER_ASSIGNED: 'RIDER_ASSIGNED',
  PICKUP_SCHEDULED: 'PICKUP_SCHEDULED',
};

export const DELIVERY_MESSAGES: Record<
  OrderType,
  Partial<Record<DeliveryStatus, string>>
> = {
  kalenda_food: {
    accepted: 'Vendor has accepted your order',
    preparing: 'Food preparation in progress',
    rider_en_route_pickup: 'Rider is on his way to pick up your food',
    rider_picked: 'Rider has picked your food',
    rider_en_route_delivery: 'Rider is on his way to deliver your food',
    delivered: 'Rider has delivered your food',
  },
  kalenda_groceries: {
    accepted: 'Vendor has accepted your order',
    compiling: 'Vendor is compiling your order',
    rider_en_route_pickup: 'Rider is on his way to pick up your groceries',
    rider_picked: 'Rider has picked your groceries',
    rider_en_route_delivery: 'Rider is on his way to deliver your groceries',
    delivered: 'Rider has delivered your groceries',
  },
  kalenda_courier: {
    accepted: 'Rider has accepted your item',
    rider_en_route_pickup: 'Rider is on his way to pick up your item',
    rider_picked: 'Rider has picked up your item',
    rider_en_route_delivery: 'Rider is on his way to deliver your item',
    delivered: 'Rider has delivered your item',
  },
  kalenda_pharmacy: {
    accepted: 'Pharmacy has accepted your order',
    compiling: 'Pharmacy is compiling your medications',
    rider_en_route_pickup: 'Rider is on his way to pick up your medications',
    rider_picked: 'Rider has picked up your medications',
    rider_en_route_delivery: 'Rider is on his way to deliver your medications',
    delivered: 'Rider has delivered your medications',
  },
  kalenda_gas: {
    accepted: 'Gas order has been accepted',
    preparing: 'Vendor is preparing your gas delivery',
    rider_en_route_delivery: 'Rider is on his way to deliver your gas',
    delivered: 'Rider has delivered your gas',
  },
  kalenda_laundry: {
    accepted: 'Laundry request accepted',
    pickup_scheduled: 'Pickup has been scheduled',
    rider_picked: 'Rider has picked up your laundry',
    laundry_in_progress: 'Laundry is in progress',
    ready_for_delivery: 'Your laundry is ready for delivery',
    rider_en_route_delivery: 'Rider is on his way to deliver your laundry',
    delivered: 'Rider has delivered your laundry',
  },
};
