import BasePage from "../basePage";
let mapTasksAssignedToMe = {
    overall: 0
}

function getSelectors() {
    return {
        myTasks: '.article_left_box > h4:nth-child(1)',
        getTasksAssignedToMe: '.article_box.dsb>div>*'
        // >* -  wszystkie elementy znajdujące się wewnątrz
    }
}

export class MainPage extends BasePage {
    constructor() {
        super()
    }

    checkMyTasks() {
        cy.url().should('contain', 'demo.testarena')
        cy.get(getSelectors().myTasks).should('be.visible')
    }

    getTasksAssignedToMe(taskName, taskPosition) {
        if (taskName === 'overall') {
            // dodatkowe czynności związane z inną klasą CSS
        }
        
        return cy.get(getSelectors().tasksAssignedToMe).eq(taskPosition[taskName])
        // cy.get(getSelectors().tasksAssignedToMe).eq(taskPosition[taskName]).find('a')
    }
}