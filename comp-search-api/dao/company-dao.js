const { connect } = require('../config/db-config');
const logger = require('../logger/logger');
const commonUtils = require('../utils/common-util');


class CompanyDAO {

    db = {};

    constructor() {
        this.db = connect();
        // For Development
        this.db.sequelize.sync({ force: false }).then(() => {
            console.log("DB synced.");
        });
    }

    async getCompanies(page, size) {
        try {
            const {offset, limit} = commonUtils.getPagination(page, size);
            // console.log(limit)
            console.log(offset)
            const count = await this.db.company.count();
            const companies = await this.db.company.findAll({offset: offset, limit: limit, order: [['updatedAt', 'DESC']]});
            logger.info('getCompanies called in CompanyDAO:::', companies);
            logger.info('returns' + {totalPages: count, companies: companies});

            const totalPages = Math.ceil(count/limit)
            // console.log(Math.floor(count/limit))
            return {totalCompanies: count, companies: companies, currentPage: page, totalPages: totalPages};
            // return companies
        } catch (err) {
            logger.error('Exception calling getCompanies in CompanyDAO:::' + err);
            return [];
        }
    }

    async getCompanyByID(company_id) {
        
        try {
            const company = await this.db.company.findByPk(company_id);
            logger.info('getCompanyByID called in CompanyDAO:::', company);
            return company;
        } catch (err) {
            logger.error('Exception calling getCompanyByID in CompanyDAO:::' + err);
            return null;
        }
    }

    async createCompany(company) {
        let data = {};
        try {
            data = await this.db.company.create(company);
            logger.info('createCompany called in CompanyDAO:::');
        } catch(err) {
            logger.error('Exception calling createCompany in CompanyDAO:::' + err);
        }
        return data;
    }

    async updateCompany(company_id, json_data) {
        let data = {};
        try {
            data = await this.db.company.update({...json_data}, {
                where: {
                    company_id: company_id
                }
            });
            logger.info('updateCompany called in CompanyDAO');
        } catch(err) {
            logger.error('Exception calling updateCompany in CompanyDAO:::' + err);
        }
        return data;
    }

    async deleteCompany(company_id) {
        let data = {};
        try {
            data = await this.db.company.destroy({
                where: {
                    company_id: company_id
                }
            });
            logger.info('deleteCompany called in CompanyDAO');
        } catch(err) {
            logger.error('Exception calling deleteCompany in CompanyDAO:::' + err);
        }
        return data;
        return {status: `${data.deletedCount > 0 ? true : false}`};
    }

}

module.exports = new CompanyDAO();
