
const mockUser = {
  username: 'testUserName',
  name: 'testName',
  password: 'testPassWD'
}

describe('Blog app', function () {
  //5.17
  beforeEach(function () {
    //reset db
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    //register mock user
    cy.request('POST', 'http://localhost:3003/api/users', mockUser)
    cy.visit('http://localhost:3000')

  })

  it('5.17 Login form is shown', function () {
    cy.contains("Log in to application")
  })

  //5.18
  describe('Login', function () {


    it('succeeds with correct credentials', function () {
      // cy.request('POST', 'http://localhost:3003/api/users', mockUser)

      cy.get('#username').type(mockUser.username)
      cy.get('#password').type(mockUser.password)
      cy.get('#login-button').click()

      cy.contains('You have successfully login')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type(mockUser.username)
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Invalid username or password')
    })
  })

  const mockBlog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testUrl'
  }
  //5.19
  describe('When logged in', function () {


    beforeEach(function () {
      //login
      cy.login({ username: mockUser.username, password: mockUser.password })
    })

    it('A blog can be created', function () {
      cy.get('#toggle-add-blog').click()

      cy.get('#title').type(mockBlog.title)
      cy.get('#author').type(mockBlog.author)
      cy.get('#url').type(mockBlog.url)
      cy.get('#create-blog-button').click()

      // cy.contains(mockBlog.title)
      cy.contains(`a new blog ${mockBlog.title} by ${mockBlog.author} added`)
    })

    describe('When a blog available', function () {

      //add a blog
      beforeEach(function () {
        cy.addABlog(mockBlog)
      })

      //5.20
      it('A blog can be liked', function () {
        cy.get('.blog').children().contains('view').click() //click view button
        cy.get('.blog #likes').as('likeCounts')
        cy.get('@likeCounts').contains('0')
        cy.get('.blog #like-button').click()

        cy.get('@likeCounts').contains('1')
      })

      //5.21 
      it('A blog can be deleted', function () {
        cy.get('.blog').children().contains('view').click() //click view button
        cy.get('.blog #delete-blog-button').click()
        cy.contains(`deleted ${mockBlog.title}`)
      })



    })


  })





})