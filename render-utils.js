export function renderItem(item) {
    const div = document.createElement('div');
    const p = document.createElement('p');

    p.textContent = item.todo;
    div.append(p);

    return div;
}