import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpExceptionResponseInterface } from '../interfaces';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = exception.getStatus();
		const errorName = exception.name;
		const message = exception.getResponse().message;

		const httpExceptionResponse: HttpExceptionResponseInterface = {
			statusCode: status,
			message: Array.isArray(message) ? message : [message],
			error: errorName,
			path: request.url,
			method: request.method
		}

		response.status(status).json(httpExceptionResponse);
	}
}