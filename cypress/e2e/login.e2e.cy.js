/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when username is empty
 *   - should display alert when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */
describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });
  it('should display login page correctly', () => {
    cy.get('input[placeholder="Enter your email"]').should('be.visible');
    cy.get('input[placeholder="Enter your password"]').should('be.visible');
    cy.get('button')
      .contains(/^Continue$/)
      .should('be.visible');
  });
  it('should display alert when email is empty', () => {
    cy.get('input[placeholder="Enter your password"]').type('password');
    cy.get('button')
      .contains(/^Continue$/)
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Email is required');
    });
  });
  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Enter your email"]').type('user@example.com');
    cy.get('button')
      .contains(/^Continue$/)
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Password is required');
    });
  });
  it('should display alert when email and password are wrong', () => {
    cy.get('input[placeholder="Enter your email"]').type('user@example.com');
    cy.get('input[placeholder="Enter your password"]').type('wrongpassword');
    cy.get('button')
      .contains(/^Continue$/)
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Invalid email or password');
    });
  });
  it('should display homepage when email and password are correct', () => {
    cy.get('input[placeholder="Enter your email"]').type('hai1@gmail.com');
    cy.get('input[placeholder="Enter your password"]').type('12345678');
    cy.get('button')
      .contains(/^Continue$/)
      .click();
    cy.url().should('include', '/');
  });
});
