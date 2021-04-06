import jwtAuthz from 'express-jwt-authz';

export default (permissions: Array<string>) => jwtAuthz(permissions, {
  customScopeKey: 'permissions',
  checkAllScopes: true,
});
