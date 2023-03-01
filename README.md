# NextJS 13 with Supabase

This is a NextJS 13 project with experimental app dir using Supabase as backend and auth.

## Installation

To install this project, you need to have Node.js and npm installed on your machine.

Then run the following commands:

```
npm install
npm run dev
```

This will install all the dependencies and start the development server on http://localhost:3000

## Usage

To use this project, you need to create a Supabase account and get your API keys from https://app.supabase.io/

Then create a .env.local file in the root directory of the project and add the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url 
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```
Replace `your-supabase-url` and `your-supabase-anon-key` with your own values.

Now you can sign up and sign in with Supabase auth on your app.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.s
