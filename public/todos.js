try {
    const form = document.querySelector('.input-group')
    const listItemsButtons = document.querySelectorAll('.list-group-item > button')
    const listItems = document.querySelectorAll('.list-group-item.to-update > p')
    const clearAllButton = document.querySelector('#clearAll')
    const clearDoneButton = document.querySelector('#clearDone')
    const ulLists = document.querySelectorAll('.list-group')

    listItemsButtons.forEach(el => el.addEventListener('click', closeToDo))
    listItems.forEach(el => el.addEventListener('click', markAsDone))
    form.addEventListener('submit', ShowTodoList)
    clearAllButton.addEventListener('click', clearAll)
    clearDoneButton.addEventListener('click', clearDone)

    async function ShowTodoList(evt) {
        evt.preventDefault()

        let input = document.querySelector('.form-control').value
        if (input.length == 0) {
            return false
        }

        await fetch('/features', {
            method: 'POST',
            body: JSON.stringify({
                'input': input
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        window.location.href = '/features'
    } 
    
    async function closeToDo(elementList) {
        let innerText = elementList.target.previousSibling.innerText.slice(3)
        await fetch('/features/delete', { // /features-delete
            method: 'POST',
            body: JSON.stringify({
                'deleteElement': innerText
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        window.location.href = '/features'
    }

    async function markAsDone(el) {
        let innerText = el.srcElement.innerText.slice(3)
        await fetch('/features/update', { // /features-update
            method: 'POST',
            body: JSON.stringify({
                'element': innerText
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        window.location.href = '/features'
    }

    async function clearAll(el) {
        await fetch('/features/clear-all', { // features-clear-all
            method: 'POST'
        })
        window.location.href = '/features'
    }

    async function clearDone(el) {
        await fetch('/features/clear-done', { // features-clear-done
            method: 'POST'
        })
        window.location.href = '/features'
    }

    ulLists.forEach(ul => {
        if (ul.children.length == 0) {
            ul.previousSibling.style.display = 'none'
        } else {
            ul.previousSibling.style.display = 'block'
        }
    })


} catch (e) {
    console.log(e.message)
}
