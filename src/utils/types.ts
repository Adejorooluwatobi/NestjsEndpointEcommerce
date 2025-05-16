export type CreateCustomerParams = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    userName: string;
    email: string;
    password: string;
    isActive: boolean;
};

export type UpdateCustomerParams = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    isActive: boolean;
};

export type CreateStaffParams = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    isActive: boolean;
    profileImg: string;
};

export type UpdateStaffParams = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    isActive: boolean;
    profileImg: string;
};
export type CreateUserParams = {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    isAdmin: boolean;
    isActive: boolean;
    password: string;
};

export type UpdateUserParams = {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    isAdmin: boolean;
    isActive: boolean;
    password: string;
};

export type CreateProfileParams = {
    altPhoneNumber: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    dateOfBirth: Date;
};

export type CreatePostParams = {
    title: string;
    description: string;
    isActive: boolean;
};

export type CreateProductParams = {
    productName: string;
    sku: string;
    regularPrice: number;
    discountPrice: number;
    quantity: number;
    shortDescription: string;
    productDescription: string;
    productWeight: number;
    productCode: string;
    published: boolean;
};

export type UpdateProductParams = {
    productName: string;
    sku: string;
    regularPrice: number;
    discountPrice: number;
    quantity: number;
    shortDescription: string;
    productDescription: string;
    productWeight: number;
    productCode: string;
    published: boolean;
};

export type CreateOrderParams = {
    customerId: string;
    couponId?: string;
    orderStatusId: number;
    orderDeliveredCarrierDate?: Date;
    orderDeliveredCustomerDate?: Date;
    // orderItems?: CreateOrderItemParams[];
};

export type UpdateOrderParams = {
    couponId?: string;
    orderStatusId?: number;
    orderDeliveredCarrierDate?: Date;
    orderDeliveredCustomerDate?: Date;
    updatedBy?: string;
};

// New types for Cards
export type CreateCardItemParams = {
    productId: string;
    itemDetails: string;
    cardId: string;
};

export type UpdateCardItemParams = {
    productId: string;
    itemDetails: string;
    cardId: string;
};

export type CreateCardParams = {
    customerId: string;
    cardItems?: CreateCardItemParams[];
};

export type UpdateCardParams = {
    customerId?: string;
};

// Types for OrderStatus
export type CreateOrderStatusParams = {
    statusName: string;
    color: string;
    privacy: string;
    // createdBy: string;
    // updatedBy: string;
};

export type UpdateOrderStatusParams = {
    statusName?: string;
    color?: string;
    privacy?: string;
    // updatedBy: string;
};

// Types for OrderItem
export type CreateOrderItemParams = {
    orderId: string;
    productId: string;
    price: number;
    quantity: number;
};

export type UpdateOrderItemParams = {
    price?: number;
    quantity?: number;
};

export type CreateRoleParams = {
    roleName: string;
    privileges: string;
};

export type UpdateRoleParams = {
    roleName: string;
    privileges: string;
};

export type CreateStaffRoleParams = {
    staffId: string;
    roleId: string;
};

export type UpdateStaffRoleParams = {
    staffId: string;
    roleId: string;
};

export type CreateCouponParams = {
    code: string;
    couponDescription: string;
    discountValue: number;
    discountType: string;
    timesUsed: number;
    maxUsage: number;
    couponStartDate: Date;
    couponEndDate: Date;
};

export type UpdateCouponParams = {
    code: string;
    couponDescription: string;
    discountValue: number;
    discountType: string;
    timesUsed: number;
    maxUsage: number;
    couponStartDate: Date;
    couponEndDate: Date;
};

export type CreateProductAttributeParams = {
    productId: string;
    attributeId: string;
};

export type UpdateProductAttributeParams = {
    productId: string;
    attributeId: string;
};

export type CreateProductCategoryParams = {
    productId: string;
    attributeId: string;
};

export type UpdateProductCategoryParams = {
    productId: string;
    attributeId: string;
};

export type CreateProductCouponParams = {
    productId: string;
    attributeId: string;
};

export type UpdateProductCouponParams = {
    productId: string;
    attributeId: string;
};

export type CreateProductTagParams = {
    productId: string;
};

export type UpdateProductTagParams = {
    productId: string;
};

export type CreateProductShippingParams = {
    productId: string;
    shippingId: string;
    shipCharge: number;
    free: boolean;
    estimatedDays: number;
};

export type UpdateProductShippingParams = {
    productId: string;
    shippingId: string;
    shipCharge: number;
    free: boolean;
    estimatedDays: number;
};

export type CreateCategoryParams = {
    //parentId: string;
    categoryName: string;
    categoryDescription: string;
    icon: string;
    imagePath: string;
    isActive: boolean;
};

export type UpdateCategoryParams = {
    //parentId: string;
    categoryName: string;
    categoryDescription: string;
    icon: string;
    imagePath: string;
    isActive: boolean;
};

export type CreateAttributeParams = {
    attributeName: string;
};

export type UpdateAttributeParams = {
    attributeName: string;
};

export type CreateAttributeValueParams = {
    attributeId: string;
    attributeValue: string;
    color: string;
};

export type UpdateAttributeValueParams = {
    attributeId: string;
    attributeValue: string;
    color: string;
};

export type CreateCustomerAddressParams = {
    // customerId: string;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    phoneNumber: string;
};

export type UpdateCustomerAddressParams = {
    // customerId: string;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    phoneNumber: string;
};

export type CreateGalleryParams = {
    productId: string;
    imagePath: string;
    thumbnail: string;
    displayOrder: boolean;
};

export type UpdateGalleryParams = {
    productId: string;
    imagePath: string;
    thumbnail: string;
    displayOrder: boolean;
};

export type CreateShippingParams = {
    name: string;
    isActive: boolean;
    iconPath: string;
};

export type UpdateShippingParams = {
    name: string;
    isActive: boolean;
    iconPath: string;
};

export type CreateTagParams = {
    tagName: string;
    icon: string;
};

export type UpdateTagParams = {
    tagName: string;
    icon: string;
};

export type CreateVariantParams = {
    price: number;
    quantity: number;
    productId: string;
};
export type UpdateVariantParams = {
    price: number;
    quantity: number;
    productId: string;
};

export type CreateVariantAttributeValueParams = {
    variantId: string;
    attributeValueId: string;
};

export type UpdateVariantAttributeValueParams = {
    variantId: string;
    attributeValueId: string;
};

export type CreateSellParams = {
    productId: string;
    price: number;
    quantity: number;
};

export type UpdateSellParams = {
    productId: string;
    price: number;
    quantity: number;
};

export type CreateNotificationParams = {
    accountId: string;
    title: string;
    content: string;
    read: boolean;
    notification_expiryDate: string;
};

export type UpdateNotificationParams = {
    accountId: string;
    title: string;
    content: string;
    read: boolean;
    notification_expiryDate: string;
};

export type CreatePaymentParam = {
    orderId: string;
    customerId: string;
    paymentMethod: string;
    transactionId: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    createdAt: Date;
    refundedAt: Date;
};

export type UpdatePaymentParam = {
    orderId: string;
    customerId: string;
    paymentMethod: string;
    transactionId: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    createdAt: Date;
    refundedAt: Date;
};

export type CreateCustomerEngagementReviewParams = {
    productId: string;
    customerId: string;
    rating: number;
    comment: string;
};
export type UpdateCustomerEngagementReviewParams = {
    productId: string;
    customerId: string;
    rating: number;
    comment: string;
};

export type CreateCustomerEngagementWishlistParams = {
    customerId: string;
    productId: string;
};

export type UpdateCustomerEngagementWishlistParams = {
    customerId: string;
    productId: string;
};

export type CreateInventoryParams = {
    productId: string;
    stockLevel: number;
    stock: number;
    reservedStock: number;
};

export type UpdateInventoryParams = {
    productId: string;
    stockLevel: number;
    stock: number;
    reservedStock: number;
};

export type UpdateAnalyticParams = {
    metric: string;
    value: number;
    metadata: Record<string, any>;
};

export type CreateAuditLogParams = {
    action: string;
    userId: string;
    staffId: Date;
    details: string;
};
