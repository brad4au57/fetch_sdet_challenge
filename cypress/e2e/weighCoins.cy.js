/// <reference types="cypress"/>

import '../support/e2e';

describe('Coin Weighing Coding Challenge Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Find The Fake Gold Coin', () => {
    cy.get('div.coins button').then(($coins) => {
      const coinText = [];
      let numOfWeighings = 0;
      let finalAlert = '';
      const weighingsArray = [];

      // Helper function to split the coin array into three parts
      const splitCoinArray = (arr) => {
        const half = Math.floor(arr.length / 2);
        const firstHalf = arr.slice(0, half);
        const secondHalf = arr.slice(half, half * 2);
        const remainder = arr.slice(half * 2);
        return { firstHalf, secondHalf, remainder };
      };

      // Helper function to input coins into the bowls
      const inputSplitCoins = (set1, set2) => {
        set1.forEach((num, i) => {
          cy.get(`#left_${i}`).type(num);
        });
        set2.forEach((num, i) => {
          cy.get(`#right_${i}`).type(num);
        });
        cy.contains('button#weigh', 'Weigh').click();
      };

      // Helper function to capture weighings
      const captureWeighings = () => {
        cy.contains('div', 'Weighings')
          .siblings('ol')
          .within(($weighList) => {
            $weighList.children('li').each((index, li) => {
              weighingsArray.push(li.innerText);
            });
          });
      };

      // Helper function to output final alert, number of weighings, and weighing list
      const outputFinal = (alert, numOfWeighings, weighingList) => {
        // Output to Cypress Test Runner
        cy.log(`Alert Msg Provided: "${alert}", 
          Number Of Weighings: ${numOfWeighings}, 
          Weighings List: ${weighingList}`);
        // Output to Console
        console.log(`Alert Msg Provided: "${alert}", 
          Number Of Weighings: ${numOfWeighings},
          Weighings List: ${weighingList}`);
      };

      // Helper function to check the weighing result
      const checkWeighingResult = (firstHalf, secondHalf, remainder) => {
        cy.get('div.result button').then(($resultBtn) => {
          const weighResult = $resultBtn[0].innerText;

          if (weighResult === '?') {
            cy.log('Waiting for result...');
            cy.wait(500).then(() =>
              checkWeighingResult(firstHalf, secondHalf, remainder)
            );
          } else {
            numOfWeighings++;
            cy.contains('button#reset', 'Reset').click();

            switch (weighResult) {
              case '>':
                if (secondHalf.length > 1) {
                  const {
                    firstHalf: newFirstHalf,
                    secondHalf: newSecondHalf,
                    remainder: newRemainder,
                  } = splitCoinArray(secondHalf);
                  inputSplitCoins(newFirstHalf, newSecondHalf);
                  checkWeighingResult(
                    newFirstHalf,
                    newSecondHalf,
                    newRemainder
                  );
                } else {
                  cy.get(`button#coin_${secondHalf[0]}`).click();
                  cy.on('window:alert', (str) => {
                    expect(str).to.equal('Yay! You find it!');
                    finalAlert = str;
                  })
                    .then(() => {
                      captureWeighings();
                    })
                    .then(() => {
                      outputFinal(finalAlert, numOfWeighings, weighingsArray);
                    });
                }
                break;
              case '<':
                if (firstHalf.length > 1) {
                  const {
                    firstHalf: newFirstHalf,
                    secondHalf: newSecondHalf,
                    remainder: newRemainder,
                  } = splitCoinArray(firstHalf);
                  inputSplitCoins(newFirstHalf, newSecondHalf);
                  checkWeighingResult(
                    newFirstHalf,
                    newSecondHalf,
                    newRemainder
                  );
                } else {
                  cy.get(`button#coin_${firstHalf[0]}`).click();
                  cy.on('window:alert', (str) => {
                    expect(str).to.equal('Yay! You find it!');
                    finalAlert = str;
                  })
                    .then(() => {
                      captureWeighings();
                    })
                    .then(() => {
                      outputFinal(finalAlert, numOfWeighings, weighingsArray);
                    });
                }
                break;
              case '=':
                cy.get(`button#coin_${remainder[0]}`).click();
                cy.on('window:alert', (str) => {
                  expect(str).to.equal('Yay! You find it!');
                  finalAlert = str;
                })
                  .then(() => {
                    captureWeighings();
                  })
                  .then(() => {
                    outputFinal(finalAlert, numOfWeighings, weighingsArray);
                  });
                break;
              default:
                break;
            }
          }
        });
      };

      // Populate coinText array with the button texts
      $coins.each((index, button) => {
        coinText.push(button.innerText);
      });

      // Sort the array from lowest to highest
      coinText.sort((a, b) => a - b);

      // Split the array for weighing
      const { firstHalf, secondHalf, remainder } = splitCoinArray(coinText);

      // Input coins into the bowls and check the weighing result
      inputSplitCoins(firstHalf, secondHalf);
      checkWeighingResult(firstHalf, secondHalf, remainder);
    });
  });
});
