const config = {
    instructions: "Do you remember the 5 steps in the Marketing Planning Cycle?",
    question: "Click and drag the 5 steps below into the correct order.",
    options: [
        "Build",
        "Measure",
        "Optimise",
        "Plan",
        "Execute"
    ],
    answers: [
        "Plan",
        "Build",
        "Execute",
        "Measure",
        "Optimise"
    ]
}

const instructions = document.getElementById('instructions')
const question = document.getElementById('question')

instructions.textContent = config.instructions
question.textContent =config.question

const container = document.getElementById('container')

let i = 0;
config.options.forEach(element => {
    const newSortable = document.createElement("p");
    newSortable.className = 'draggable';
    newSortable.draggable = 'true';
    newSortable.textContent = config.options[i];
    container.appendChild(newSortable);
    i++;
});

const containers = document.querySelectorAll('.container')
const draggables = document.querySelectorAll('.draggable')
const checkAnswer = document.getElementById('checkAnswer')

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

const checkAnswers = () => {
    const containerChildren = Array.from(container.children)
    const answerOrder = [...config.answers]
    const arrangedOrder = []

    containerChildren.forEach(element => {
        arrangedOrder.push(element.textContent)
    });


    let j = 0;
    arrangedOrder.forEach(element => {
        if (arrangedOrder[j] === answerOrder[j]) {
            checkAnswer.textContent = "Well Done! That's correct!"
            checkAnswer.classList.add('correct')
        } else {
            checkAnswer.textContent = "❌Sorry, not yet"
            checkAnswer.classList.remove('correct')
            setTimeout(() => {
                checkAnswer.textContent = "Check Again"
            }, 1000);
        }
        j++;
    });




}

checkAnswer.addEventListener('click', checkAnswers)

const celebrationWindow = document.createElement('img')

