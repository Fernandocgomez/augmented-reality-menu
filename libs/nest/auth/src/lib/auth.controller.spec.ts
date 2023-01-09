import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from '@xreats/nest/bcrypt';
import { CreateRestaurantOwnerDtoStub, RestaurantOwner, RestaurantOwnerSchema } from '@xreats/nest/shared';

import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model } from 'mongoose';
import { connect, Connection } from 'mongoose';

import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { ValidateJwtResponseDto } from './dto/validate-jwt-response.dto';

describe('AuthController', () => {
    let controller: AuthController;
    let authService: AuthService;
    let bcryptService: BcryptService;

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
        authService = module.get<AuthService>(AuthService);
        bcryptService = module.get<BcryptService>(BcryptService);
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

    describe('validateToken', () => {

        describe('when the token is valid', () => {
            it('should return an instance of ValidateJwtResponseDto with the property isTokenValid equals to true', async () => {
                const { username, password } = CreateRestaurantOwnerDtoStub();
                const hashedPassword = await bcryptService.hash(password);
                const restaurantOwner: Partial<RestaurantOwner> = await new restaurantOwnerModel({ username, password: hashedPassword }).save();
                const jwtToken = await authService.getJsonWebToken(restaurantOwner);
                const body = { access_token: jwtToken };
    
                const response = await controller.validateToken(body);
    
                expect(response).toBeInstanceOf(ValidateJwtResponseDto);
                expect(response.isTokenValid).toBeTruthy();
            });
    
            it('should return an instance of ValidateJwtResponseDto with the property restaurantOwner.username equals to restaurant owner username', async () => {
                const { username, password } = CreateRestaurantOwnerDtoStub();
                const hashedPassword = await bcryptService.hash(password);
                const restaurantOwner: Partial<RestaurantOwner> = await new restaurantOwnerModel({ username, password: hashedPassword }).save();
                const jwtToken = await authService.getJsonWebToken(restaurantOwner);
                const body = { access_token: jwtToken };
    
                const response = await controller.validateToken(body);
    
                expect(response).toBeInstanceOf(ValidateJwtResponseDto);
                expect(response.restaurantOwner.username).toBe(username);
            });

            it('should return an instance of ValidateJwtResponseDto with the property message[0] equals to "Valid token"', async () => {
                const { username, password } = CreateRestaurantOwnerDtoStub();
                const hashedPassword = await bcryptService.hash(password);
                const restaurantOwner: Partial<RestaurantOwner> = await new restaurantOwnerModel({ username, password: hashedPassword }).save();
                const jwtToken = await authService.getJsonWebToken(restaurantOwner);
                const body = { access_token: jwtToken };
    
                const response = await controller.validateToken(body);
    
                expect(response).toBeInstanceOf(ValidateJwtResponseDto);
                expect(response.message[0]).toBe('Valid token');
            });
        });


        describe('when the token is invalid', () => {
            it('should return an instance of ValidateJwtResponseDto with the property isTokenValid equals to false', async () => {
                const body = { access_token: 'invalidToken' };
    
                const response = await controller.validateToken(body);
    
                expect(response).toBeInstanceOf(ValidateJwtResponseDto);
                expect(response.isTokenValid).toBeFalsy();
            });
    
            it('should return an instance of ValidateJwtResponseDto with the property restaurantOwner equals to null', async () => {
                const body = { access_token: 'invalidToken' };
    
                const response = await controller.validateToken(body);
    
                expect(response).toBeInstanceOf(ValidateJwtResponseDto);
                expect(response.restaurantOwner).toBe(null);
            });

            it('should return an instance of ValidateJwtResponseDto with the property message[0] equals to "Invalid token"', async () => {
                const body = { access_token: 'invalidToken' };
    
                const response = await controller.validateToken(body);
    
                expect(response).toBeInstanceOf(ValidateJwtResponseDto);
                expect(response.message[0]).toBe('Invalid token');
            });

        });
    })

});