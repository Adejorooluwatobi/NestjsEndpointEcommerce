export type CreateAdminParams = {
    username: string;
    email: string;
    password: string;
};

export type UpdateAdminParams = {
    username: string;
    email: string;
    password: string;
};
export type CreateUserParams = {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
};

export type UpdateUserParams = {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
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

