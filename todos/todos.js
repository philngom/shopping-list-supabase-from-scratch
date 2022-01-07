import {
    checkAuth,
    logout,
    getItems,
    deleteAllItems,
    buyItem,
    createItem
} from '../fetch-utils.js';
import { renderItem } from '../render-utils.js';

const todoItemsEl = document.querySelector('todo-list-container');

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});


// window.addEventListener('load', async() => {

//     displayShoppingListItems();
// });

async function displayShoppingListItems() {
    let list = await getItems();

    todoItemsEl.textContent = '';

    for (let item of list) {
        const itemEl = renderItem(item);
        todoItemsEl.append(itemEl);
    }

}