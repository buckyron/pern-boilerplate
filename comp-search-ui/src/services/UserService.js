import CONSTANTS from "../constants/constant";

export async function getAllUsers() {
    const response = await fetch('/api/user/users');
    const res_json = await response.json();
    let data = [];
    if ( res_json.status === CONSTANTS.RESPONSE.STATUS.SUCCESS ){
        data = res_json.result;
        data.forEach(element => {
            if(element && element.active !== undefined && element.active === true ){
                element.active = "Active";
            } else {
                element.active = "Inactive";
            }
        });
        
    }
    return data;
}

export async function getUsersByCompany(company_id, page, size) {
    page = page ? page : 0;
    size = size && size > 0 ? size : 5;
    const response = await fetch(`/api/user/company/${company_id}?`+ new URLSearchParams({
        page: page,
        size: size
    }));
    const res_json = await response.json();
    let data = [];
    if ( res_json.status === CONSTANTS.RESPONSE.STATUS.SUCCESS ){
        data = res_json.result;
        
    }
    return data;
}

export async function getUsersById(user_id) {
    const response = await fetch(`/api/user/${user_id}`);
    const res_json = await response.json();
    let data = [];
    if ( res_json.status === CONSTANTS.RESPONSE.STATUS.SUCCESS ){
        data = res_json.result;
    } else{
        alert(res_json.message);
    }
    return data;
}
export async function createUser(data) {
    const json_data = {}
    for (const prop in data) {
        if ( data[prop] && data[prop] !== "" && prop !== "user_id")
            json_data[prop] = data[prop];
    }
    const response = await fetch(`/api/user`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(json_data)
    })
    const res_json = await response.json();
    if ( res_json.status === CONSTANTS.RESPONSE.STATUS.SUCCESS ){
        alert(res_json.message);
    } else{
        alert(res_json.message);
    }
    return res_json;
}

export async function deleteUser(userId) {
    const response = await fetch(`/api/user/${userId}`, {method: 'DELETE'})
    return await response.json();
}

export async function editUser(userId, data) {
    const json_data = {}
    for (const prop in data) {
        if ( data[prop] && data[prop] !== "" && prop !== "user_id")
            json_data[prop] = data[prop];
    }
    const response = await fetch(`/api/user/${userId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(json_data)
    })
    const res_json = await response.json();
    if ( res_json.status === CONSTANTS.RESPONSE.STATUS.SUCCESS ){
        alert(res_json.message);
    } else{
        alert(res_json.message);
    }
    return res_json;
}
