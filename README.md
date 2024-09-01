# Club Zone

A social platform for club management and event organization.

## TODO List

- [ ] Fix server signup errors (500 status code)
- [ ] Fix server login errors (500 status code)
- [ ] Implement user profile page
- [ ] Develop event management system

## Getting Started

1. Clone the repository:

   ```sh
   git clone https://github.com/dyrean/club-zone.git
   cd club-zone
   ```

2. Install dependencies:

   ```sh
   bun install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```env
   TURSO_CONNECTION_URL=your_turso_connection_url
   TURSO_AUTH_TOKEN=your_turso_auth_token
   ```

4. Run database migrations:

   ```sh
   bun db:push
   ```

5. Start the development server:

   ```sh
   bun dev
   ```

6. Open your browser and navigate to `http://localhost:3000`

## Features

- User authentication (signup, login, logout)
- Secure password hashing with Argon2id
- Database integration with Turso and Drizzle ORM
- Server-side input validation using Zod
- Responsive UI with Tailwind CSS and Shadcn UI components
- State management with Pinia
- Form handling with VeeValidate
- Toast notifications for user feedback

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a pull request

Please make sure to update tests as appropriate and adhere to the existing coding style.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
