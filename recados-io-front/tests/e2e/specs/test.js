// https://docs.cypress.io/api/table-of-contents

const boardName = 'meu-mural';

function Login(){
  cy.visit('https://recados-io.netlify.app');
  cy.contains('h1', 'Recados.IO');
  cy.get('input[name="userName"]').type('rafael');
  cy.get('input[name="channelName"]').type(boardName);
  cy.get('input[name="isAnonymous"]').check();
  cy.get('button[type="submit"]').click();
  cy.url().should('include', boardName);
}

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('https://recados-io.netlify.app');
    cy.contains('h1', 'Recados.IO');
  });

  it('Doing login on application', () => {
    Login();
  });

  it('Adding message on Board', () => {
    Login();
    cy.get('#button-modal').click();
    cy.get('select[name="messageType"]').select('not-important');
    cy.get('textarea[name="message"]').type('Essa é uma mensagem teste escrita por Cypress');
    cy.get('#sendGPTbutton').click();
    // cy.get('#sendGPTbutton').click();

    // cy.intercept('POST', `${Cypress.env('VUE_APP_OPEN_AI_KEY')}/data`).as('getData');

    // cy.wait('@getData').then(({ response }) => {
    //   // expect(response.statusCode).to.equal(200);
    //   // Additional assertions on the response data if needed
    // });
  });
})
