import { ProductResponse } from "../product/product";
import { StafferResponse } from "../staffer/staffer";

export class ShipmentRequest {
    constructor(
        public WarehouseId:number,
        public ProductId:number,
        public Quantity:number,
        public ShipmentDate: Date,
        public StafferId:number
    ){}
}

export class ShipmentResponse {
    constructor (
        public id:number,
        public warehouseId:number,
        public product:ProductResponse,
        public shipmentDate:Date,
        public staffer:StafferResponse,
        public status:boolean,
        public acceptDate:Date
    ){}
}