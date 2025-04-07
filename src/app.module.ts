import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { Admin } from './typeorm/entities/Admin';
import { User } from './database/entities/User';
import { Profile } from './database/entities/Profile';
//import { AdminsModule } from './admins/admins.module';
import { UsersModule } from './users/users.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { UserPostModule } from './user-post/user-post.module';
import { Post } from './database/entities/Post';
import { UserProfileService } from './user-profile/services/user-profile/user-profile.service';
import { UserProfileController } from './user-profile/controllers/user-profile/user-profile.controller';
import { UserPostController } from './user-post/controllers/user-post/user-post.controller';
import { UserPostService } from './user-post/services/user-post/user-post.service';
// import { LoggingMiddleware } from './interceptors/logging.interceptor';
import { AppGateway } from './websockets/app.gateway';
import { AuthService } from './security/auth/auth.service';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './security/auth/auth.module';

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
    entities: [User, Profile, Post],
    synchronize: true,
    autoLoadEntities: true,
    logging: true,
  }),
  UserProfileModule, UserPostModule,
  TypeOrmModule.forFeature([User, Profile, Post]),
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: 'schema.gql', // Path to generate the schema file
    sortSchema: true,
    playground: true, // Enable GraphQL Playground in development
    debug: true,
  }),
  UsersModule, AuthModule],
  controllers: [AppController, UserProfileController, UserPostController],
  providers: [AppService, AppGateway, AuthService, UserProfileService, UserPostService,],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
