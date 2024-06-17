import { ProviderResponse } from "../provider/provider";
import { StafferResponse } from "../staffer/staffer";

export class ProductResponse {
    constructor(
        public id:number,
        public name:string,
        public description:string,
        public cost:number,
        public count:number,
        public qrCode:string,
        public provider:ProviderResponse,
        public staffer: StafferResponse,
        public createdDate: Date
    ){}
}