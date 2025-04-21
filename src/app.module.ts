import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppGateway } from './websockets/app.gateway';
import { AuthService } from './security/auth/auth.service';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './security/auth/auth.module';
import { CustomersModule } from './modules/customers/customers.module';
import { ProfileModule } from './modules/profile/profile.module';
import { PostModule } from './modules/post/post.module';
import { UsersModule } from './modules/users/users.module';
import { OrdersController } from './modules/orders/controllers/orders/orders.controller';
import { CardsModule } from './modules/cards/cards.module';
import { OrderItemsController } from './modules/order-items/controllers/order-items/order-items.controller';
import { CardItemsController } from './modules/card-items/controllers/card-items/card-items.controller';
import { OrderStatusesModule } from './modules/order-statuses/order-statuses.module';
import { CardItemsModule } from './modules/card-items/card-items.module';
import { OrderItemsModule } from './modules/order-items/order-items.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OrderStatusesController } from './modules/order-statuses/controllers/order-statuses/order-statuses.controller';
import { CardsController } from './modules/cards/controllers/cards/cards.controller';
import { StaffAccountsModule } from './modules/staff-accounts/staff-accounts.module';
import { StaffRolesModule } from './modules/staff-roles/staff-roles.module';
import { RolesModule } from './modules/roles/roles.module';
import { ProductController } from './modules/product/controllers/product/product.controller';
import { ProductModule } from './modules/product/product.module';
import { CouponModule } from './modules/coupon/coupon.module';
import { CouponController } from './modules/coupon/controllers/coupon/coupon.controller';
import { CustomerAddressModule } from './modules/customer-address/customer-address.module';
import { VariantModule } from './modules/variant/variant.module';
// import { VariantAttributeValueModule } from './modules/variant-attribute-value/variant-attribute-value.module';
import { AttributeValueModule } from './modules/attribute-value/attribute-value.module';
import { CategoryModule } from './modules/category/category.module';
import { AttributeModule } from './modules/attribute/attribute.module';
import { TagModule } from './modules/tag/tag.module';
import { ShippingModule } from './modules/shipping/shipping.module';

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
    entities: [__dirname + '/../database/entities/*.entity.{ts,js}'],
    synchronize: true,
    autoLoadEntities: true,
    logging: true,
  }),
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: 'schema.gql', // Path to generate the schema file
    sortSchema: true,
    playground: true, // Enable GraphQL Playground in development
    debug: true,
  }),
  ProfileModule, PostModule, UsersModule, AuthModule, CustomersModule, CustomerAddressModule, CardsModule, OrdersModule, OrderStatusesModule, OrderItemsModule, CardItemsModule, StaffAccountsModule, StaffRolesModule, RolesModule, ProductModule, CouponModule, VariantModule, AttributeValueModule, CategoryModule, AttributeModule, TagModule, ShippingModule],
  controllers: [AppController, OrdersController, CardsController, OrderStatusesController, OrderItemsController, CardItemsController, ProductController, CouponController],
  providers: [AppService, AppGateway, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
