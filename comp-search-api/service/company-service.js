const companyDAO  = require('../dao/company-dao');
const util = require('util');
const request = require('request');
const crypto = require('crypto');
const fs = require('fs');
const requestPromise = util.promisify(request);
const ServiceResult = require('../utils/service-result');
const SUCCESS_CODE = require('../constants/success-codes');
const ERROR_CODE = require('../constants/error-codes');
const logger = require('../logger/logger');
const downloadImage  = require('../utils/download-image');


class CompanyService {
    
    constructor() {
        this.serviceResult = new ServiceResult();
    }

    async getCompanies(page, size) {
        this.serviceResult = new ServiceResult();
        try{
            const result = await companyDAO.getCompanies(page, size);
            this.serviceResult.data = result;
            return this.serviceResult;    
        } catch(err){
            logger.error('Exception calling getCompanies in CompanyService:::' + err)
            this.serviceResult.code = ERROR_CODE.RESPONSE.INTERNAL_SERVER_ERROR;
            return this.serviceResult;
        }
    }
    
    async getCompanyByID(company_id) {
        this.serviceResult = new ServiceResult();
        try{
            const result = await companyDAO.getCompanyByID(company_id);
            if(result){
                if( result.latitude && result.longitude ){
                    const coord = `${result.longitude},${result.latitude}`
                    const map_api = `${process.env.MAPBOX_API}${coord})/${coord},10/500x300?access_token=${process.env.MB_ACCESS_TOKEN}`;
                    result.map = map_api;
                }
                
                // result.map = 
                this.serviceResult.data = result;
                
            } else{
                this.serviceResult.code = ERROR_CODE.RESPONSE.RESOURCE_NOT_FOUND;
            }

            return this.serviceResult;
        } catch(err){
            logger.error('Exception calling getCompanyByID in CompanyService:::' + err)
            this.serviceResult.code = ERROR_CODE.RESPONSE.INTERNAL_SERVER_ERROR;
            return this.serviceResult;
        }
    }

    async createCompany(company) {
        this.serviceResult = new ServiceResult();
        try{
            company.company_id = crypto.randomUUID();
            const api = process.env.COORDINATE_API + "=" +  process.env.ACCESS_KEY +"&query=" + company.address;
            const api_resp = await requestPromise(api);
            if (api_resp.statusCode === 200){
                const position_data = JSON.parse(api_resp.body).data[0];
                if (position_data && position_data.latitude !== undefined && position_data.longitude !== undefined){
                    console.log("latitue::::" + position_data.latitude);
                    console.log("longitude:::" + position_data.longitude);
                    company.latitude = position_data.latitude;
                    company.longitude = position_data.longitude;    
                    let coord = `${position_data.longitude},${position_data.latitude}`;
                    let company_file_system = `../comp-search-api/file-system/company/maps/${company.company_id}.png` ;
                    downloadImage.downloadImageFromURL( `${process.env.MAPBOX_API}${coord})/${coord},10/500x300?access_token=${process.env.MB_ACCESS_TOKEN}`, company_file_system );
                    company.map = company_file_system;
                }
            }
            const result = await companyDAO.createCompany(company);
            this.serviceResult.data = result;
            this.serviceResult.code = SUCCESS_CODE.RESPONSE.CREATED;
            return this.serviceResult;
    
        } catch(err){
            logger.error('Exception calling createCompany in CompanyService:::' + err)
            this.serviceResult.code = ERROR_CODE.RESPONSE.INTERNAL_SERVER_ERROR;
            return this.serviceResult;
        }
    }

    async updateCompany(company_id, json_data) {
        this.serviceResult = new ServiceResult();
        try{
            const company = await companyDAO.getCompanyByID(company_id);

            if (company){

            if (json_data && json_data.address && company.address !== json_data.address){
                const api = process.env.COORDINATE_API + "=" +  process.env.ACCESS_KEY +"&query=" + json_data.address;
                const api_resp = await requestPromise(api);
                if (api_resp.statusCode === 200){
                    const position_data = JSON.parse(api_resp.body).data[0];
                    if (position_data && position_data.latitude !== undefined && position_data.longitude !== undefined){
                        console.log("latitue::::" + position_data.latitude);
                        console.log("longitude:::" + position_data.longitude);
                        json_data.latitude = position_data.latitude;
                        json_data.longitude = position_data.longitude;    
                        let coord = `${position_data.longitude},${position_data.latitude}`;
                        let company_file_system = `../comp-search-api/file-system/company/maps/${company_id}.png` ;
                        downloadImage.downloadImageFromURL( `${process.env.MAPBOX_API}${coord})/${coord},10/500x300?access_token=${process.env.MB_ACCESS_TOKEN}`, company_file_system );
                        json_data.map = company_file_system;
                    }
                }
            }
            const result = await companyDAO.updateCompany(company_id, json_data);
            this.serviceResult.data = result;
            this.serviceResult.code = SUCCESS_CODE.RESPONSE.UPDATED;
            } else {
                logger.error('Resource not found while calling updateCompany in CompanyService:::' )
                this.serviceResult.code = ERROR_CODE.RESPONSE.RESOURCE_NOT_FOUND;
            }
            return this.serviceResult;
        } catch(err){
            logger.error('Exception calling updateCompany in CompanyService:::' + err)
            this.serviceResult.code = ERROR_CODE.RESPONSE.INTERNAL_SERVER_ERROR;
            return this.serviceResult;
        }
    }

    async deleteCompany(company_id) {
        this.serviceResult = new ServiceResult();
        try{
            const result = await companyDAO.deleteCompany(company_id);
            this.serviceResult.data = result;
            this.serviceResult.code = SUCCESS_CODE.RESPONSE.DELETED;
            return this.serviceResult;
        } catch(err){
            logger.error('Exception calling deleteCompany in CompanyService:::' + err)
            this.serviceResult.code = ERROR_CODE.RESPONSE.INTERNAL_SERVER_ERROR;
            return this.serviceResult;
        }
    }

}

module.exports = new CompanyService();