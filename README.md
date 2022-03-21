# Efund - Money Channel API

The API allows:

`Description` | `HTTP Method` | `Endpoint` | `Request Body`

- account creation | `POST` | `api/accounts/add` | {`username`: string}
  
- account funding | `PATCH` | `api/accounts/fund` | {`amount`: number, `id`: number}
  
- fund withdrawals | `PATCH` | `api/accounts/withdraw` | {`amount`: number, `id`: number}
  
- fund transfer | `PATCH` | `api/accounts/transfer` | {`amount`: number, `from`: number, `to`: number}
  
- accounts listing | `GET` | `api/accounts` | {}

N.B: `PATCH` requests requires secret in the authorization header.

When an account is created a secret is returned. This should be added to the request header to complete certain requests as described above.

N.B: Secret is `secret`.

Account IDs are used to identify accounts; just like account numbers, it will be used for transfers etc.

## Development

- install node version 14+
- install app dependencies - `npm i`
- create a database named `efunds` with MySQL
- start the database server/daemon
- run script - `npm dev`
- send requests to API endpoints

Hint: PostMan, RestClient etc can be used to test these API endpoints. Also, PNPM can be used instead of NPM or Yarn.

N.B: RestClient and PNPM was used during development. These are optional. RestClient is a VS Code extension that can be used to send HTTP requests like Postman etc.
