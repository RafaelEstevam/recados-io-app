const userName = 'cypress';
const boardName = new Date().getTime();
const url = 'https://recados-io.netlify.app';

function Login(){
  cy.visit(url);
  cy.get('input[name="userName"]').type(userName);
  cy.get('input[name="channelName"]').type(boardName);
  cy.get('input[name="isAnonymous"]').check();
  cy.get('button[type="submit"]').click();
  cy.wait(3000);
}

function AddingMessage(type){
  cy.get('#button-modal').click();
  cy.get('select[name="messageType"]').select(type);
  cy.get('textarea[name="message"]').type('Essa é uma mensagem teste escrita por Cypress');
  cy.get('#sendGPTbutton').click();
  cy.get('#acceptDefaultbutton').click();
}

function RemovingLast(){
  const lastMessage = cy.get('.message').last().then((element) => {
    cy.wrap(element).find('.button').then((button) => {
      cy.wrap(button).invoke('attr', 'id').then((id) => {
        button.click();
      })
    })
  });
}

function Filtering(buttonId, length){
  cy.get(buttonId).click();
  cy.wait(3000);

  cy.get('.message').then(elements => {
    expect(elements).to.have.length(length);
  });
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

    AddingMessage('not-important');
    
    cy.contains('Essa é uma mensagem teste escrita por Cypress').should('exist');

    cy.wait(3000);
  });

  it('Adding a message on Board with name', () => {
    Login();

    cy.get('#button-modal').click();
    cy.get('select[name="messageType"]').select('not-important');
    cy.get('textarea[name="message"]').type('Essa é uma mensagem identificada Cypress');

    cy.get('input[type="checkbox"]').click();
    cy.get('#sendGPTbutton').click();
    cy.get('#acceptDefaultbutton').click();

    cy.wait(3000);

    const lastMessage = cy.get('.message').last().then((element) => {
      cy.wrap(element).find('.message__info').then((info) => {
        cy.wrap(info).contains('cypress')
      })
    });

  });

  it('Wating for GPT response and Add IA response', () => {
    Login();

    cy.get('#button-modal').click();
    cy.get('select[name="messageType"]').select('not-important');
    cy.get('textarea[name="message"]').type('Ess e um mensage test escrita por Cypress');
    cy.get('#sendGPTbutton').click();
    cy.wait(5000);

    cy.contains('Corrigido com IA:').should('exist');
    cy.get('#acceptGPTbutton').click();

    cy.wait(3000);
  });
  
  it('Select the last message and removing it', () => {
    Login();
    RemovingLast();
    cy.wait(3000);
  });

  it('Doing filter by button', () => {
    Login();

    AddingMessage('urgent');
    AddingMessage('important');

    cy.wait(1000);
    Filtering('#button-important', 1);

    cy.wait(1000);
    Filtering('#button-urgent', 1);

    cy.wait(1000);
    Filtering('#button-not-important', 2);

    cy.wait(3000);
    Filtering('#button-undefined', 4);

    cy.wait(3000);
  })
});