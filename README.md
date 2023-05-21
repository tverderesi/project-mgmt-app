# Project Management App

This is a simple management app built for educational purposes using the MERN (MongoDB, Express, React, Node.js) stack and the GraphQL middleware. It serves as an educational project to demonstrate the implementation of a full-stack application using these technologies.

## Description

The Project Management App is designed to showcase the integration of MongoDB, Express, React, and Node.js along with GraphQL middleware. It provides functionality for managing projects, tasks, and users within a collaborative environment. The app demonstrates the use of GraphQL queries and mutations for efficient data retrieval and manipulation.

## Installation

To run the Project Management App locally, follow these steps:

1. Clone or download the repository to your local machine.

   ```
   git clone https://github.com/tverderesi/project-mgmt-app.git
   ```

2. Navigate to the project's root directory.

   ```
   cd project-mgmt-app
   ```

3. Install the dependencies for the server.

   ```
   npm install
   ```

4. Install the dependencies for the client.

   ```
   npm run clientinstall
   ```

## Usage

After completing the installation steps, you can use the following scripts to run the app:

- To start the server, use the following command:

  ```
  npm run server
  ```

  This will start the Node.js server using `nodemon` for automatic restarts on file changes.

- To start the client development server, use the following command:

  ```
  npm run client
  ```

  This will start the React development server for the client-side application.

- To run both the server and client concurrently, use the following command:

  ```
  npm run dev
  ```

  This will start both the server and client development servers concurrently using `concurrently`.

- To build the client for production, use the following command:

  ```
  npm run render-postbuild
  ```

  This will install the client dependencies and build the production-ready version of the client application.

## File Structure

The file structure of the Project Management App is as follows:

- `index.ts`: The main entry point of the server-side application.
- `client/`: Directory containing the client-side React application.
- `client/src/`: Directory containing the source code for the client application.
- `client/public/`: Directory containing the public assets for the client application.
- `graphql/`: Directory containing GraphQL schema and resolvers for the server.
- `models/`: Directory containing Mongoose models for MongoDB integration.
- `routes/`: Directory containing Express routes for API endpoints.
- `config/`: Directory containing configuration files.

## License

This project is licensed under the ISC License.
