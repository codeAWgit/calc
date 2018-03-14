'use strict'
let operationInfo = { 
                     operator: '',
                     entry: '',
                     firstOperand: 0,
                     last: 0 
                    }

function clrEntry(alsoNums) {
    document.getElementsByClassName('calcScreen')[0].innerHTML = '0'
    operationInfo.entry = ''   
    if (alsoNums) {
        operationInfo = { 
                         operator: '',
                         entry: '',
                         firstOperand: 0,
                         last: 0 
                        }
    }
}

// add a backspace button and maybe a +/- button

function numToScreen(btnNum) {
   operationInfo.entry += btnNum
    
    operationInfo.entry = operationInfo.entry.replace(/^[.]+/, '0.')
    operationInfo.entry = operationInfo.entry.replace(/([.]\d+)[.]+/, '$1')
    //operationInfo.entry = operationInfo.entry.length > 15 ? 
                            //operationInfo.entry.toExponential() : operationInfo.entry
    operationInfo.entry = operationInfo.entry.replace(/(\d{9})\d+([e][+]?\d+)/, '$1$2')
    operationInfo.entry = operationInfo.entry.replace(/([.]\d{9})\d+([e][-]?\d+)/, '$1$2')
    operationInfo.entry = operationInfo.entry.substr(0,15)

    document.getElementsByClassName('calcScreen')[0].innerHTML = operationInfo.entry
}

function operation(operator, forEqual = false) {
    if ( !operationInfo.operator ) {
        operationInfo.firstOperand = +operationInfo.entry
        operationInfo.operator = operator
        clrEntry()
    }
    else if ( operationInfo.operator == 'plus' ){
        let save = Number( operationInfo.entry )
        operationInfo.firstOperand += save
        
        if ( forEqual && !operationInfo.entry ) {
            operationInfo.firstOperand += operationInfo.last
        }
        commonEntryAndSave( save )
    }
    else if ( operationInfo.operator == 'minus' ){
        let save = Number( operationInfo.entry )
        operationInfo.firstOperand -= save

        if ( forEqual && !operationInfo.entry ) {
            operationInfo.firstOperand -= operationInfo.last
        }
        commonEntryAndSave( save )
    }
    else if ( operationInfo.operator == 'multiply' ){
        let save 

        if ( forEqual && !operationInfo.entry ) {
            operationInfo.firstOperand *= operationInfo.last
        }
        else {
            save = Number( operationInfo.entry )
            operationInfo.firstOperand *= save || 1
        }
        commonEntryAndSave( save )
    }   
    else if ( operationInfo.operator == 'divide' ){
        let save

        if ( forEqual && !operationInfo.entry ) {
            operationInfo.firstOperand /= operationInfo.last
        }
        else {
            save = Number( operationInfo.entry )
            operationInfo.firstOperand /= save || 1
        }
        commonEntryAndSave( save )
    }      

    function commonEntryAndSave( save ) {
        operationInfo.entry = ''
        numToScreen( operationInfo.firstOperand.toString() )
        operationInfo.entry = ''
        operationInfo.operator = operator

        operationInfo.last = save || operationInfo.last
    }
}

function equalTo () {
    operation( operationInfo.operator, true )
}

