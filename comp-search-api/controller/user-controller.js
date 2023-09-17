const userService  = require('../service/user-service');
const logger = require('../logger/logger');
const validator = require('../utils/schema-validator');
const userSchema = require('../schemas/user-schema');

class UserController {

    async getUsers() {
        logger.info('Controller: getUsers')
        const service_result = await userService.getUsers();
        return service_result.make_response();
    }

    async getUsersByCompany(company_id, page, size) {
        logger.info('Controller: getUsersByCompany')
        const service_result = await userService.getUsersByCompany(company_id, page, size);
        return service_result.make_response();
    }

    async getUserByID(user_id) {
        logger.info('Controller: getUserByID')
        const service_result = await userService.getUserByID(user_id);
        return service_result.make_response();
    }

    async createUser(json_data) {
        logger.info('Controller: createUser', json_data);

        const validatorResult = validator(json_data, userSchema.createUserSchema);
        if(validatorResult) return validatorResult;


        const service_result = await userService.createUser(json_data);
        return service_result.make_response();
    }

    async updateUser(user_id, json_data) {
        logger.info('Controller: updateUser', user_id);

        const validatorResult = validator(json_data, userSchema.updateUserSchema);
        if(validatorResult) return validatorResult;

        const service_result = await userService.updateUser(user_id, json_data);
        return service_result.make_response();
    }

    async addToCompany(user_id, company_id) {
        logger.info('Controller: addToCompany', user_id);
        const service_result = await userService.addToCompany(user_id, company_id);
        return service_result.make_response();
    }

    async removeFromCompany(user_id) {
        logger.info('Controller: removeFromCompany', user_id);
        const service_result = await userService.removeFromCompany(user_id);
        return service_result.make_response();
    }

    async activateUser(user_id) {
        logger.info('Controller: activateUser', user_id);
        const service_result = await userService.activateUser(user_id);
        return service_result.make_response();
    }

    async deactivateUser(user_id) {
        logger.info('Controller: deactivateUser', user_id);
        const service_result = await userService.deactivateUser(user_id);
        return service_result.make_response();
    }

    async deleteUser(user_id) {
        logger.info('Controller: deleteUser', user_id);
        const service_result = await userService.deleteUser(user_id);
        return service_result.make_response();
    }
}
module.exports = new UserController();