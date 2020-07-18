import axios from 'axios';

class Manager {
    constructor() {
        this.baseUrl = `${process.env.REACT_APP_SERVER_URL}/platforms`;
    }

    search() {
        return axios({
            method: 'get',
            url: `${this.baseUrl}`
        })
    }

    create(data) {
        return axios({
            method: 'post',
            url: `${this.baseUrl}/create`,
            data
        });
    }

    update(data, id) {
        return axios({
            method: 'put',
            url: `${this.baseUrl}/edit/${id}`,
            data
        });
    }

    delete(id) {
        return axios({
            method: 'delete',
            url: `${this.baseUrl}/delete/${id}`,
        });
    }
}


export default new Manager();