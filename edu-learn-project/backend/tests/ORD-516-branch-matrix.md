# ORD-516 — Registration white-box scenarios

Run from `edu-learn-project/backend`:

```sh
npm run test:ord516
```

The test parses the current `index.js` and executes its actual registration helper functions and `POST /api/auth/register` handler in isolation. Database reads/writes and password hashing are stubbed. No project database or user account is changed.

| Decision | Cases exercised |
| --- | --- |
| Input type and required fields | Missing body, non-string phone, blank name, valid fields |
| Email format | Invalid and valid |
| Phone format | Eleven digits rejected; ten digits accepted |
| Password strength | Weak and strong |
| Existing email | None; existing USER; active STAFF; blocked AFFILIATE; blocked STAFF replacement |
| Existing phone | None and already registered |
| Database failure | Error becomes HTTP 500 |

All 13 scenarios passed against backend commit `22f7fc1`. These are repeatable **white-box branch scenarios**, not a measured 100% branch-coverage report for `index.js`; the handler runs in an isolated VM, which Node.js's coverage command does not attribute to the original `index.js` file. ORD-516 should not be marked Done solely from this result.
