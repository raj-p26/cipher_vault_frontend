# CipherVault

CipherVault is a simple password manager built with React with TypeScript as frontend and Express with TypeScript and SQLite as backend.

The purpose of this project is simple: Provide a minimal UI for handling passwords.

For now, CipherVault has these features:

- User authentication.
- Password generator.
- Password creation, updation, deletion and listing.
- Pinning and unpinning a credential record.
- Filtering records based on credentials types.
- Light/Dark mode.

## Getting Started

- Clone this repository in your local machine:

```sh
git clone <frontend-repo-url>
```

- Install necessary dependencies:

```sh
bun install # or npm install
```

- Set environment variable:

```sh
VITE_BASE_URL=http://localhost:8080/ # or any other url that you want to use.
```

- Run the project in development mode using:

```sh
npm run dev # or bun --bun run dev
```
