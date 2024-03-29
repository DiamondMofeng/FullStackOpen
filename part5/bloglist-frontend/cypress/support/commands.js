// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('addABlog', (blog) => {
  cy.get('#toggle-add-blog').click()

  cy.get('#title').type(blog.title)
  cy.get('#author').type(blog.author)
  cy.get('#url').type(blog.url)
  cy.get('#create-blog-button').click()
})

Cypress.Commands.add('likeABlog', (blogTitle, likeCount, wait = 1000) => {

  cy.get(`.blog:contains(${blogTitle})`).within(() => {
    cy.contains('view').click() //展开view
    for (let i = 0; i < likeCount; i++) {
      cy.get('#like-button').click()
      cy.wait(wait)
    }
    cy.contains('hide').click()
  })

})