import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from "@xreats/nest/bcrypt";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connect, Connection, Model } from "mongoose";

import { RestaurantOwnerAlreadyExistException } from './exceptions/restaurant-already-exist.exception';
import { RestaurantOwnerNotFoundException } from './exceptions/restaurant-owner-not-found.exception';
import { RestaurantOwnerController } from './restaurant-owner.controller';
import { RestaurantOwnerRepository } from './restaurant-owner.repository';
import { RestaurantOwnerService } from './restaurant-owner.service';
import { RestaurantOwner, RestaurantOwnerSchema } from '@xreats/nest/shared';
import { CreateRestaurantOwnerDtoStub } from './test/create-restaurant-owner.dto.stub';

describe('RestaurantOwnerController', () => {
	let controller: RestaurantOwnerController;
    let mongoServer: MongoMemoryServer;
    let mongoConnection: Connection;
    let restaurantOwnerModel: Model<RestaurantOwner>;

	beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        mongoConnection = (await connect(mongoUri)).connection;
        restaurantOwnerModel = mongoConnection.model<RestaurantOwner>(RestaurantOwner.name, RestaurantOwnerSchema);


		const module: TestingModule = await Test.createTestingModule({
			controllers: [RestaurantOwnerController],
            providers: [
                RestaurantOwnerService,
                RestaurantOwnerRepository,
                { provide: getModelToken(RestaurantOwner.name), useValue: restaurantOwnerModel },
                BcryptService,
            ],
		}).compile();

		controller = module.get<RestaurantOwnerController>(RestaurantOwnerController);
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

    describe('create', () => {
        it('should return the saved restaurant owner', async () => {
            const createRestaurantOwnerDto = await controller.create(CreateRestaurantOwnerDtoStub());

            expect(createRestaurantOwnerDto.username).toBe(CreateRestaurantOwnerDtoStub().username);
        });

        it('should return the saved restaurant owner without the password property', async () => {
            const createRestaurantOwnerDto = await controller.create(CreateRestaurantOwnerDtoStub());

            expect(createRestaurantOwnerDto.password).toBeUndefined();
        });

        it('should return the saved restaurant owner with the _id property', async () => {
            const createRestaurantOwnerDto = await controller.create(CreateRestaurantOwnerDtoStub());

            expect(createRestaurantOwnerDto._id).toBeDefined();
        });

        it('should throw a RestaurantOwnerAlreadyExistException if the username is already taken', async () => {
            await (new restaurantOwnerModel(CreateRestaurantOwnerDtoStub())).save();

            await expect(controller.create(CreateRestaurantOwnerDtoStub()))
                .rejects
                .toThrow(RestaurantOwnerAlreadyExistException);
        });
    });

    describe('findOne', () => {
        it('should return the restaurant owner with the given id', async () => {
            const createRestaurantOwnerDto = await controller.create(CreateRestaurantOwnerDtoStub());

            const restaurantOwner = await controller.findOne(createRestaurantOwnerDto._id);

            expect(restaurantOwner._id).toEqual(createRestaurantOwnerDto._id);
        });

        it('should throw an RestaurantOwnerNotFoundException if the restaurant owner does not exist', async () => {
            await expect(controller.findOne('5f9f1c9b9b9b9b9b9b9b9b9b'))
                .rejects
                .toThrow(RestaurantOwnerNotFoundException);

        });

        it('should return the restaurant owner without the password property', async () => {
            const createRestaurantOwnerDto = await controller.create(CreateRestaurantOwnerDtoStub());

            const restaurantOwner = await controller.findOne(createRestaurantOwnerDto._id);

            expect(restaurantOwner.password).toBeUndefined();
        });
    });
	
});
