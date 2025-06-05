export class BackendUrlService {
  private static backendUrl = 'http://localhost:8081';

  static getBackendUrl (): string {
    return this.backendUrl;
  }

}
