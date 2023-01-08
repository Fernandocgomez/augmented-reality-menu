import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from '@xreats/nest/bcrypt';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model } from 'mongoose';
import { connect, Connection } from 'mongoose';

import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { RestaurantOwner, RestaurantOwnerSchema } from '@xreats/nest/shared';

describe('AuthController', () => {
    let controller: AuthController;
    let mongoServer: MongoMemoryServer;
    let mongoConnection: Connection;
    let restaurantOwnerModel: Model<RestaurantOwner>;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        mongoConnection = (await connect(mongoUri)).connection;
        restaurantOwnerModel = mongoConnection.model<RestaurantOwner>(RestaurantOwner.name, RestaurantOwnerSchema);

        const module: TestingModule = await Test.createTestingModule({ 
            controllers: [AuthController],
            providers: [
                AuthService,
                JwtService,
                AuthRepository,
                { provide: getModelToken(RestaurantOwner.name), useValue: restaurantOwnerModel },
                BcryptService
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    afterAll(async () => {
        await mongoConnection.dropDatabase();
        await mongoConnection.close();
        await mongoServer.stop();
    });

    afterEach(async () => {
        const collections = mongoConnection.collections;

        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany({});
        }
    });

    describe('login', () => {
        it('should return the logged in restaurant owner and his JWT', async () => {

            const restaurantOwner: Partial<RestaurantOwner> = {
                _id: '5f9f1b9b9c9d9c0b1c8b4b5b',
                username: 'username',
            };

            const request = {
                method: 'POST',
                url: '/auth/login',
                user: restaurantOwner,
            };

            const response = await controller.login(request);

            expect(response.restaurantOwner.username).toEqual(restaurantOwner.username);
            expect(response.access_token).toBeDefined();
        });

        it('should return the restaurant owner without the password property', async () => {
            const restaurantOwner: Partial<RestaurantOwner> = {
                _id: '5f9f1b9b9c9d9c0b1c8b4b5b',
                username: 'username',
            };
            const request = {
                method: 'POST',
                url: '/auth/login',
                user: restaurantOwner,
            };

            const response = await controller.login(request);

            expect(response.restaurantOwner.password).toBeUndefined();
        });
    });

});