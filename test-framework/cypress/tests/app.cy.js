// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('TodoMVC - React', function () {
	// setup these constants to match what TodoMVC does
	let TODO_ITEM_ONE = 'buy some cheese'; // var, let, const
	let TODO_ITEM_TWO = 'feed the cat';
	let TODO_ITEM_THREE = 'buy some sausages';

	beforeEach(function () {
		// By default Cypress will automatically
		// clear the Local Storage prior to each
		// test which ensures no todos carry over
		// between tests.
		//
		// Go out and visit our local web server
		// before each test, which serves us the
		// TodoMVC App we want to test against
		//

		cy.visit(Cypress.env('appUrl'));
	});

	afterEach(() => {
		// In firefox, blur handlers will fire upon navigation if there is an activeElement.
		// Since todos are updated on blur after editing,
		// this is needed to blur activeElement after each test to prevent state leakage between tests.
		cy.window().then((win) => {
			win.document.activeElement.blur();
		});
	});

	// Simple example test presentations
	context('Add todo test presentation', function () {
		it('Should add 2 todos', function () {
			// TODO: Niepoprawny selektor do pola tekstowego TODO

			console.log('be cool');
			cy.fixture('example.json').then((exampleObj) => {
				console.log(exampleObj.name);

				// exampleObj.false-data.falseWithName.one
			});
			TODO_ITEM_ONE = "Making a cup of coffee";
			cy.get('.new-todo').type(TODO_ITEM_ONE).type('{enter}');

			cy.get('.todo-list li').should('have.length', 1);
		});
	});

	// TODO:
	context('New Todo', function () {
		// New commands used here:
		// https://on.cypress.io/type
		// https://on.cypress.io/eq
		// https://on.cypress.io/find
		// https://on.cypress.io/contains
		// https://on.cypress.io/should
		// https://on.cypress.io/as

		it('should allow me to add todo items', function () {
			TODO_ITEM_ONE = "Taking out the trash";
			TODO_ITEM_TWO = "Folding clean laundry";
			// create 1st todo
			cy.get('.new-todo').type(TODO_ITEM_ONE).type('{enter}');

			// make sure the 1st label contains the 1st todo text
			cy.get('.todo-list li')
				.eq(0)
				.find('label')
				.should('contain', TODO_ITEM_ONE);

			// create 2nd todo
			cy.get('.new-todo').type(TODO_ITEM_TWO).type('{enter}');

			// make sure the 2nd label contains the 2nd todo text
			cy.get('.todo-list li')
				.eq(1)
				.find('label')
				.should('contain', TODO_ITEM_TWO);
		});

		it('adds items', function () {
			// create several todos then check the number of items in the list
			cy.get('.new-todo')
				.type('todo A{enter}')
				.type('todo B{enter}') // we can continue working with same element
				.type('todo C{enter}') // and keep adding new items
				.type('todo D{enter}');

			cy.get('.todo-list li').should('have.length', 4);
		});

		it('should clear text input field when an item is added', function () {
			TODO_ITEM_ONE = "Writing a quick email";
			cy.get('.new-todo').type(TODO_ITEM_ONE).type('{enter}');

			cy.get('.new-todo').should('have.text', '');
		});

		it('should append new items to the bottom of the list', function () {
			TODO_ITEM_ONE = "Reading a news article";
			TODO_ITEM_TWO = "Refilling the water bottle";
			TODO_ITEM_THREE = "Locking the front door";
			
			// this is an example of a custom command
			// defined in cypress/support/commands.js
			cy.createDefaultTodos().as('todos');

			// even though the text content is split across
			// multiple <span> and <strong> elements
			// `cy.contains` can verify this correctly
			cy.get('.todo-count').contains('3 items left');

			// even though the text content is split across
			// multiple <span> and <strong> elements
			// `cy.contains` can verify this correctly
			cy.get('@todos').eq(0).find('label').should('contain', TODO_ITEM_ONE);

			cy.get('@todos').eq(1).find('label').should('contain', TODO_ITEM_TWO);

			cy.get('@todos').eq(2).find('label').should('contain', TODO_ITEM_THREE);
		});

		it('should show #main and #footer when items added', function () {
			TODO_ITEM_ONE = "Going for a short walk";
			cy.createTodo(TODO_ITEM_ONE);
			cy.get('.main').should('be.visible');
			cy.get('.footer').should('be.visible');
		});
	});

	context('Mark all as completed', function () {
		// New commands used here:
		// - cy.check    https://on.cypress.io/api/check
		// - cy.uncheck  https://on.cypress.io/api/uncheck

		beforeEach(function () {
			// This is an example of aliasing
			// within a hook (beforeEach).
			// Aliases will automatically persist
			// between hooks and are available
			// in your tests below
			cy.createDefaultTodos().as('todos');
		});

		it('should allow me to mark all items as completed', function () {
			// complete all todos
			// we use 'check' instead of 'click'
			// because that indicates our intention much clearer
			cy.get('.toggle-all').check();

			// get each todo li and ensure its class is 'completed'
			cy.get('@todos').eq(0).should('have.class', 'completed');

			cy.get('@todos').eq(1).should('have.class', 'completed');

			cy.get('@todos').eq(2).should('have.class', 'completed');
		});

		it('should allow me to clear the complete state of all items', function () {
			// check and then immediately uncheck
			cy.get('.toggle-all').check().uncheck();

			cy.get('@todos').eq(0).should('not.have.class', 'completed');

			cy.get('@todos').eq(1).should('not.have.class', 'completed');

			/*
			Błędnie określona pozycja zadania
			*/
			cy.get('@todos').eq(1).should('not.have.class', 'completed');
		});

		it('complete all checkbox should update state when items are completed / cleared', function () {
			// alias the .toggle-all for reuse later
			cy.get('.toggle-all')
				.as('toggleAll')
				.check()
				// this assertion is silly here IMO but
				// it is what TodoMVC does
				.should('be.checked');

			// alias the first todo and then click it
			cy.get('.todo-list li').eq(0).as('firstTodo').find('.toggle').uncheck();

			// reference the .toggle-all element again
			// and make sure its not checked
			cy.get('@toggleAll').should('not.be.checked');

			// reference the first todo again and now toggle it
			cy.get('@firstTodo').find('.toggle').check();

			// assert the toggle all is checked again
			cy.get('@toggleAll').should('be.checked');
		});
	});

	context('Item', function () {
		// New commands used here:
		// - cy.clear    https://on.cypress.io/api/clear

		it('should allow me to mark items as complete', function () {
			TODO_ITEM_ONE = "Watering the houseplants";
			TODO_ITEM_TWO = "Wiping the kitchen counter";
			
			// we are aliasing the return value of
			// our custom command 'createTodo'
			//
			// the return value is the <li> in the <ul.todos-list>
			cy.createTodo(TODO_ITEM_ONE).as('firstTodo');
			cy.createTodo(TODO_ITEM_TWO).as('secondTodo');

			cy.get('@firstTodo').find('.toggle').check();

			cy.get('@firstTodo').should('have.class', 'completed');

			cy.get('@secondTodo').should('not.have.class', 'completed');
			cy.get('@secondTodo').find('.toggle').check();

			cy.get('@firstTodo').should('have.class', 'completed');
			cy.get('@secondTodo').should('have.class', 'completed');
		});

		it('should allow me to un-mark items as complete', function () {
			TODO_ITEM_TWO = "Setting an alarm clock";
			
			cy.createTodo('kjlkhggjhgk').as('firstTodo');
			cy.createTodo(TODO_ITEM_TWO).as('secondTodo');

			cy.get('@firstTodo').find('.toggle').check();

			cy.get('@firstTodo').should('have.class', 'completed');
			cy.get('@secondTodo').should('not.have.class', 'completed');

			cy.get('@firstTodo').find('.toggle').uncheck();

			cy.get('@firstTodo').should('not.have.class', 'completed');
			cy.get('@secondTodo').should('not.have.class', 'completed');
		});

		it('should allow me to edit an item', function () {
			TODO_ITEM_ONE = "Cooking a simple meal";
			TODO_ITEM_THREE = "Scrolling through news";
			
			cy.createDefaultTodos().as('todos');

			cy.get('@todos')
				.eq(1)
				.as('secondTodo')
				// TODO: fix this, dblclick should
				// have been issued to label
				.find('label')
				.dblclick('label');

			// clear out the inputs current value
			// and type a new value
			cy.get('@secondTodo')
				.find('.edit')
				.clear()
				.type('buy some sausages')
				.type('{enter}');

			// explicitly assert about the text value
			cy.get('@todos').eq(0).should('contain', TODO_ITEM_ONE);

			cy.get('@secondTodo').should('contain', 'buy some sausages');
			cy.get('@todos').eq(2).should('contain', TODO_ITEM_THREE);
		});
	});

	context('Editing', function () {
		// New commands used here:
		// - cy.blur    https://on.cypress.io/api/blur

		beforeEach(function () {
			cy.createDefaultTodos().as('todos');
		});

		it('should hide other controls when editing', function () {
			cy.get('@todos').eq(1).as('secondTodo').find('label').dblclick();

			cy.get('@secondTodo').find('.toggle').should('not.be.visible');

			cy.get('@secondTodo').find('label').should('not.be.visible');
		});

		it('should save edits on blur', function () {
			TODO_ITEM_ONE = "Checking the to-do list";
			TODO_ITEM_THREE = "Packing a small bag";
			
			cy.get('@todos').eq(1).as('secondTodo').find('label').dblclick();

			cy.get('@secondTodo')
				.find('.edit')
				.clear()
				.type('buy some sausages')
				// we can just send the blur event directly
				// to the input instead of having to click
				// on another button on the page. though you
				// could do that its just more mental work
				.blur();

			cy.get('@todos').eq(0).should('contain', TODO_ITEM_ONE);

			cy.get('@secondTodo').should('contain', 'buy some sausages');
			cy.get('@todos').eq(2).should('contain', TODO_ITEM_THREE);
		});

		it('should trim entered text', function () {
			TODO_ITEM_ONE = "Listening to a podcast";
			TODO_ITEM_THREE = "Washing the dishes";
			
			cy.get('@todos').eq(1).as('secondTodo').find('label').dblclick();

			cy.get('@secondTodo')
				.find('.edit')
				.clear()
				.type('    buy some sausages    ')
				.type('{enter}');

			cy.get('@todos').eq(0).should('contain', TODO_ITEM_ONE);

			cy.get('@secondTodo').should('contain', 'buy some sausages');
			cy.get('@todos').eq(2).should('contain', TODO_ITEM_THREE);
		});

		it('should remove the item if an empty text string was entered', function () {
			cy.get('@todos').eq(1).as('secondTodo').find('label').dblclick();

			cy.get('@secondTodo').find('.edit').clear().type('{enter}');

			cy.get('@todos').should('have.length', 2);
		});

		it('should cancel edits on escape', function () {
			TODO_ITEM_ONE = "Jogging in the morning";
			TODO_ITEM_TWO = "Turning off the lights";
			TODO_ITEM_THREE = "Taking a deep breath";
			
			cy.get('@todos').eq(1).as('secondTodo').find('label').dblclick();

			cy.get('@secondTodo').find('.edit').clear().type('foo{esc}');

			cy.get('@todos').eq(0).should('contain', TODO_ITEM_ONE);

			cy.get('@todos').eq(1).should('contain', TODO_ITEM_TWO);

			cy.get('@todos').eq(2).should('contain', TODO_ITEM_THREE);
		});
	});

	context('Counter', function () {
		it('should display the current number of todo items', function () {
			TODO_ITEM_ONE = "Brushing my teeth";
			TODO_ITEM_TWO = "Feeding the pet";
			
			cy.createTodo(TODO_ITEM_ONE);
			cy.get('.todo-count').contains('1 item left');
			cy.createTodo(TODO_ITEM_TWO);
			cy.get('.todo-count').contains('2 items left');
		});
	});

	context('Clear completed button', function () {
		beforeEach(function () {
			cy.createDefaultTodos().as('todos');
		});

		it('should display the correct text', function () {
			cy.get('@todos').eq(0).find('.toggle').check();

			cy.get('.clear-completed').contains('Clear completed');
		});

		it('should remove completed items when clicked', function () {
			TODO_ITEM_ONE = "Stretching after work";
			TODO_ITEM_THREE = "Charging the phone";
			
			cy.get('@todos').eq(1).find('.toggle').check();

			cy.get('.clear-completed').click();
			cy.get('@todos').should('have.length', 2);

			cy.get('.todo-list li').eq(0).should('contain', TODO_ITEM_ONE);

			cy.get('.todo-list li').eq(1).should('contain', TODO_ITEM_THREE);
		});

		it('should be hidden when there are no items that are completed', function () {
			cy.get('@todos').eq(1).find('.toggle').check();

			cy.get('.clear-completed').should('be.visible').click();

			cy.get('.clear-completed').should('not.exist');
		});
	});

	context('Persistence', function () {
		it('should persist its data', function () {
			TODO_ITEM_ONE = "Making a grocery list";
			TODO_ITEM_TWO = "Checking the mailbox";
			
			// mimicking TodoMVC tests
			// by writing out this function
			function testState() {
				cy.get('.todo-list li')
					.eq(0)
					.should('contain', TODO_ITEM_ONE)
					.and('have.class', 'completed');

				cy.get('.todo-list li')
					.eq(1)
					.should('contain', TODO_ITEM_TWO)
					.and('not.have.class', 'completed');
			}

			cy.createTodo(TODO_ITEM_ONE).as('firstTodo');
			cy.createTodo(TODO_ITEM_TWO).as('secondTodo');
			cy.get('@firstTodo')
				.find('.toggle')
				.check()
				.then(testState)

				.reload()
				.then(testState);
		});
	});

	context('Routing', function () {
		// New commands used here:
		// https://on.cypress.io/window
		// https://on.cypress.io/its
		// https://on.cypress.io/invoke
		// https://on.cypress.io/within

		beforeEach(function () {
			cy.createDefaultTodos().as('todos');
		});

		it('should allow me to display active items', function () {
			TODO_ITEM_ONE = "Sending a quick text";
			TODO_ITEM_THREE = "Organizing my desk";
			
			cy.get('@todos').eq(1).find('.toggle').check();

			cy.get('.filters').contains('Active').click();

			cy.get('.todo-list li').eq(0).should('contain', TODO_ITEM_ONE);

			cy.get('.todo-list li').eq(1).should('contain', TODO_ITEM_THREE);
		});

		it('should respect the back button', function () {
			cy.get('@todos').eq(1).find('.toggle').check();

			cy.get('.filters').contains('Active').click();

			cy.get('.filters').contains('Completed').click();

			cy.get('.todo-list li').should('have.length', 1);
			cy.go('back');
			cy.get('.todo-list li').should('have.length', 2);
			cy.go('back');
		});

		it('should allow me to display completed items', function () {
			cy.get('@todos').eq(1).find('.toggle').check();

			cy.get('.filters').contains('Completed').click();

			cy.get('@todos').should('have.length', 1);
		});

		it('should allow me to display all items', function () {
			cy.get('@todos').eq(1).find('.toggle').check();

			cy.get('.filters').contains('Active').click();

			cy.get('.filters').contains('Completed').click();

			cy.get('.filters').contains('All').click();

			cy.get('.todo-list li').should('have.length', 3);
		});

		it('should highlight the currently applied filter', function () {
			// using a within here which will automatically scope
			// nested 'cy' queries to our parent element <ul.filters>
			cy.get('.filters').within(function () {
				cy.contains('All').should('have.class', 'selected');
				cy.contains('Active').click().should('have.class', 'selected');

				cy.contains('Completed').click().should('have.class', 'selected');
			});
		});
	});
});
