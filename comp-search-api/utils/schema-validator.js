const ServiceResult = require('../utils/service-result');
const ERROR_CODE = require('../constants/error-codes');
const logger = require('../logger/logger');
const Validator = require("jsonschema").Validator;
const schemaValidator = new Validator();

module.exports = validator = (json, schema) => {
    const validate = schemaValidator.validate(json, schema);
    if(!validate.valid){
        const validatorResult = new ServiceResult();
        logger.info('Invalid json schema');

        validatorResult.code = ERROR_CODE.RESPONSE.BAD_REQUEST;
        const errors_list = validate.errors.map((err) => {
            if (err.path && err.path.length > 0){
                return err.path.map((path) => {
                    return {
                        key: path,
                        message: err.stack
                    }
                })
            } else {
                return {
                    key: err.name,
                    message: err.stack
                }
            }
            
        });

        const errors = errors_list.flat();


        
        validatorResult.data = {
            "errors": errors
        }
        return validatorResult.make_response();
    }
}