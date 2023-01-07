import { 
    Body, 
    Controller, 
    Post,
    Get,
    UsePipes,
	ValidationPipe,
    Param, 
} from "@nestjs/common";

import { CreateRestaurantOwnerDto } from "./dtos/create-restaurant-owner.dto";

import { RestaurantOwnerService } from "./restaurant-owner.service";

@Controller('restaurant-owners')
export class RestaurantOwnerController {
    constructor(private readonly restaurantOwnerService: RestaurantOwnerService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async create(
        @Body() createRestaurantOwnerDto: CreateRestaurantOwnerDto
    ) {
        const { username, password } = createRestaurantOwnerDto;

        return this.restaurantOwnerService.create(username, password);
    };

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.restaurantOwnerService.findOne(id);
    }

}
