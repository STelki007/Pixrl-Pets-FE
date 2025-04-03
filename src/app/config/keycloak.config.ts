// import {
//   provideKeycloak,
//   createInterceptorCondition,
//   IncludeBearerTokenCondition,
//   INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
//   withAutoRefreshToken,
//   AutoRefreshTokenService,
//   UserActivityService,
// } from 'keycloak-angular';
//
// const backendApiRequestCondition =
//   createInterceptorCondition<IncludeBearerTokenCondition>({
//     urlPattern: /^(http:\/\/localhost:8081)(\/.*)?$/i,
//   });
//
//   // KEYCLOAK CONFIG
//   const KEYCLOAK_URL = 'http://localhost:9090';
//   const KEYCLOAK_REALM = 'LF12';
//   const KEYCLOAK_CLIENT_ID = "lf12";
//
// export const provideKeycloakAngular = () =>
//   provideKeycloak({
//     config: {
//       url: KEYCLOAK_URL,
//       realm: KEYCLOAK_REALM,
//       clientId: KEYCLOAK_CLIENT_ID,
//     },
//     initOptions: {
//       onLoad: 'check-sso',
//       checkLoginIframe: false,
//       silentCheckSsoRedirectUri:
//         window.location.origin + '/silent-check-sso.html',
//       redirectUri: window.location.origin + '/',
//
//     },
//
//     features: [
//       withAutoRefreshToken({
//         onInactivityTimeout: 'logout',
//         sessionTimeout: 60000,
//       }),
//     ],
//     providers: [
//       AutoRefreshTokenService,
//       UserActivityService,
//       {
//         provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
//         useValue: [backendApiRequestCondition],
//       },
//     ],
//   });
