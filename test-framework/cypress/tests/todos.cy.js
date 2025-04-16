// cypress/e2e/todos.cy.js

import { TodosPage } from "../support/page_objects/TodosPage";

const todosPage = new TodosPage();

describe('Testy aplikacji TODOS', () => {
    beforeEach(() => {
        todosPage.visit();
    })

    it('Dodanie zadania i sprawdzenie poprawności licznika', () => {
        todosPage.addTodo('Testowe zadanie');
        todosPage.getElement('.todo-count').should('contain.text', '1 item left');
    });

    it('Zabezpieczenie przed SQL Injection', () => {
        cy.fixture('testData').then((fixtureData) => {
            todosPage.addTodo(fixtureData.sqlInjection);
            todosPage.getTodoListItems().should('not.contain.text', 'SELECT * FROM'); //sprawdzamy SQL Injection
        })
    })

    it('Unikalność zadań na liście', () => {
        cy.fixture('testData').then((fixtureData) => {
            todosPage.addTodo(fixtureData.uniqueTasks[0]);
            todosPage.addTodo(fixtureData.uniqueTasks[1]);
            todosPage.addTodo(fixtureData.uniqueTasks[0]);  //dodajemy duplikat
            // sprawdzamy czy zadanie nie występuje dwa razy
            todosPage.getTodoListItems().filter(`:contains("${DataTransfer.uniqueTasks[0]}")`).should('have.length', 1);
        })
    })

    it('Edycja duplikatu zadania', () => {
        cy.fixture('testData').then((fixtureData) => {
            todosPage.addTodo(fixtureData.duplicateTasks[0]);
            todosPage.addTodo(fixtureData.duplicateTasks[1]);
            const randomText = `${Math.random().toString(25)}`;
            todosPage.editFirstTodo(randomText);
            todosPage.getTodoListItems().first().should('contain.text', randomText);
        })
    })
})