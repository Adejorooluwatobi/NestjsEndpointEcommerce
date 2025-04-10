export type CreateCustomerParams = {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
};

export type UpdateCustomerParams = {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
};
export type CreateUserParams = {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    isAdmin: boolean;
    password: string;
};

export type UpdateUserParams = {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    isAdmin: boolean;
    password: string;
};

export type CreateUserProfileParams = {
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    dateOfBirth: Date;
    };

    export type CreateUserPostParams = {
        title: string;
        description: string;
        isActive: boolean; 
    };

    // src/utils/types.ts

// Extending existing types
// export type CreateCustomerParams = {
//     firstName: string;
//     lastName: string;
//     phoneNumber: string;
//     email: string;
//     password: string;
//     active: boolean;
//     createdBy: string;
//     updatedBy: string;
// };

// export type UpdateCustomerParams = {
//     firstName?: string;
//     lastName?: string;
//     phoneNumber?: string;
//     email?: string;
//     password?: string;
//     active?: boolean;
//     updatedBy?: string;
// };

// New types for Orders
// export type CreateOrderItemParams = {
//     productId: string;
//     quantity: number;
//     unitPrice: number;
// };

export type CreateOrderParams = {
    customerId: string;
    couponId?: string;
    orderStatusId: number;
    orderDeliveredCarrierDate?: Date;
    orderDeliveredCustomerDate?: Date;
    orderItems?: CreateOrderItemParams[];
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

// src/utils/types.ts
// Adding to our existing types file

// Types for OrderStatus
export type CreateOrderStatusParams = {
    statusName: string;
    color: string;
    privacy: string;
    createdBy: string;
    updatedBy: string;
};

export type UpdateOrderStatusParams = {
    statusName?: string;
    color?: string;
    privacy?: string;
    updatedBy: string;
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
