'use strict'
let operationInfo = { operator: '' }

function clrEntry(alsoNums) {
    $('.calcScreen').text('0')
    if (alsoNums) {
        operationInfo = { operator: '' }
    }
}

function numToScreen(scrNum) {
    let crntScreen = document.getElementsByClassName('calcScreen')[0].innerHTML
    crntScreen += scrNum
    
    crntScreen = crntScreen.replace(/[.]+/, '.')
    $('.calcScreen').text(crntScreen.replace(/^[0]([1-9])/, '$1'))
}

function operation(oprtr) {
    if ( !operationInfo.operator ) {
        operationInfo.frstOperand = +document.getElementsByClassName('calcScreen')[0].innerHTML
        operationInfo.operator = oprtr
        clrEntry()
    }
    else if ( operationInfo.operator == 'equal' ){
        //let scndOperand = document.getElementsByClassName('calcScreen')[0].innerHTML
        clrEntry()
        numToScreen( (Number(operationInfo.frstOperand) + Number(scndOperand)).toString() )
        operationInfo.frstOperand = scndOperand
        operationInfo.operator = oprtr  
    }
    else if ( operationInfo.operator == 'plus' ){
        let scndOperand = +document.getElementsByClassName('calcScreen')[0].innerHTML
        let result = operationInfo.frstOperand + scndOperand
        clrEntry()
        numToScreen( result.toString() )
        operationInfo.frstOperand = result
        operationInfo.operator = oprtr  
    }
}