import {create} from 'apisauce';

const apiClient = create({
    baseURL: 'http://192.168.199.13:8080/api'
});

export default apiClient;