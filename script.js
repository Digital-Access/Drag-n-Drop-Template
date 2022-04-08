const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')
const checkAnswer = document.getElementById('checkAnswer')
const container = document.getElementById('container')


const sortOptions = {
    option1: "Mount Everest",
    option2: "K2",
    option3: "Kangchenjunga",
    option4: "Lhotse"
}

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
    })

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })
})

containers.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElement = getDragAfterElement(container, e.clientY)
        const draggable = document.querySelector('.dragging')
        if (afterElement == null) {
            container.appendChild(draggable)
        } else {
            container.insertBefore(draggable, afterElement)
        }
    })
})

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
            return {
                offset: offset,
                element: child
            }
        } else {
            return closest
        }
    }, {
        offset: Number.NEGATIVE_INFINITY
    }).element
}

checkAnswer.textContent = 'Check Answer'

checkAnswer.addEventListener('click', () => {
    if (container.children[0].textContent === sortOptions.option1 &&
        container.children[1].textContent === sortOptions.option2 &&
        container.children[2].textContent === sortOptions.option3 &&
        container.children[3].textContent === sortOptions.option4
    ) {
        checkAnswer.textContent = "Well Done! That's correct!"
        checkAnswer.classList.add('correct')
    } else {
        checkAnswer.textContent = "❌Sorry, not yet"
        checkAnswer.classList.remove('correct')
        setTimeout(() => {
            checkAnswer.textContent = "Check Again"
        }, 2000);
    }  

})