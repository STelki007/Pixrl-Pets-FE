export interface KeycloakInterface {
  sub: string;
  name?: string;
  preferred_username?: string;
  email?: string;
  given_name?: string;
  family_name?: string;
  [key: string]: any;
}
