# ORD-517 — White-box Auth Middleware

Run from `edu-learn-project/backend`:

```sh
npm run test:ord517:coverage
```

The tests load the real `middleware.js` file. Only `getDatabase()` is replaced with an in-memory stub, so they do not read or modify the project's SQLite database. The JWT secret is test-only.

| Function | Conditions and outcomes exercised |
| --- | --- |
| `requireRole` | User missing; user present with excluded role; user present with included role. These cover both truth values of `!req.user` and `roles.includes(req.user.role)` where evaluation is possible. |
| `authenticateToken` | Token missing; token invalid; token valid. |
| `checkUserStatus` | User ID missing; account deleted; account blocked; active account; database failure. |
| Module startup | `JWT_SECRET` missing and present. |

On the backend at commit `22f7fc1`, all 12 tests pass. Node.js v24's coverage report for `middleware.js` shows 100% line, branch and function coverage. This is coverage of this middleware file in an isolated test, **not** coverage of the entire backend or an HTTP integration test. The conditions for token validity and account status belong to `authenticateToken` and `checkUserStatus`, respectively; `requireRole` checks only user presence and role membership.
