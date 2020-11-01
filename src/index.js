function createNodeElement(tag, className, value, children) {
    const data = document.createElement(tag);

    if (className) {
        className.forEach(item => data.classList.add(item))
    }

    if (value) {
        data.appendChild(document.createTextNode(value))
    }
    
    if (children) {
        children.forEach(child => data.appendChild(child))
    }
    
    return data
}

function createButton(className, value, onClick) {
    let buttonNode = createNodeElement('button', className, value, null)
    if (onClick) {
        buttonNode.onclick = onClick;
    }
    return buttonNode;
}

/*************************************
    MODEL
*************************************/
const count = 0;

/*************************************
    VIEW
*************************************/

function view(dispatch, model) {

    return createNodeElement('div', ['mv2'], null, [
        createNodeElement('div', ['flex'], null, [
            createButton(['pv1','ph2'], '-', () => dispatch('minus')),
            createNodeElement('h2', ['pv1',], `${model}`, null),
            createButton(['pv1','ph2'], '+', () => dispatch('plus')),
        ]),
        createNodeElement('p', null, `This is a simple example of a counter made with functional programming.`, null),
    ])    
}

/*************************************
    UPDATE
*************************************/

function update(event, model) {
    switch(event) {
        case 'plus':
            return model + 1
        case 'minus':
            return model - 1
        default:
            return model
    }
}


/*************************************
    APP FUNCTION: IMPURE 
*************************************/
function app(initModel, update, view, node) {

    let model = initModel
    let currentView = view(dispatch, model)

    node.appendChild(currentView) 

    // Dispatch function triggers update
    function dispatch(msg) {
        model = update(msg, model)

        // Updates HTML veiw
        const updatedView = view(dispatch, model)

        // Replaces Old HTML view in the DOM
        node.replaceChild(updatedView, currentView)

        // Sets current view to updated view
        currentView = updatedView
    }

}

// App entry point
const node = document.getElementById('app')

/*************************************
    CALLING MAIN APP FUNCTION
*************************************/

app(count, update, view, node)
