try {
    const form = document.querySelector('.input-group')
    const listItemsButtons = document.querySelectorAll('.list-group-item > button')
    const listItems = document.querySelectorAll('.list-group-item.to-update > p')
    const clearAllButton = document.querySelector('#clearAll')
    const clearDoneButton = document.querySelector('#clearDone')
    const ulLists = document.querySelectorAll('.list-group.auto-show')
    const formArchiv = document.querySelector('#form-archiv')


    listItemsButtons.forEach(el => el.addEventListener('click', closeToDo))
    listItems.forEach(el => el.addEventListener('click', markAsDone))
    form.addEventListener('submit', ShowTodoList)
    clearAllButton.addEventListener('click', clearAll)
    clearDoneButton.addEventListener('click', clearDone)
    formArchiv.addEventListener('submit', showArchiv)

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
        let innerText = elementList.target.previousSibling.innerText //.slice(3)
        innerText = innerText.substring(3, innerText.indexOf("-") - 1)
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
        // get text from target element
        let innerText = el.srcElement.innerText //.slice(3)
        // if I clicked on time span rewrite the innerText variable
        if (el.currentTarget !== el.target) {
            innerText = el.srcElement.parentElement.innerText
        }
        // text of todo will be from from 3rd position up to first '-' 
        innerText = innerText.substring(3, innerText.indexOf('-') - 1)
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

    async function showArchiv(event) {
        event.preventDefault()

        const from = document.querySelector('#from').value
        const to = document.querySelector('#to').value
        
        const archiv = await fetch('/features/archiv', {
            method: 'POST',
            body: JSON.stringify({
                'from' : from,
                'to' : to
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json()
        }).then((archiv) => {
            showArchivList(archiv)
        })
    }

    function showArchivList(data) {
        const archiv = document.querySelector('#archiv')
        let out = `<ul class='list-group list-archiv my-4'>`
        for (let i=0; i<data.length; i++) {
            out += `<li class='list-group-item to-archiv'>
            <p> ${i+1}. ${data[i]['text']} ----- <span><b>done</b> 
            ${new Date(Date.parse(data[i]['date'])).toLocaleString()}</span></p></li>`
        }
        out += `</ul>`
        out += `<div class='delete-archiv-precautions'><button class='btn btn-outline-danger' id='archiv-delete'>Delete all archiv todos</button>
        <p><b>Note</b>: this action is irreversible!</p>`
        archiv.innerHTML = out
        const deleteArchiv = document.querySelector('#archiv-delete')
        deleteArchiv.addEventListener('click', deleteAllArchiv)
        showDeleteArchivButton()
    }

    async function deleteAllArchiv() {
        await fetch('/features/archiv-delete', {
            method: 'POST'
        })
        window.location.href = '/features'
    }

    function showDeleteArchivButton() {
        let archiv = document.querySelector('#archiv')
        let div = document.querySelector('.delete-archiv-precautions')
        if (archiv.firstChild.children.length == 0) {
            div.style.display = 'none'
        } else {
            div.style.display = 'block'
        }
    }


} catch (e) {
    console.log(e.message)
}
