import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ErrorModel } from '../models/error.model';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  public handleError(error: ErrorModel | TypeError): void {
    // const logger = this.injector.get(LoggingService);
    // const notification = this.injector.get(NotificationService);

    if (error instanceof TypeError) {
      if (environment.name === 'local' || environment.name === 'staging') {
        const errorMessage = 'Type error on front end. Open console for more info.';
        // notification.showError(errorMessage, { duration: 5000 });
      }

      // logger.logError(error.message);
      throw error;
    }

    if (error instanceof ErrorModel && error.generalMessage) {
      // notification.showError(error.generalMessage);
    }
  }
}
