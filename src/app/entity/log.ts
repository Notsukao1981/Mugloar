export class Log {
    private status: string;
    private message: string;

    constructor(status: string, message: string) {
        this.status = status;
        this.message = message;
    }

    getStatus(): string {
        return this.status;
    }

    getMessage(): string {
        return this.message;
    }
}