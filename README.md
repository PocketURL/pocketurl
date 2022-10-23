# Pocketurl

The URL shortner

## Getting Started

To setup the project for local development follow these steps:

1. Clone the github repo
   ```bash
   git clone git@github.com:PocketURL/pocketurl.git
   ```
2. The recommended package manager is [pnpm](https://pnpm.io), to setup pnpm locally visit the installation documentation [here](https://pnpm.io/installation).
3. Installing the project dependencies
   ```bash
   cd pocketurl
   pnpm install
   ```
   - This will install all the dependcies required for the project.
   - This will also run the `prisma generate` command to generate types for the prisma schema.
4. Before running the project we need to get the required environment variables as specified in [`.env.example`](./.env.example) file.
   - **NEXTAUTH_SECRET**: for this run the following command to get an encrypted random string, set the env variable to the output of this commmand.
     ```bash
     openssl rand -base64 32
     ```
   - **NEXTAUTH_URL**: for local development, set this to `http://localhost:3000`, the same as nextjs default hosting url.
     - In case you're using a custom port to serve the NextJS project, use the url according to that port.
     - More information, [here](https://next-auth.js.org/configuration/options#nextauth_url).
   - **REDIS_URL**: this is required for future use, set this to a local redis instance, or create a new redis instance on `render.com` (recommended), and set this to the `External Redis URL` of the redis instance.
   - **GOOGLE_CLIENT_ID** & **GOOGLE_CLIENT_SECRET**: To get these secrets, create a new project on google cloud console, and enable the oauth using google following these steps.
     - Set the _Authorized redirect URIs_ to: `http://localhost:3000/api/auth/callback/google`
   - **DATABASE_URL**: Create a new database on [supabase](https://supabase.com) (recommended), and set it to the connection string (URI one), from the database section in the settings page.
     - The app right now uses, sqlite database, will be soon replaced to use PostgreSQL. (#23)
5. After assigning all the environment variables in the `.env` file, run the project in development mode using the follow command:
   ```bash
   pnpm dev
   ```

If you have any kind of errors following the above documentation, kindly open a github issue from [here](https://bit.ly/3VMYtyp), we'll help you out.

---

If you find any issues with the documentation kindly open an issue [here](https://bit.ly/3VMYtyp). Make sure to join our [discord server](https://discord.gg/hQTFbaCj) for any further discussions or help.

If you're looking to collaborate into this project, kindly read the [CODE_OF_CONDUCT](./CODE_OF_CONDUCT.md) & [Contributing Guidelines](./CONTRIBUTING.md) before doing so. Any spam issues or pull requests aren't tolerated.
