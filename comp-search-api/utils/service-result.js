const ERROR_CODE = require('../constants/error-codes');
const SUCCESS_CODE = require('../constants/success-codes');

class ServiceResult {
    constructor(){
        this.code = SUCCESS_CODE.RESPONSE.OK;
        this.msg  = "";
        this.data = {};
    }

// TODO: add strings to a property file.

    make_response() {
        let code  = this.code;
        let msg   = this.msg;
        let result = this.data;
        let o_m    = msg;
        let status = "";

        if ( result === null ) {
            return {
                status  : "error",
                code    : ERROR_CODE.RESPONSE.INTERNAL_SERVER_ERROR,
                message : "Something went wrong. Please try again later"
            }
        }
        if (
            code === SUCCESS_CODE.RESPONSE.CREATED ||
            code === SUCCESS_CODE.RESPONSE.OK      ||
            code === SUCCESS_CODE.RESPONSE.UPDATED ||
            code === SUCCESS_CODE.RESPONSE.DELETED
        ){
            status = "success";
            if (msg === "" || msg === null ){
                switch(code) {
                    case SUCCESS_CODE.RESPONSE.OK:                    
                        msg = "Fetched Succesfully";
                        break;
                    case SUCCESS_CODE.RESPONSE.CREATED:
                        msg = "Created Successfully";
                        break;
                    case SUCCESS_CODE.RESPONSE.UPDATED:
                        msg = "Updated Successfully";
                        break;
                    case SUCCESS_CODE.RESPONSE.DELETED:
                        msg = "Deleted Successfully";
                        break;
                }
            }
            
        } else {
            status = "error";
            if( msg === "" || msg === null) {
                switch(code) {
                    case ERROR_CODE.RESPONSE.BAD_REQUEST:
                        msg = "Bad Request";
                        break;
                    case ERROR_CODE.RESPONSE.UNAUTHORIZED:
                        msg = "Invalid Access Token";
                        break;
                    case ERROR_CODE.RESPONSE.FORBIDDEN:
                        msg = "Access Denied";
                        break;
                    case ERROR_CODE.RESPONSE.RESOURCE_NOT_FOUND:
                        msg = "Resource Not Found";
                        break;
                    case ERROR_CODE.RESPONSE.CONFLICT:
                        msg = "Request causes conflict";
                        break;
                    case ERROR_CODE.RESPONSE.INTERNAL_SERVER_ERROR:
                        msg = "Something went wrong";
                        break;
                }
            }
        }

        if( msg === null ) {
            msg = o_m;
        }
        return {
            status  : status,
            code    : code,
            message : msg,
            result : result
        }

    }

}

module.exports = ServiceResult;

