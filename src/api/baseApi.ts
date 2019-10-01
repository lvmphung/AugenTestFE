import { ApiMethod, BaseUrl } from '../constants/constants';
import Urls from '../constants/apiUrls';

export default class Base {
    protected Urls: any;
    protected ApiMethod: any;
    constructor() {
        this.Urls = Urls;
        this.ApiMethod = ApiMethod;
    }

    public async execute(url: string, method: string, data?: object) {
        const resp = await fetch(BaseUrl + url, {
            method: method,
            body: JSON.stringify(data)
        }).then(async(response) => {
            return response.json();
        }).then(async(data) => {
            console.log("Success");
            return data;
        }).catch(async(msg) => {
            console.log("Error: ", msg);
            return msg.message;
        });
        return resp;
    }

}