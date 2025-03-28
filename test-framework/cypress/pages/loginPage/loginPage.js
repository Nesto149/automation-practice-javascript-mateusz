import BasePage from "../basePage";
import loginPageSelectors from "./loginPageSelectors";

export class LoginPage extends BasePage {
    constructor() {
        super('TestArena Login Page')
    }
    
    login(email, pass) {
        cy.get().type(email)
        cy.get().type(pass)
        cy.get(loginPageSelectors.loginBtn).contains('Zaloguj').click()
    }

    getLoginPageUrl() {
        // 01:09:00 M4
        let loginPageUrl = this.url 
        loginPageUrl = 'http://demo.testarena.pl/zaloguj'
        return loginPageUrl
    }
}
