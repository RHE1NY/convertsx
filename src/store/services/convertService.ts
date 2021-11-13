import axios from "axios";
import {IData} from "../../types/types";

class ConvertService {

    getAllCurrencies = (info: string) => {
        return axios.get<IData>(`http://api.exchangeratesapi.io/v1/latest?access_key=8c96993af73a5fadaa9832458d1235a9`)
    }
}

export const convertService = new ConvertService();
