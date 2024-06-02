export class OperationResult<T> {
    constructor(
        public success: boolean,
        public errorCode: number,
        public message: string,
        public stackTrace: string,
        public result: T | undefined | null,
    ) { }
}