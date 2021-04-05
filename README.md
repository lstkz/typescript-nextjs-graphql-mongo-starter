# typescript-nextjs-graphql-mongo-starter

Fullstack starter template.  
Stack:

- 100% Typescript
- Next.js
- React with context API only (no Redux)
- TailwindCSS
- Node.js
- Graphql
- Mongodb

## Starter features

- Example authorization login/register.
- Graphql subscriptions.
- Example todo list CRUD.

## Requirements

- node v14.16 https://nodejs.org/
- mongodb https://www.mongodb.com/

## Configuration

Create `.env` file under `api`.  
Example:

```
PORT=4000
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=app
```

Create `.env.local` file under `app`.
Example:

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Scripts

Under root directory:

- `yarn run generate` or `yarn run g` - generate grahpql files. Run `yarn run g --watch` for watch mode.
- `yarn run lint` - check lint errors.
- `yarn run tsc` - check tsc errors.

Under `api` directory:

- `yarn run dev` - run in dev mode.
- `yarn run start` - run in prod mode.

Under `app` directory:

- `yarn run dev` - run in dev mode.
- `yarn run build` - build app for prod mode.
- `yarn run start` - run in prod mode.

## Plop blueprints

install plop `npm i -g plop`

- `plop collection` - add a new mongodb collection to API
- `plop feature` - add a new feature to APP with a module based on the Context API.
- `plop feature2` - add a new feature to APP (simplified).
- `plop module` - add a new Context API module to APP.
- `plop resolver` - add a resolved to API.

## packages

- `context-api` - a simple helper for creating Context API modules.
- `mongodb2` - a wrapper for original `mongodb` packages with small improvements.

## License

MIT
