# Fetch SDET Challenge

This repository contains a test script written in Cypress to find the fake gold coin from a set of coins. Follow the instructions below to set up and run the test.

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)

## Getting Started

### 1. Clone the Repository

Clone the repository from GitHub to your local machine using the following command:

```bash
git clone https://github.com/brad4au57/fetch_sdet_challenge.git
```

### 2. Navigate to the Project Directory

Change to the project directory:

```bash
cd fetch_sdet_challenge
```

### 3. Install npm Dependencies

Install all the required npm dependencies by running:

```bash
npm install
```

### 4. Run the Tests

To execute the test script provided, run:

```bash
npm test
```

### 5. Open Cypress Test Runner (Optional)

If you want to use the Cypress Test Runner for a more interactive experience, you can run:

```bash
npx cypress open
```

This command will open the Cypress Test Runner where you can see the tests running in real-time and debug them more easily.

- Start by selecting "E2E Testing".
- Confirm that Chrome is the selected browser, then click "Start E2E Testing in Chrome".
- Once the automated browser is opened, click on the "weighCoins.cy.js" file to run the test.

## Directory Structure

- **`cypress/e2e`**: Contains the main test script `weighCoins.cy.js`.
- **`cypress.config.js`**: Configuration file for Cypress. You can adjust configuration options here.

## Modifying Tests

If you need to modify or add tests, you can edit the `weighCoins.cy.js` file or add new test files in the `cypress/e2e` directory.

## Cypress Configuration

Cypress configuration options can be adjusted in the `cypress.config.js` file located in the root of the project. Refer to the Cypress documentation for more configuration options.

## Helper Functions

- **`captureWeighings()`**: Captures the list of weighings from the `ol` element and logs it.
- **`outputFinal(alert, numOfWeighings, weighingList)`**: Logs the final alert message, number of weighings, and the list of weighings.
- **`splitCoinArray(arr)`**: Splits the coin array into three parts: first half, second half, and remainder.
- **`inputSplitCoins(set1, set2)`**: Inputs the coin numbers into the left and right bowls and clicks the "Weigh" button.
- **`checkWeighingResult(firstHalf, secondHalf, remainder)`**: Checks the result of the weighing, handles different cases, and recurses as needed.

## Troubleshooting

- If you encounter issues with npm or Cypress commands, make sure all prerequisites are installed correctly and you have the latest version of Node.js and npm.
- Check the Cypress documentation for common issues and troubleshooting steps.

## Contributing

If you want to contribute to this repository, please fork the repository and create a pull request with your changes. Ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
