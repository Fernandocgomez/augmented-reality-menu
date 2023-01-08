import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from '@xreats/nest/bcrypt';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';

import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { RestaurantOwner, RestaurantOwnerSchema } from './schemas/restaurant-owner.schema';
import { CreateRestaurantOwnerDtoStub } from './test/create-restaurant-owner.dto.stub';

describe('AuthService', () => {
	let service: AuthService;
	let bcryptService: BcryptService;
	let mongoServer: MongoMemoryServer;
	let mongoConnection: Connection;
	let restaurantOwnerModel: Model<RestaurantOwner>;

	beforeAll(async () => {
		mongoServer = await MongoMemoryServer.create();
		const mongoUri = mongoServer.getUri();
		mongoConnection = (await connect(mongoUri)).connection;
		restaurantOwnerModel = mongoConnection.model<RestaurantOwner>(
			RestaurantOwner.name,
			RestaurantOwnerSchema
		);

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				JwtService,
				AuthRepository,
				{ provide: getModelToken(RestaurantOwner.name), useValue: restaurantOwnerModel },
				BcryptService
			],
		}).compile();

		bcryptService = module.get<BcryptService>(BcryptService);
		service = module.get<AuthService>(AuthService);
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

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('validateRestaurantOwner', () => {
		const { username, password } = CreateRestaurantOwnerDtoStub();

		beforeEach(async () => {
			const hashedPassword = await bcryptService.hash(password);
			await new restaurantOwnerModel({ username, password: hashedPassword }).save();
		});

		it('should return the restaurant owner when the credentials are valid', async () => {
			const restaurantOwner = await service.validateRestaurantOwner(username, password);

			expect(restaurantOwner.username).toEqual(username);
		});

		it('should return the restaurant owner without the password', async () => {
			const restaurantOwner = await service.validateRestaurantOwner(username, password);

			expect(restaurantOwner.password).toBeUndefined();
		});

		it('should return the restaurant owner with the _id', async () => {
			const restaurantOwner = await service.validateRestaurantOwner(username, password);

			expect(restaurantOwner._id).toBeDefined();
		});

		it('should return an exception when username does not exist on the data base', async () => {
			await expect(service.validateRestaurantOwner('dummyUserName', password)).rejects.toThrow(
				UnauthorizedException
			);
		});

		it('should return an exception when password does not match', async () => {
			await expect(service.validateRestaurantOwner(username, 'dummyPassword')).rejects.toThrow(
				UnauthorizedException
			);
		});
	});

	describe('getJsonWebToken', () => {
		it('should return a json web token', async () => {
			const restaurantOwner = await new restaurantOwnerModel(CreateRestaurantOwnerDtoStub()).save();

			const jsonWebToken = await service.getJsonWebToken(restaurantOwner);

			expect(jsonWebToken).toBeTruthy();
            expect(typeof jsonWebToken).toBe('string');
		});
	});
});
