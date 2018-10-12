interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: '09JxuHmJ5JNHRE4YzyoQn4OLb5qtlwGH',
  domain: 'indoo.auth0.com',
  callbackURL: 'http://localhost:4200/callback'
};
