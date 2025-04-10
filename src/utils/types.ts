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
//     first_name: string;
//     last_name: string;
//     phone_number: string;
//     email: string;
//     password: string;
//     active: boolean;
//     created_by: string;
//     updated_by: string;
// };

// export type UpdateCustomerParams = {
//     first_name?: string;
//     last_name?: string;
//     phone_number?: string;
//     email?: string;
//     password?: string;
//     active?: boolean;
//     updated_by?: string;
// };

// New types for Orders
// export type CreateOrderItemParams = {
//     product_id: string;
//     quantity: number;
//     unit_price: number;
// };

export type CreateOrderParams = {
    customer_id: string;
    coupon_id?: string;
    order_status_id: number;
    order_delivered_carrier_date?: Date;
    order_delivered_customer_date?: Date;
    orderItems?: CreateOrderItemParams[];
};

export type UpdateOrderParams = {
    coupon_id?: string;
    order_status_id?: number;
    order_delivered_carrier_date?: Date;
    order_delivered_customer_date?: Date;
    updated_by?: string;
};

// New types for Cards
export type CreateCardItemParams = {
    product_id: string;
    item_details: string;
    card_id: string;
};

export type UpdateCardItemParams = {
    product_id: string;
    item_details: string;
    card_id: string;
};

export type CreateCardParams = {
    customer_id: string;
    cardItems?: CreateCardItemParams[];
};

export type UpdateCardParams = {
    customer_id?: string;
};

// src/utils/types.ts
// Adding to our existing types file

// Types for OrderStatus
export type CreateOrderStatusParams = {
    status_name: string;
    color: string;
    privacy: string;
    created_by: string;
    updated_by: string;
};

export type UpdateOrderStatusParams = {
    status_name?: string;
    color?: string;
    privacy?: string;
    updated_by: string;
};

// Types for OrderItem
export type CreateOrderItemParams = {
    order_id: string;
    product_id: string;
    price: number;
    quantity: number;
};

export type UpdateOrderItemParams = {
    price?: number;
    quantity?: number;
};
