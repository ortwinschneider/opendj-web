import { KeycloakService } from 'keycloak-angular';
import { EnvService } from '../provider/env.service';

export function initializer(keycloak: KeycloakService, envService: EnvService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {

      const keycloakConfig = {
        url: envService.ssoURL,
        realm: envService.ssoRealm,
        clientId: envService.ssoClientId,
        credentials: {
          secret: envService.ssoClientCredentials
        }
      };

      try {
        await keycloak.init({
          config: keycloakConfig,
          initOptions: {
            // onLoad: 'login-required',
            checkLoginIframe: false
          },
          enableBearerInterceptor: true,
          bearerExcludedUrls: ['/login']
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}
