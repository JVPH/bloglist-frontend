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

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'JohnDoe2000', password: 'password' })
    })

    it('a new blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('[data-cy="title-input"]').type('Cypress\'s Blog')
      cy.get('[data-cy="author-input"]').type('Cyp Ress')
      cy.get('[data-cy="url-input"]').type('docs.cypress.io')
      cy.contains('create').click()
      cy.contains('Cypress\'s Blog Cyp Ress')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'a', url: 'a.com' })
        cy.createBlog({ title: 'second blog', author: 'b', url: 'b.com' })
        cy.createBlog({ title: 'third blog', author: 'c', url: 'c.com' })
      })

      it('a blog can be liked', function () {
        cy.contains('first blog')
          .contains('view').click()
        cy.get('html')
          .contains('like').click()
        cy.get('[data-cy="likes-counter"]')
          .should('contain', '1')
      })

      it('a blog can be deleted by its creator', function () {
        cy.contains('first blog')
          .contains('view').click()
        cy.get('html')
          .contains('remove').click()

        cy.get('html').should('not.contain', 'first blog')
      })

      it.only('delete button is absent for non-creators.', function() {
        const user = {
          name: 'Jane Doe',
          username: 'JaneDoe2000',
          password: 'password'
        }
        cy.get('html').contains('logout').click()
        cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
        cy.login({ username: 'JaneDoe2000', password: 'password' })
        cy.contains('first blog')
          .contains('view').click()

        cy.get('[data-cy="detailed-view-blog"]').should('not.contain', 'remove')
      })
    })
  })
})