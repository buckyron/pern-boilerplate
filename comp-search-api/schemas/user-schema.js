const createUserSchema = {
    additionalProperties: false,
    id: "/createUserSchema",
    type: "object",
    properties: {
        firstname: {
            type: "string",
            minLength: 2
        },
        lastname: {
            type: "string",
            minLength: 1
        },
        email: {
            type: "string",
            format: "email",
            minLength: 5
        },
        designation: {
            type: "string",
            minLength: 2
        },
        active: {
            type: "boolean"
        }, 
        company_id: {
            type: "string",
            minLength: 36
        }

    },
    required: ["firstname", "email", "company_id", ]

}



const updateUserSchema = {
    additionalProperties: false,
    id: "/updateUserSchema",
    type: "object",
    properties: {
        firstname: {
            type: "string",
            minLength: 2
        },
        lastname: {
            type: "string",
            minLength: 1
        },
        email: {
            type: "string",
            format: "email",
            minLength: 5
        },
        designation: {
            type: "string",
            minLength: 2
        },
        active: {
            type: "boolean"
        }, 
        company_id: {
            type: "string",
            minLength: 36
        }

    },
    minProperties: 1

}


const userStatusSchema = {
    additionalProperties: false,
    id: "/userStatusSchema",
    type: "object",
    properties: {
        active: {
            type: "boolean"
        }
    },
    required: ["active"]
}


const updateUserCompanySchema = {
    additionalProperties: false,
    id: "/updateUserCompanySchema",
    type: "object",
    properties: {
        company_id: {
            type: "string",
            minLength: 36
        }
    },
    required: ["company_id"]
}

module.exports = {
    createUserSchema: createUserSchema,
    updateUserSchema: updateUserSchema,
    updateUserCompanySchema: updateUserCompanySchema,
    userStatusSchema: userStatusSchema
}