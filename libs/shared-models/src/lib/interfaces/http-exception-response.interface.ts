export interface HttpExceptionResponseInterface {
    statusCode: number;
    message: string[];
    error: string;
    path: string;
    method: string;
}