describe('BlogList app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'John Doe',
      username: 'JohnDoe2000',
      password: 'password'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
  })

  it('front page can be opened', function () {
    cy.contains('Blogs')
    cy.contains('Copyright © 2023 - All right reserved by ACME Industries Ltd')
  })

  describe('Login', function () {

    it('succeeds with correct credentials', function () {
      cy.login({ username: 'JohnDoe2000', password: 'password' })
    })

    it('fails with wrong credentials', function () {
      cy.get('[data-cy="username"]').type('JohnDoe2000')
      cy.get('[data-cy="password"]').type('wrong')
      cy.get('[data-cy="login-btn"]').click()

      cy.get('.alert-error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'background-color', 'rgb(248, 114, 114)')

      cy.get('html').should('not.contain', 'John Doe logged in')
    })
  })
})