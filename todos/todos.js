import {
    checkAuth,
    logout,
    getItems,
    deleteAllItems,
    buyItem,
    createItem
} from '../fetch-utils.js';

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

}