const companyService  = require('../service/company-service');
const logger = require('../logger/logger');
const companySchema = require("../schemas/company-schema");
const validator = require("../utils/schema-validator");

class CompanyController {


    async getCompanies(page, size) {
        logger.info('Controller: getCompanies');
        const service_result = await companyService.getCompanies(page, size)
        return service_result.make_response();
    }

    async getCompanyByID(company_id) {
        logger.info('Controller: getCompanyByID');
        const service_result = await companyService.getCompanyByID(company_id);
        return service_result.make_response();
    }

    async createCompany(json_data)  {
        logger.info('Controller: createCompany', json_data);

        const validatorResult = validator(json_data, companySchema.creatCompanySchema)
        if(validatorResult) return validatorResult;

        const service_result = await companyService.createCompany(json_data);
        return service_result.make_response();        
    }

    async updateCompany(company_id, json_data) {
        logger.info('Controller: updateCompany', company_id);

        const validatorResult = validator(json_data, companySchema.updateCompanySchema)
        if(validatorResult) return validatorResult;

        const service_result = await companyService.updateCompany(company_id, json_data); 
        return service_result.make_response();
    }

    async deleteCompany(company_id) {
        logger.info('Controller: deleteCompany', company_id);
        const service_result = await companyService.deleteCompany(company_id);
        return service_result.make_response();
    }
}
module.exports = new CompanyController();