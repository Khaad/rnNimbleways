# Weather App with Mockoon

This project aims to create a simple weather application that utilizes the Mockoon tool to simulate a local weather server. 

## Features

- Fetch weather data from the local mock server every hour (`"timestep": "1h"`)
- Display data in a list with the following information:
  - Wind speed
  - Temperature
  - Feels like temperature
- "Pull to refresh" functionality to update data
- Error handling
- Unit tests

## Running the Application

1. Clone the repository:
    ```bash
    git clone https://github.com/Khaad/rnNimbleways.git
    cd rnNimbleways
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the Mockoon mock server:
    ```bash
    download Mockoon and use ./mockoon/weather_mockoon (5).json environment
    ```

4. Run the application:
    ```bash
    npx react-native run-android
    ```

5. Current weather data will be displayed in a list.
6. Pull down on the list to refresh the data.
7. In case of errors, an error message will be displayed.

## Unit Tests

Unit tests are included in the project to ensure the application functions correctly. To run the unit tests:
    ```bash
    npm test
    ```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
