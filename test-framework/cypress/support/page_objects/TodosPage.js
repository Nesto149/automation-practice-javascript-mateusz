import { BasePage } from "./BasePage";

export class TodosPage extends BasePage {
    addTodo(task) {
        this.typeText('.new-todo', `${task}{enter}`);
    }

    getTodoListItems() {
        return this.getElement('.todo-list li');
    }

    clickActiveFilter() {
        this.getElement('[data-cy="filter-active"]').click();
    }

    clickClearCompleted() {
        this.getElement('.clear-completed').click();
    }

    editFirstTodo(newText) {
        this.getElement('.todo-list li').first().dbclick();
        this.getElement('.todo-list li.editing .edit')
            .clear()
            .type(`${newText}{enter}`)
    }
}