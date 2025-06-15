import { ProductResponse } from "../product/product";
import { StafferResponse } from "../staffer/staffer";

export class EntranceRequest {
    constructor(
        public WarehouseId:number,
        public ProductId:number,
        public Quantity:number,
        public EntranceDate: Date,
        public StafferId:number
    ){}
}

export class EntranceResponse {
    constructor (
        public id:number,
        public warehouseId:number,
        public product:ProductResponse,
        public entranceDate:Date,
        public staffer:StafferResponse,
        public status:boolean,
        public acceptDate:Date
    ){}
}
export class EntranceShortResponse {
    constructor (
        public id:number,
        public warehouseId:number,
        public entranceDate:Date,
        public status:boolean,
        public acceptDate:Date
    ){}
}
