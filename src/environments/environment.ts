// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import {
  AccountService, AccountMockService,
  AuthService, AuthMockService,
  OptService, OptMockService,
  WebinarService, WebinarMockService
} from 'shared/service';

export const environment = {
  production: false,
  accountService: { provide: AccountService, useClass: AccountMockService },
  authService: { provide: AuthService, useClass: AuthMockService },
  optService: { provide: OptService, useClass: OptMockService },
  webinarService: { provide: WebinarService, useClass: WebinarMockService }
};
