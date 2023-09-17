const { connect } = require('../config/db-config');
const logger = require('../logger/logger');
const commonUtils = require('../utils/common-util');
const { getCompanyByID } = require('./company-dao');


class UserDAO {

    db = {};

    constructor() {
        this.db = connect();
        // For Development
        this.db.sequelize.sync({ force: false }).then(() => {
            console.log("DB synced.");
        });
    }

    async getUsers() {
        try {
            const users = await this.db.user.findAll();
            logger.info('getUsers called in UserDAO:::', users);
            return users;
        } catch (err) {
            logger.error('Exception calling getUsers in UserDAO:::' + err);
            return [];
        }
    }

    async getUsersByCompany(company_id, page, size) {
        let data = {};
        try {
            const {offset, limit} = commonUtils.getPagination(page, size);
            const count = await this.db.user.count({
                where: {
                    company_id: company_id,
                }
            });
            data = await this.db.user.findAll( {
                where: {
                    company_id: company_id,
                },
                offset: offset,
                limit: limit,
                order: [['updatedAt', 'DESC']]
            });
            const totalPages = Math.ceil(count/limit)
            logger.info('getUsersByCompany called in UserDAO');
            return {totalUsers: count, users: data, currentPage: page, totalPages: totalPages};
        } catch(err) {
            logger.error('Exception calling getUsersByCompany in UserDAO:::' + err);
            return data;
        }
        
    }

    async getUsersIdsByCompany(company_id) {
        let data = {};
        try {
            data = await this.db.user.findAll( {
                ttributes: ['user_id'],
                where: {
                    company_id: company_id
                }
            });
            logger.info('getUsersByCompany called in UserDAO');
        } catch(err) {
            logger.error('Exception calling getUsersByCompany in UserDAO:::' + err);
        }
        return data;
    }

    async getUserByID(user_id) {
        
        try {
            const user = await this.db.user.findByPk(user_id);
            logger.info('getUserByID called in UserDAO:::', user);
            return user;
        } catch (err) {
            logger.error('Exception calling getUserByID in UserDAO:::' + err);
            return [];
        }
    }

    async createUser(user) {
        let data = {};
        try {
            data = await this.db.user.create(user);
            logger.info('createUser called in UserDAO:::');
        } catch(err) {
            logger.error('Exception calling createUser in UserDAO:::' + err);
        }
        return data;
    }

    async updateUser(user_id, json_data) {
        let data = {};
        console.log(json_data);
        try {
            data = await this.db.user.update({...json_data}, {
                where: {
                    user_id: user_id
                }
            });
            logger.info('updateUser called in UserDAO');
        } catch(err) {
            logger.error('Exception calling updateUser in UserDAO:::' + err);
        }
        return data;
    }

    async deleteUser(user_id) {
        let data = {};
        try {
            data = await this.db.user.destroy({
                where: {
                    user_id: user_id
                }
            });
            logger.info('deleteUser called in UserDAO');
        } catch(err) {
            logger.error('Exception calling deleteUser in UserDAO:::' + err);
        }
        return data;
        return {status: `${data.deletedCount > 0 ? true : false}`};
    }

}

module.exports = new UserDAO();
