import CONSTANTS from "../constants/constant";

export async function getAllCompanies(page, size) {
    page = page ? page : 0;
    size = size && size > 0 ? size : 5;
    const response = await fetch(
        '/api/company/companies?' + new URLSearchParams({
            page: page,
            size: size
        })
        );
    const res_json = await response.json();
    let data = [];
    if ( res_json.status === CONSTANTS.RESPONSE.STATUS.SUCCESS && res_json.result !== undefined ){
        if (res_json.result) {
            data = res_json.result;
        }
    }
    return data;
}

export async function getCompanyByID(companyId) {
    const response = await fetch(`/api/company/${companyId}`);
    const res_json = await response.json();
    let data = {};
    if (res_json.status === CONSTANTS.RESPONSE.STATUS.SUCCESS){
        data = res_json.result;
    }
    return data;
}

export async function createCompany(data) {
    const response = await fetch(`/api/company`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    return await response.json();
}

export async function deleteCompany(companyId) {
    const response = await fetch(`/api/company/${companyId}`, {method: 'DELETE'})
    return await response.json();
}

export async function editCompany(companyId, data) {
    const response = await fetch(`/api/company/${companyId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    return await response.json();
}
