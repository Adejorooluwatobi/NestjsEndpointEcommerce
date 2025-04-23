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
import * as Modules from './modules';
import * as Controllers from './controllers';

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
  AuthModule,
    Modules.AttributeModule,
    Modules.AttributeValueModule,
    Modules.CardItemsModule,
    Modules.CardsModule,
    Modules.CategoryModule,
    Modules.CouponModule,
    Modules.CustomerAddressModule,
    Modules.CustomersModule,
    Modules.GalleryModule,
    Modules.NotificationModule,
    Modules.OrderItemsModule,
    Modules.OrderStatusesModule,
    Modules.OrdersModule,
    Modules.PostModule,
    Modules.ProductAttributeModule,
    Modules.ProductCategoryModule,
    Modules.ProductCouponModule,
    Modules.ProductModule,
    Modules.ProductShippingModule,
    Modules.ProductTagModule,
    Modules.ProfileModule,
    Modules.RolesModule,
    Modules.SellModule,
    Modules.ShippingModule,
    Modules.SlideBannerModule,
    Modules.StaffAccountsModule,
    Modules.StaffRolesModule,
    Modules.TagModule,
    Modules.UsersModule,
    Modules.VariantAttributeValueModule,
    Modules.VariantModule,
  ],
  controllers: [
    AppController,
    Controllers.AttributeController,
    Controllers.AttributeValueController,
    Controllers.CardItemsController,
    Controllers.CardsController,
    Controllers.CategoryController,
    Controllers.CouponController,
    Controllers.CustomerAddressController,
    Controllers.CustomersController,
    Controllers.GalleryController,
    Controllers.NotificationController,
    Controllers.OrderItemsController,
    Controllers.OrdersController,
    Controllers.OrderStatusesController,
    Controllers.PostController,
    Controllers.ProductAttributeController,
    Controllers.ProductCategoryController,
    Controllers.ProductCouponController,
    Controllers.ProductController,
    Controllers.ProductShippingController,
    Controllers.ProductTagController,
    Controllers.ProfileController,
    Controllers.RolesController,
    Controllers.SellController,
    Controllers.ShippingController,
    Controllers.SlideBannerController,
    Controllers.StaffAccountsController,
    Controllers.StaffRolesController,
    Controllers.TagController,
    Controllers.UsersController,
    Controllers.VariantAttributeValueController,
    Controllers.VariantController,
  ],
  providers: [AppService, AppGateway, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
