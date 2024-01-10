describe('login', () => {
    const username = 'madsMikkelsen';
    const password = '12345678';
    beforeEach(()=>{
        cy.viewport(1920, 1080)
        cy.visit('')

        cy.contains('button', 'Login')
            .click();

        cy.contains('button', 'Sign in')
            .click()

        cy.get('.modal-body')
            .find('input').first()
            .type(username)
            .as('username')

        cy.get('@username')
            .should('include.value', username)

        cy.get('.modal-body')
            .find('input').last()
            .type(password)
            .as('password')

        cy.get('@password')
            .should('include.value', password)

        cy.contains('button', 'Sign in')
            .should('be.visible')
            .click()
    })
    it('following login the user button is displayed in the navbar', () => {
        cy.get('img[src="/profile_picture.png"]')
            .should('be.visible')
    })

    it('allows the user to enter the user pages', () => {
        const userPages = ['Ratings', 'Account details', 'Update account', 'Delete account', 'Bookmarks']
        cy.get('img[src="/profile_picture.png"]', {timeout: 3000})
            .should('be.visible')
            .click()

        cy.contains('Bookmarks')
            .click()

        userPages.forEach(page => {
            cy.contains('a.menuItem', page)
                .should('be.visible')
                .click()
        })
    })
})