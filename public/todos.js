try {
    const form = document.querySelector('.input-group')
    const clearAllButton = document.querySelector('#clearAll')
    const clearDoneButton = document.querySelector('#clearDone')
    const formArchiv = document.querySelector('#form-archiv')

    form.addEventListener('submit', updateTodoList)
    
    clearAllButton.addEventListener('click', clearAll)
    clearDoneButton.addEventListener('click', clearDone)
    formArchiv.addEventListener('submit', showArchiv)

    /* -------------------------------------------------------- */
    
    let todos_list = []

    if (localStorage.getItem('todos_list')) {
        todos_list = JSON.parse(localStorage.getItem('todos_list'))
    }


    function updateLocalStorage() {
        const sortList = el => el.sort((a, b) => a['priority'] - b['priority'])
        localStorage.setItem('todos_list', JSON.stringify(sortList(todos_list)))
    }

    function createTODO(data, priority) {
        const todo = {
            'text': data,
            'done': 0,
            'date': Date.now(),
            'id': Math.floor(Math.random() * 1000000000),
            'priority': priority
        }
        todos_list.push(todo)
    }

    function showTodoList() {
        let showNotDoneDiv = document.querySelector('#showNotDone')
        let out = `<p>In order to remove todo from the list, click on the <b>close button</b> next to the todo. To mark it as finished <b>click on todo itself</b>.`
        out += `<ul class='list-group auto-show mb-4'>`
        let i = 0

        for (let el of todos_list) {
            if (el['done'] == 0) {
                out += `<li class="list-group-item to-update" data-priority='${el['priority']}'>`
                out += `<p>${i+1}. &nbsp; ${el['text']} ----- <span>${new Date(el['date']).toLocaleString()}</span></p>`
                out += `<button class="btn btn-outline-dark" data-id='${el['id']}'>x</button></li>`
                i++
            }
        }

        out += `</ul>`
        showNotDoneDiv.innerHTML = out

        document.querySelector('#showNotDone ul').addEventListener('click', (event) => {
            if (event.target.nodeName == 'BUTTON') {
                closeToDo(event)
            } else {
                markAsDone(event)
            }
        })

        // close button
        // const listItemsButtons = document.querySelectorAll('.list-group-item > button')
        // listItemsButtons.forEach(el => el.addEventListener('click', closeToDo))

        // // mark finished
        // const listItems = document.querySelectorAll('.list-group-item.to-update')
        // listItems.forEach(el => el.addEventListener('click', markAsDone))
    } 

    function updateTodoList(evt) {
        evt.preventDefault()
        let input = document.querySelector('.form-control').value
        let priority = document.querySelector('#priority').value
        
        if (input.length == 0) {
            return false
        }
        
        createTODO(input, priority)
        updateLocalStorage()
        window.location.href = '/features'
    }
    
    function closeToDo(elementList) {
        let innerText = elementList.target.previousSibling.innerText
        innerText = innerText.substring(5, innerText.indexOf("-") - 1)
        let buttonId = elementList.srcElement.dataset.id

        for (let el of todos_list) {
            if (el['text'] == innerText && el['id'] == buttonId) {
                let index = todos_list.indexOf(el)
                todos_list.splice(index, 1)
            }
        }

        updateLocalStorage()
        window.location.href = '/features'
    }

    function markAsDone(el) {
        let innerText = el.srcElement.innerText 
        if (el.currentTarget !== el.target) {
            innerText = el.srcElement.parentElement.innerText
        }
        innerText = innerText.substring(5, innerText.indexOf('-') - 1)

        for (let el of todos_list) {
            if (el['text'] == innerText && el['done'] == 0) {
                el['done'] = 1
                el['date'] = Date.now()
            }
        }

        updateLocalStorage()
        window.location.href = '/features'
    }

    function showFinishedTodoList() {
        let showDoneDiv = document.querySelector('#showDone')
        let out = `<p>Todos that are marked as <b>done</b></p>`
            out += `<ul class='list-group auto-show mb-4'>`
        let i = 0

        for (let el of todos_list) {
            if (el['done'] == 1) {
                out += `<li class="list-group-item to-mark" data-priority='${el['priority']}'>`
                out += `<p>${i+1}. &nbsp; ${el['text']} ----- <span><b>done</b> ${new Date(el['date']).toLocaleString()}</span></p></li>`
                i++
            }
        }

        out += `</ul>`
        showDoneDiv.innerHTML = out

        // hide help-text
        hideHelpText()
    }

    function clearAll() {
        for (let i=0;i<todos_list.length; i++) {
            if (todos_list[i]['done'] == 1) {
                todos_list[i]['done'] = 2
            } else if (todos_list[i]['done'] == 0) {
                todos_list.splice(i, 1)
                i--
            }
        }

        updateLocalStorage()
        window.location.href = '/features'
    }

    function clearDone() {
        for (let el of todos_list) {
            if (el['done'] == 1) {
                el['done'] = 2
            }
        }

        updateLocalStorage()
        window.location.href = '/features'
    }

    function hideHelpText() {
        const ulLists = document.querySelectorAll('.list-group.auto-show')
        
        ulLists.forEach(ul => {
            if (ul.children.length == 0) {
                ul.previousSibling.style.display = 'none'
            } else {
                ul.previousSibling.style.display = 'block'
            }
        })
    }
    
    function showArchiv(event) {
        event.preventDefault()

        const from = Date.parse(document.querySelector('#from').value)
        const to = Date.parse(document.querySelector('#to').value)
        const archiv = document.querySelector('#archiv')

        let out = `<ul class='list-group list-archiv my-4'>`
        
        for (let i=0;i<todos_list.length;i++) {
            if (todos_list[i]['date'] >= from && todos_list[i]['date'] <= to) {
                out += `<li class='list-group-item to-archiv' data-priority='${todos_list[i]['priority']}'>
                        <p> ${i+1}. &nbsp; ${todos_list[i]['text']} ----- <span><b>done</b>
                        ${new Date(todos_list[i]['date']).toLocaleString()}</span></p></li>`
            }
        }

        out += `</ul>`
        out += `<div class='delete-archiv-precautions'><button class='btn btn-outline-danger' id='archiv-delete'>Delete all archiv todos</button>
        <p><b>Note</b>: this action is irreversible!</p>`
        archiv.innerHTML = out
        
        const deleteArchiv = document.querySelector('#archiv-delete')
        deleteArchiv.addEventListener('click', deleteAllArchiv)
        showDeleteArchivButton()
    }

    function deleteAllArchiv() {
        for (let i=0;i<todos_list.length; i++) {
            if (todos_list[i]['done'] == 2) {
                todos_list.splice(i, 1)
                i--
            }
        }

        updateLocalStorage()
        window.location.href = '/features'
    }

    function showDeleteArchivButton() {
        let archiv = document.querySelector('#archiv')
        let div = document.querySelector('.delete-archiv-precautions')
        
        if (archiv.firstChild.children.length == 0) {
            // div.style.display = 'none'
            div.innerHTML = 'Записей за выбранные даты нет'
        } else {
            div.style.display = 'block'
        }
    }

    showTodoList()
    showFinishedTodoList()

} catch (e) {
    console.log(e.message)
}
