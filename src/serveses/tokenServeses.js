const setUser = (data) => {
    let JsonUser = JSON.stringify(data.user);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JsonUser);
}

const getToken = () => {
    return localStorage.getItem('token')
}
const getUser = () => {
    let JsonUser = localStorage.getItem('user');
    return JSON.parse(JsonUser)
}

const removeUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

export {setUser, getToken, getUser, removeUser}