# Contributing Guidelines

We invite collaboration and contribution in this project, in any form give that you respect the specified community gudelines. Please read the [CODE_OF_CONDUCT](./CODE_OF_CONDUCT.md) before contribution and make sure that your contribution follow the specified code or documentation [conventions](#conventions).

Join our [discord server](https://discord.gg/hQTFbaCj) for any help or discussions.

## Conventions

Here are some development conventions we follow in this project, make sure to give them a read before starting the development.

1. Instead of using `prisma migrate` command to update the database schema, we recommend using `prisma db push` for local development.
   - With pnpm the command will look like this:
     ```bash
     pnpm prisma db push
     ```
2. Instad of writing all the logic and markup of the entire page, break it down to components (if possible) to have clean code.
3. Adding documentation explaining every line is not recommended, only add comments above the code that is a bit different or complex for someone else to understand and is not intuitive.
4. If your changes require adding in a new environment varaible, make sure to update the `serverSchema` object to use it into the project with type safety.
5. Using environment variables directly in the client code is not recommended and in fact is useless so make sure you keep that in mind.
6. Any code that you put in the client-side code that make changes in the database, or transfers sensitive information, try to use trpc queries or mutation for them.
7. Do not open any pull requests directly in the `master` branch, use `dev` branch instead.
