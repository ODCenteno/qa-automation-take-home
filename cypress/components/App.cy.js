import React from 'react';
import 'cypress-react-app-actions';

import App from '../../src/App';
import notes from '../fixtures/data.json';

describe('<App />', () => {
  beforeEach(() => {
    cy.mount(<App />);
  });

  it('should render the App component', () => {
    cy.get('.app-container').should('exist');
    cy.get('.app-container h2').should('have.text', 'QA Automation Cypress Test');
  });
  
  it('should `notes` load without entries', () => {
    cy.get('.list-container ul').children().should('have.length', 0);
    cy.get('.app-container').as('app')
    cy.get('@app').getComponent().its('state').should('be.an', 'array');
    cy.get('@app').getComponent().its('state[1]').should('be.empty')
  });

  it('should add a note to the list', () => {
    cy.get('#text-input').as('input');
    cy.get('@input').should('have.text', '');
    cy.get('@input').type(notes[0]['message']);
    cy.get('@input').should('have.value', notes[0]['message']);
    cy.get('button').click();
    cy.get('.list-container ul').children().should('have.length', 1);
    cy.get('.app-container').getComponent().its('state').should('have.length', 2);
    cy.get('.app-container').getComponent().its('state[0]').should('be.eql', notes[0]['message']);
  });

  it('should delete the note from the list', () => {
    cy.then(() => {
      for (let note of notes) {
        cy.addNote(note);
      }
    })

    cy.get('.note-container > button').as('deleteBtn')
    cy.get('.list-container ul').as('notesList')

    cy.get('@notesList').children().should('have.length', 3);
    cy.get('@deleteBtn').first().click();
    cy.get('@notesList').children().should('have.length', 2);
  })
});