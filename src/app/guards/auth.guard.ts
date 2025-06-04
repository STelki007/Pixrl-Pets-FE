import { AuthGuardData, createAuthGuard } from 'keycloak-angular';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { inject } from '@angular/core';
import Keycloak from 'keycloak-js';

/**
 * Empfohlene AuthGuard-Logik mit keycloak-angular.
 * Du kannst hier rollenbasierte Logik einbauen (siehe auskommentierten Block unten).
 */
const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  _: RouterStateSnapshot,
  authData: AuthGuardData
): Promise<boolean | UrlTree> => {
  const { authenticated, grantedRoles } = authData;

  // --- Rollenbasierte Prüfung (optional) ---
  // const requiredRole = route.data['role'];
  // if (!requiredRole) {
  //   return false;
  // }

  // const hasRequiredRole = (role: string): boolean =>
  //   Object.values(grantedRoles.resourceRoles).some((roles) => roles.includes(role));

  // if (authenticated && hasRequiredRole(requiredRole)) {
  //   return true;
  // }

  // --- Einfache Login-Prüfung ---
  const keycloak = inject(Keycloak);
  if (!authenticated) {
    keycloak.login();
    return false;
  }

  return true;
};

// Exportierter Guard, den du im Router verwendest:
export const canActivateAuthRole =
  createAuthGuard<CanActivateFn>(isAccessAllowed);
