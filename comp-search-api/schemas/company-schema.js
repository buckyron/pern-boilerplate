const creatCompanySchema = {
    additionalProperties: false,
    id: "/createCompany",
    type: "object",
    properties: {
      company_name: {
          type: "string",
          minLength: 1
        },
      address: {
          type: "string",
          minLength: 5
        }
    },
   required: ["company_name", "address"]
  };


const updateCompanySchema = {
    additionalProperties: false,
    id: "/updateCompany",
    type: "object",
    properties: {
        company_name: {
            type: "string",
            minLength: 1
          },
        address: {
            type: "string",
            minLength: 5
          }
    },
    minProperties: 1
}

module.exports = {
    creatCompanySchema: creatCompanySchema,
    updateCompanySchema: updateCompanySchema
}
