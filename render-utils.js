export function renderItem(item) {
    const div = document.createElement('div');
    const p = document.createElement('p');

    p.textContent = item.todo;
    if (item.complete) {
        p.classList.add('bought');
    }
    div.classList.add('todo-item');
    div.append(p);

    return div;
}