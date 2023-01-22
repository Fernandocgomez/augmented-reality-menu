export interface ILoginFailureResponse {
    statusCode: number;
    message: string[];
    error: string;
    path: string;
    method: string;
}