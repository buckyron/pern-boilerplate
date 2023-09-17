const userDAO  = require('../dao/user-dao');
const USER_CONSTANTS = require('../constants/user-constants');
const userDao = require('../dao/user-dao');
const serviceResult = require('../utils/service-result');
const SUCCESS_CODE = require('../constants/success-codes');
const ServiceResult = require('../utils/service-result');
const logger = require('../logger/logger');
const ERROR_CODE = require('../constants/error-codes');
const companyDao = require('../dao/company-dao');


class UserService {
    
    constructor() {
        this.serviceResult = new ServiceResult();
    }

    async getUsers() {
        this.serviceResult = new ServiceResult();
        try{
            const result = await userDAO.getUsers();
            this.serviceResult.data = result;
            return this.serviceResult;    
        } catch(err){
            logger.error('Exception calling getUsers in UserService:::' + err)
            this.serviceResult.code = ERROR_CODE.RESPONSE.INTERNAL_SERVER_ERROR;
            return this.serviceResult;
        }
    }

    async getUsersByCompany(company_id, page, size) {
        this.serviceResult = new ServiceResult();
        try{
            const result = await userDAO.getUsersByCompany(company_id, page, size);
            this.serviceResult.data = result;
            return this.serviceResult;    
        } catch(err){
            logger.error('Exception calling getUsers in UserService:::' + err)
            this.serviceResult.code = ERROR_CODE.RESPONSE.INTERNAL_SERVER_ERROR;
            return this.serviceResult;
        }
    }
    
    async getUserByID(user_id) {
        this.serviceResult = new ServiceResult();
        try{
            const result = await userDAO.getUserByID(user_id);
            if(result){
                this.serviceResult.data = result;
            } else {
                this.serviceResult.code = ERROR_CODE.RESPONSE.RESOURCE_NOT_FOUND;
            }

            return this.serviceResult;    
        } catch(err){
            logger.error('Exception calling getUserByID in UserService:::' + err)
            this.serviceResult.code = ERROR_CODE.RESPONSE.INTERNAL_SERVER_ERROR;
            return this.serviceResult;
        }
    }

    async createUser(user) {
        this.serviceResult = new ServiceResult();
        try{
            user.active = USER_CONSTANTS.AVAILABILITY.ACTIVE;
            const result = await userDAO.createUser(user);
            this.serviceResult.code = SUCCESS_CODE.RESPONSE.CREATED;
            this.serviceResult.data = result;
            return this.serviceResult;    
        } catch(err){
            logger.error('Exception calling createUser in UserService:::' + err)
            this.serviceResult.code = ERROR_CODE.RESPONSE.INTERNAL_SERVER_ERROR;
            return this.serviceResult;
        }
    }

    async updateUser(user_id, json_data) {
        this.serviceResult = new ServiceResult();
        try{
            if(json_data && json_data.company_id) {
                console.log(json_data.company_id)
                const company = await companyDao.getCompanyByID(json_data.company_id);
                console.log(company)
                if (!company) {
                    this.serviceResult.code = ERROR_CODE.RESPONSE.RESOURCE_NOT_FOUND;
                    this.serviceResult.msg = "Invalid Company Id";
                    return this.serviceResult;
                }
            }
            const user = userDao.getUserByID(user_id);
            json_data.active = user.active;
            const result = await userDAO.updateUser(user_id, json_data);
            this.serviceResult.code = SUCCESS_CODE.RESPONSE.UPDATED;
            this.serviceResult.data = result;
            return this.serviceResult;
    
        } catch(err){
            logger.error('Exception calling updateUser in UserService:::' + err)
            this.serviceResult.code = ERROR_CODE.RESPONSE.INTERNAL_SERVER_ERROR;
            return this.serviceResult;
        }
    }

    async addToCompany(user_id, company_id) {
        this.serviceResult = new ServiceResult();
        try{
            const result = await userDAO.updateUser(user_id, {
                company_id: company_id,
            });
            this.serviceResult.data = result;
            this.serviceResult.code = SUCCESS_CODE.RESPONSE.UPDATED;
            this.serviceResult.msg  = "Added user to company";
            return this.serviceResult;
    
        } catch(err){
            logger.error('Exception calling addToCompany in UserService:::' + err)
            this.serviceResult.code = ERROR_CODE.RESPONSE.INTERNAL_SERVER_ERROR;
            return this.serviceResult;
        }
    }

    async removeFromCompany(user_id) {
        this.serviceResult = new ServiceResult();
        try{
            const result = await userDAO.updateUser(user_id, {
                company_id: null
            });
            this.serviceResult.code = SUCCESS_CODE.RESPONSE.UPDATED;
            this.serviceResult.msg  = "Removed user from company";
            this.serviceResult.data = result;
            return this.serviceResult;    
        } catch(err){
            logger.error('Exception calling removeFromCompany in UserService:::' + err)
            this.serviceResult.code = ERROR_CODE.RESPONSE.INTERNAL_SERVER_ERROR;
            return this.serviceResult;
        }
    }

    async activateUser(user_id) {
        this.serviceResult = new ServiceResult();
        try{
            const result = await userDAO.updateUser(user_id, {
                active: USER_CONSTANTS.AVAILABILITY.ACTIVE,
            });
            this.serviceResult.code = SUCCESS_CODE.RESPONSE.UPDATED;
            this.serviceResult.msg  = "User activated";
            this.serviceResult.data = result
            return this.serviceResult;    
        } catch(err){
            logger.error('Exception calling activateUser in UserService:::' + err)
            this.serviceResult.code = ERROR_CODE.RESPONSE.INTERNAL_SERVER_ERROR;
            return this.serviceResult;
        }
    }

    async deactivateUser(user_id) {
        this.serviceResult = new ServiceResult();
        try{
            const result = await userDAO.updateUser(user_id, {
                active: USER_CONSTANTS.AVAILABILITY.DEACTIVE,
            });
            this.serviceResult.code = SUCCESS_CODE.RESPONSE.UPDATED;
            this.serviceResult.msg  = "User Deactivated";
            this.serviceResult.data = result;
            return this.serviceResult;    
        } catch(err){
            logger.error('Exception calling deactivateUser in UserService:::' + err)
            this.serviceResult.code = ERROR_CODE.RESPONSE.INTERNAL_SERVER_ERROR;
            return this.serviceResult;
        }
    }

    async deleteUser(user_id) {
        this.serviceResult = new ServiceResult();
        try{
            const result = await userDAO.deleteUser(user_id);
            this.serviceResult.code = SUCCESS_CODE.RESPONSE.DELETED;
            this.serviceResult.data = result;
            return this.serviceResult;    
        } catch(err){
            logger.error('Exception calling deleteUser in UserService:::' + err)
            this.serviceResult.code = ERROR_CODE.RESPONSE.INTERNAL_SERVER_ERROR;
            return this.serviceResult;
        }
    }

}

module.exports = new UserService();