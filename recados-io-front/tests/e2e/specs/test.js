// https://docs.cypress.io/api/table-of-contents

const boardName = 'meu-mural';
const url = 'http://localhost:8080';

function Login(){
  cy.visit(url);
  cy.get('input[name="userName"]').type('rafael');
  cy.get('input[name="channelName"]').type(boardName);
  cy.get('input[name="isAnonymous"]').check();
  cy.get('button[type="submit"]').click();
  cy.wait(3000);
}

describe('Main flow of application', () => {
  it('Visits the app root url', () => {
    cy.visit(url);
    cy.contains('h1', 'Recados.IO');
  });

  it('Doing login on application', () => {
    Login();
    cy.url().should('include', boardName);
    cy.wait(3000);
  });

  it('Adding message on Board', () => {
    Login();

    cy.get('#button-modal').click();
    cy.get('select[name="messageType"]').select('not-important');
    cy.get('textarea[name="message"]').type('Essa é uma mensagem teste escrita por Cypress');
    cy.get('#sendGPTbutton').click();
    cy.get('#acceptDefaultbutton').click();
    
    cy.contains('Essa é uma mensagem teste escrita por Cypress').should('exist');

    cy.wait(3000);
  });

  it('Wating for GPT response and Add IA response', () => {
    Login();

    cy.get('#button-modal').click();
    cy.get('select[name="messageType"]').select('not-important');
    cy.get('textarea[name="message"]').type('Ess e um mensage test escrita por Cipress');
    cy.get('#sendGPTbutton').click();
    cy.wait(5000);

    cy.contains('Corrigido com IA:').should('exist');
    cy.get('#acceptGPTbutton').click();

    cy.wait(3000);
  });
  
  it('Select the last message and removing it', () => {
    Login();

    const lastMessage = cy.get('.message').last().then((element) => {
      cy.wrap(element).find('.button').then((button) => {
        cy.wrap(button).invoke('attr', 'id').then((id) => {
          button.click();
          cy.get(`#${id}`).should('not.exist');
        })
      })
    });

  });
});