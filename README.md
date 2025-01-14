# Polling Unit Results

This project is designed to display results for individual polling units in Delta State, Nigeria. It retrieves data from a database and presents it in a user-friendly web interface.

## Project Structure

- **src/**: Contains all source files for the application.
  - **index.html**: The main HTML page that displays polling unit results.
  - **styles/**: Contains CSS files for styling the application.
    - **styles.css**: The main stylesheet for the application.
  - **scripts/**: Contains JavaScript files for client-side functionality.
    - **app.js**: Handles data fetching and dynamic updates to the HTML page.
  - **server/**: Contains server-related files.
    - **server.js**: Sets up the Node.js server and handles requests.
    - **db/**: Contains database-related files.
      - **query.sql**: SQL query to retrieve polling unit results for LGAs in Delta State (state id: 25).

- **package.json**: Configuration file for npm, listing project dependencies.
- **.gitignore**: Specifies files and directories to be ignored by Git.
- **README.md**: Documentation for the project.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd polling-unit-results
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the server:
   ```
   node src/server/server.js
   ```

5. Open your web browser and go to `http://localhost:3000` to view the application.

## Usage

- The application will display the results for individual polling units in Delta State.
- Users can interact with the interface to view detailed results for specific polling units.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.