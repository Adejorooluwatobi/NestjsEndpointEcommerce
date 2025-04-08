import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/entities/User.entity';
import { Profile } from './database/entities/Profile.entity';
import { UsersModule } from './users/users.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { UserPostModule } from './user-post/user-post.module';
import { Post } from './database/entities/Post.entity';
//import { UserProfileService } from './user-profile/services/user-profile/user-profile.service';
//import { UserProfileController } from './user-profile/controllers/user-profile/user-profile.controller';
//import { UserPostController } from './user-post/controllers/user-post/user-post.controller';
//import { UserPostService } from './user-post/services/user-post/user-post.service';
import { AppGateway } from './websockets/app.gateway';
import { AuthService } from './security/auth/auth.service';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './security/auth/auth.module';
//import { CustomersController } from './customers/controllers/customers/customers.controller';
//import { CustomersService } from './customers/services/customers/customers.service';
import { CustomersModule } from './customers/customers.module';
import { Customer } from './database/entities/customers.entity';
import { Order } from './database/entities/orders.entity';
import { Coupon } from './database/entities/coupons.entity';
import { ProductCoupon } from './database/entities/productCoupons.entity';
import { Product } from './database/entities/products.entity';
import { ProductCategory } from './database/entities/productCategories.entity';
import { Category } from './database/entities/categories.entity';
import { Variant } from './database/entities/variants.entity';
import { VariantAttributeValue } from './database/entities/variantAttributeValues.entity';
import { ProductAttribute } from './database/entities/productAttributes.entity';
import { Gallery } from './database/entities/galleries.entity';
import { ProductTag } from './database/entities/productTags.entity';
import { OrderItem } from './database/entities/orderItems.entity';
import { ProductShipping } from './database/entities/productShippings.entity';
import { CardItem } from './database/entities/cardItems.entity';
import { AttributeValue } from './database/entities/attributeValues.entity';
import { Attribute } from './database/entities/attributes.entity';
import { Tag } from './database/entities/tags.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration globally available
      envFilePath: '.env', // Path to the .env file
      ignoreEnvFile: false, // Ignore the .env file if not needed
    }),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Password',
    database: 'nestjsproject_db',
    //entities: [__dirname + '/../**/*.entities.{ts,js}'],
    entities: [User, Profile, Post, Customer, Order, Coupon, ProductCoupon, Product, ProductCategory, Category, Variant, VariantAttributeValue, ProductAttribute, Attribute, AttributeValue, Gallery, ProductTag, OrderItem, ProductShipping, CardItem, Tag],
    synchronize: true,
    autoLoadEntities: true,
    logging: true,
  }),
  UserProfileModule, UserPostModule, UsersModule,
  //TypeOrmModule.forFeature([User, Profile, Post, Customer, Order, Coupon, ProductCoupon, Product, ProductCategory, Category, Variant]),
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: 'schema.gql', // Path to generate the schema file
    sortSchema: true,
    playground: true, // Enable GraphQL Playground in development
    debug: true,
  }),
  UserProfileModule, UserPostModule, UsersModule, AuthModule, CustomersModule],
  controllers: [AppController],
  providers: [AppService, AppGateway, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
