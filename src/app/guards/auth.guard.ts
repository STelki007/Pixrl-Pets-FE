import { AuthGuardData, createAuthGuard } from 'keycloak-angular';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { inject } from '@angular/core';
import Keycloak from 'keycloak-js';

const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  __: RouterStateSnapshot,
  authData: AuthGuardData
): Promise<boolean | UrlTree> => {
  const { authenticated, grantedRoles } = authData;

  const keycloak = inject(Keycloak);
  if (!keycloak.authenticated) {
    keycloak.login();
  }

  return true;
};

export const canActivateAuthRole =
  createAuthGuard<CanActivateFn>(isAccessAllowed);
