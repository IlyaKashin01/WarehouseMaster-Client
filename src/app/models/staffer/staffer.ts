export class StafferRequest {
    constructor(
        public FirstName: string,
        public LastName: string,
        public MiddleName: string,
        public Email: string,
        public Birthday: Date,
        public Role: string,
        public Post: string,
        public Salary: number,
        public WarehouseId: number
    ){}
}

export class StafferResponse {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public middleName: string,
        public email: string,
        public birthday: Date,
        public role: string,
        public post: string,
        public salary: number
    ){}
}