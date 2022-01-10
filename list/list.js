import {
    checkAuth,
    logout,
    getItems,
    deleteAllItems,
    buyItem,
    createItem
} from '../fetch-utils.js';
import { renderItem } from '../render-utils.js';

const shoppingItemsEl = document.querySelector('.shopping-list-container');
const logoutButton = document.getElementById('logout');
const itemInputFormEl = document.querySelector('.shopping-input-form');
const deleteButtonEl = document.querySelector('.delete-all-items-button');

checkAuth();

window.addEventListener('load', async() => {

    displayShoppingListItems();
});

itemInputFormEl.addEventListener('submit', async(e) => {
    e.preventDefault();
    const data = new FormData(itemInputFormEl);
    const item = data.get('shopping-item');
    itemInputFormEl.reset();
    await createItem(item);
    displayShoppingListItems();
});

deleteButtonEl.addEventListener('click', async() => {
    await deleteAllItems();
    displayShoppingListItems();
});

logoutButton.addEventListener('click', () => {
    logout();
});

async function displayShoppingListItems() {
    let list = await getItems();

    shoppingItemsEl.textContent = '';

    for (let item of list) {
        const itemEl = renderItem(item);
        itemEl.addEventListener('click', async() => {
            if (item.complete) {
                await buyItem(item.id, false);
                displayShoppingListItems();
            } else {
                await buyItem(item.id, true);
                displayShoppingListItems();
            }
        });
        shoppingItemsEl.append(itemEl);
    }

}

