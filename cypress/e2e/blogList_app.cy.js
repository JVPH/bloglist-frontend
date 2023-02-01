describe('BlogList app', function () {
  it('front page can be opened', function () {
    cy.visit('')
    cy.contains('Blogs')
    cy.contains('Copyright © 2023 - All right reserved by ACME Industries Ltd')
  })
})