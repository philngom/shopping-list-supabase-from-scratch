import {
    checkAuth,
    logout,
    getItems,
    deleteAllItems,
    buyItem,
    createItem
} from '../fetch-utils.js';
import { renderItem } from '../render-utils.js';

const todoItemsEl = document.querySelector('.todo-list-container');
const logoutButton = document.getElementById('logout');
const itemInputFormEl = document.querySelector('.todo-input-form');

checkAuth();

window.addEventListener('load', async() => {

    displayShoppingListItems();
});

itemInputFormEl.addEventListener('submit', async(e) => {
    e.preventDefault();
    const data = new FormData(itemInputFormEl);
    const item = data.get('todo-item');
    itemInputFormEl.reset();
    await createItem(item);
    displayShoppingListItems();
});

logoutButton.addEventListener('click', () => {
    logout();
});

async function displayShoppingListItems() {
    let list = await getItems();

    todoItemsEl.textContent = '';

    for (let item of list) {
        const itemEl = renderItem(item);
        todoItemsEl.append(itemEl);
    }

}

