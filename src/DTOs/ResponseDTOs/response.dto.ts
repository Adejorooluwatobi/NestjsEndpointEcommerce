import { ApiProperty } from '@nestjs/swagger';

// Base response wrapper
export class ApiResponseDto<T> {
  @ApiProperty({ example: true })
  succeeded: boolean;

  @ApiProperty({ example: 'Operation completed successfully' })
  message: string;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty()
  resultData: T;
}


// Analytics response DTO
export class AnalyticsResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() metric: string;
  @ApiProperty() value: number;
  @ApiProperty() metadata: any;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

// Attribute response DTO
export class AttributeResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() attributeName: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

// AttributeValue response DTO
export class AttributeValueResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() attributeId: string;
  @ApiProperty() attributeValue: string;
  @ApiProperty() color: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

// AuditLog response DTO
export class AuditLogResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() userId: string;
  @ApiProperty() staffId: string;
  @ApiProperty() action: string;
  @ApiProperty() details: string;
  @ApiProperty() createdAt: Date;
}

// CardItems response DTO
export class CardItemsResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() productId: string;
  @ApiProperty() cardId: string;
  @ApiProperty() itemDetails: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

// Cards response DTO
export class CardsResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() customerId: string;
  @ApiProperty() cardName: string;
  @ApiProperty() cardNumber: string;
  @ApiProperty() cardType: string;
  @ApiProperty() isActive: boolean;
  @ApiProperty({ type: [CardItemsResponseDto] }) cardItems: CardItemsResponseDto[];
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

// Category response DTO
export class CategoryResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() categoryName: string;
  @ApiProperty() categoryDescription: string;
  @ApiProperty() icon: string;
  @ApiProperty() imagePath: string;
  @ApiProperty() isActive: boolean;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

// Coupon response DTO
export class CouponResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() code: string;
  @ApiProperty() couponDescription: string;
  @ApiProperty() discountValue: number;
  @ApiProperty() discountType: string;
  @ApiProperty() timesUsed: number;
  @ApiProperty() maxUsage: number;
  @ApiProperty() couponStartDate: Date;
  @ApiProperty() couponEndDate: Date;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

// CustomerAddress response DTO
export class CustomerAddressResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() address_line1: string;
  @ApiProperty() address_line2: string;
  @ApiProperty() city: string;
  @ApiProperty() state: string;
  @ApiProperty() country: string;
  @ApiProperty() postalCode: string;
  @ApiProperty() phoneNumber: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

// CustomerEngagement response DTO
export class CustomerEngagementResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() customerId: string;
  @ApiProperty() productId: string;
  @ApiProperty() type: string;
  @ApiProperty() createdAt: Date;
}

// Customers response DTO
export class CustomersResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() firstName: string;
  @ApiProperty() lastName: string;
  @ApiProperty() userName: string;
  @ApiProperty() phoneNumber: string;
  @ApiProperty() email: string;
  @ApiProperty() isActive: boolean;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

// Gallery response DTO
export class GalleryResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() productId: string;
  @ApiProperty() imagePath: string;
  @ApiProperty() thumbnail: string;
  @ApiProperty() displayOrder: boolean;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

// Inventory response DTO
export class InventoryResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() productId: string;
  @ApiProperty() stockLevel: number;
  @ApiProperty() stock: number;
  @ApiProperty() reservedStock: number;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

// Notification response DTO
export class NotificationResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() accountId: string;
  @ApiProperty() title: string;
  @ApiProperty() content: string;
  @ApiProperty() read: boolean;
  @ApiProperty() notification_expiryDate: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

// OrderItems response DTO
export class OrderItemsResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() orderId: string;
  @ApiProperty() productId: string;
  @ApiProperty() price: number;
  @ApiProperty() quantity: number;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

// OrderStatus response DTO
export class OrderStatusResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() statusName: string;
  @ApiProperty() statusCode: string;
  @ApiProperty() color: string;
  @ApiProperty() privacy: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

// Orders response DTO
export class OrdersResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() customerId: string;
  @ApiProperty() orderStatusId: number;
  @ApiProperty() orderDeliveredCarrierDate: Date;
  @ApiProperty() orderDeliveredCustomerDate: Date;
  @ApiProperty({ type: [OrderItemsResponseDto] }) orderItems: OrderItemsResponseDto[];
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

// Payment response DTO
export class PaymentResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() orderId: string;
  @ApiProperty() customerId: string;
  @ApiProperty() paymentMethod: string;
  @ApiProperty() transactionId: string;
  @ApiProperty() amount: number;
  @ApiProperty() status: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() refundedAt: Date;
}

// PostMode response DTO
export class PostModeResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() title: string;
  @ApiProperty() description: string;
  @ApiProperty() isActive: boolean;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

// ProductAttribute response DTO
export class ProductAttributeResponseDto {
    @ApiProperty() id: string;
    @ApiProperty() productId: string;
    @ApiProperty() attributeId: string;
    @ApiProperty() attributeValueId: string;
    @ApiProperty() createdAt: Date;
    @ApiProperty() updatedAt: Date;
    }

// ProductCategory response DTO
export class ProductCategoryResponseDto {
    @ApiProperty() id: string;
    @ApiProperty() productId: string;
    @ApiProperty() categoryId: string;
    @ApiProperty() createdAt: Date;
    @ApiProperty() updatedAt: Date;
    }

// ProductCoupon response DTO
export class ProductCouponResponseDto {
    @ApiProperty() id: string;
    @ApiProperty() productId: string;
    @ApiProperty() couponId: string;
    @ApiProperty() createdAt: Date;
    @ApiProperty() updatedAt: Date;
    }

// Product response DTO
export class ProductResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty() description: string;
  @ApiProperty() price: number;
  @ApiProperty() sku: string;
  @ApiProperty() isActive: boolean;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
  @ApiProperty({ type: [ProductAttributeResponseDto] }) attributes: ProductAttributeResponseDto[];
  @ApiProperty({ type: [ProductCategoryResponseDto] }) categories: ProductCategoryResponseDto[];
  @ApiProperty({ type: [ProductCouponResponseDto] }) coupons: ProductCouponResponseDto[];
}

// ProductShipping response DTO
export class ProductShippingResponseDto {
    @ApiProperty() id: string;
    @ApiProperty() productId: string;
    @ApiProperty() shippingMethod: string;
    @ApiProperty() shippingCost: number;
    @ApiProperty() estimatedDeliveryTime: string;
    @ApiProperty() createdAt: Date;
    @ApiProperty() updatedAt: Date;
    }

// ProductTag response DTO
export class ProductTagResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() productId: string;
  @ApiProperty() tagId: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

// Profile response DTO
export class ProfileResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() userId: string;
  @ApiProperty() bio: string;
  @ApiProperty() profilePicture: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

// Roles response DTO
export class RolesResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() roleName: string;
  @ApiProperty() permissions: string[];
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

// Sell response DTO
export class SellResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() productId: string;
  @ApiProperty() price: number;
  @ApiProperty() quantity: number;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

// Shipping response DTO
export class ShippingResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() orderId: string;
  @ApiProperty() shippingMethod: string;
  @ApiProperty() trackingNumber: string;
  @ApiProperty() status: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

// SlideBanner response DTO
export class SlideBannerResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() title: string;
  @ApiProperty() description: string;
  @ApiProperty() imagePath: string;
  @ApiProperty() isActive: boolean;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

// StaffAccounts response DTO
export class StaffAccountsResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() firstName: string;
  @ApiProperty() lastName: string;
  @ApiProperty() email: string;
  @ApiProperty() isActive: boolean;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

// StaffRoles response DTO
export class StaffRolesResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() staffId: string;
  @ApiProperty() roleId: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

// Tag response DTO
export class TagResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() tagName: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

// VariantAttributeValue response DTO
export class VariantAttributeValueResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() variantId: string;
  @ApiProperty() attributeValueId: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

// Variant response DTO
export class VariantResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() productId: string;
  @ApiProperty() variantName: string;
  @ApiProperty() price: number;
  @ApiProperty() sku: string;
  @ApiProperty() isActive: boolean;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
  @ApiProperty({ type: [VariantAttributeValueResponseDto] }) attributeValues: VariantAttributeValueResponseDto[];
}

// User response DTO
export class UserResponseDto {
  @ApiProperty({ example: 'uuid-string' })
  id: string;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({ example: 'johndoe123' })
  userName: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: false })
  isAdmin: boolean;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false })
  profile?: any;

  @ApiProperty({ required: false, type: [Object] })
  posts?: any[];
}



// Error response DTO
export class ErrorResponseDto {
  @ApiProperty({ example: 'ValidationError' })
  type: string;

  @ApiProperty({ example: 'Bad Request' })
  title: string;

  @ApiProperty({ example: 400 })
  status: number;

  @ApiProperty({ example: 'Validation failed' })
  detail: string;

  @ApiProperty({ example: '/api/users' })
  instance: string;
}