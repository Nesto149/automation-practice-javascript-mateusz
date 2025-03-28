/// <reference types="cypress" />

import { LoginPage } from "../pages/loginPage/loginPage";
import { MainPage } from "../pages/mainPage/mainPage";

describe("Login to app scenario", function() {

	beforeEach(function () {
        let loginPage = new LoginPage()
        loginPage.visitPage()
	});

    context('Proper login to Admin tests', function() {

        beforeEach(function () {
            loginPage.login('administrator@testarena.pl', 'sumXQQ72$L')
        });

        it('Proper login', function() {
            let mainPage = new MainPage()
            // cy.url().should('contain', 'demo.testarena.pl')
            // cy.get('.article_left_box > h4:nth-child(1)').should('be.visible')
            
            // mainPage.checkMyTasks()
            mainPage.getTasksAssignedToMe().then((objAssignedToMe) => {
                cy.wrap(objAssignedToMe).each((value) => {
                    value.find('a').should('contain', 'tasks')
                    // sprawdzamy atrybut 'a' (DevTools)
                })
            })
        })
    })
})