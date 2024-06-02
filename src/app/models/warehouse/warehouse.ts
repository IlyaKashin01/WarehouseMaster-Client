export class WarehouseRequest {
    constructor(
        public Name: string,
        public Purpose: string,
        public Address: string,
        public Square: number,
        public CountEmployees: number,
        public CountTechnic: number,
        public Capacity: number,
        public Occupancy: number,
    ){}
}

export class WarehouseResponse {
    constructor(
        public id: number,
        public name: string,
        public purpose: string,
        public address: string,
        public square: number,
        public countEmployees: number,
        public countTechnic: number,
        public capacity: number,
        public occupancy: number,
    ){}
}   