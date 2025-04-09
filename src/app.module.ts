import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { UserPostModule } from './user-post/user-post.module';
import { AppGateway } from './websockets/app.gateway';
import { AuthService } from './security/auth/auth.service';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './security/auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersController } from './orders/controllers/orders/orders.controller';
import { CardsController } from './cards/controllers/cards/cards.controller';
import { CardsModule } from './cards/cards.module';
import { OrdersModule } from './orders/orders.module';
import { OrderStatusesController } from './order-statuses/controllers/order-statuses/order-statuses.controller';
import { OrderStatusesModule } from './order-statuses/order-statuses.module';
import { OrderItemsController } from './order-items/controllers/order-items/order-items.controller';
import { OrderItemsModule } from './order-items/order-items.module';
import { CardItemsController } from './card-items/controllers/card-items/card-items.controller';
import { CardItemsModule } from './card-items/card-items.module';

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
  UserProfileModule, UserPostModule, UsersModule,
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: 'schema.gql', // Path to generate the schema file
    sortSchema: true,
    playground: true, // Enable GraphQL Playground in development
    debug: true,
  }),
  UserProfileModule, UserPostModule, UsersModule, AuthModule, CustomersModule, CardsModule, OrdersModule, OrderStatusesModule, OrderItemsModule, CardItemsModule],
  controllers: [AppController, OrdersController, CardsController, OrderStatusesController, OrderItemsController, CardItemsController],
  providers: [AppService, AppGateway, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
