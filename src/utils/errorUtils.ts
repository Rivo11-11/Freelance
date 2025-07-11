class CustomError extends Error {
    constructor(message: string, public code: number) {
        super(message);
        this.name = this.constructor.name;
    }
}

export default CustomError;