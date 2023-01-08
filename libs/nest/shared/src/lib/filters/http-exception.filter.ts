import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionResponseInterface } from '@xreats/shared-models';
import { Request, Response } from 'express';

@Catch(HttpException)
class HttpExceptionFilter implements ExceptionFilter {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = exception.getStatus();
		const errorName = exception.name;
		const exceptionResponse = exception.getResponse();
		let message;

		if(typeof exceptionResponse === 'string') {
			message = exceptionResponse;
		};

		if(typeof exceptionResponse === 'object') {
			message = exceptionResponse.message;
		};

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

export const GlobalHttpExceptionFilter = {
	provide: APP_FILTER,
	useClass: HttpExceptionFilter
}
