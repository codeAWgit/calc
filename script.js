'use strict'
let operationInfo = { 
                     operator: '',
                     entry: '',
                     firstOperand: 0,
                     last: 0 
                    }

function clrEntry(alsoNums) {
    $('.calcScreen').text('0')
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

function numToScreen(btnNum) {
   operationInfo.entry += btnNum
    
    //operationInfo.entry = operationInfo.entry.replace(/[.]+/, '.')
    //operationInfo.entry = operationInfo.entry.replace(/^[0]([1-9])/, '$1')
    // Decide on a way to get rid of additional places where zeroes can be added.
    $('.calcScreen').text( operationInfo.entry )
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
        let save //= Number( operationInfo.entry )
        // operationInfo.firstOperand *= save
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
        let save //= Number( operationInfo.entry )
        // operationInfo.firstOperand *= save
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

    console.log(operationInfo)
}

function equalTo () {
    operation( operationInfo.operator, true )
    //#region old code for equal. May not need soon. 
    // let save = Number(operationInfo.entry)
    // operationInfo.frstOperand += save + Number(operationInfo.last)
    

    // clrEntry()
    // numToScreen( operationInfo.frstOperand.toString() )

    // operationInfo.entry = save
    // operationInfo.operator = oprtr  
    // console.log(operationInfo)
    //#endregion
}

/*

operand is entered (key presses result in new numbers being displayed on the screen)

operator is entered (screen shows zero as its ready to receive another operand, operator is saved)

second operand is entered (key presses show on the screen for the second operand)

another operation is entered or equal is entered

if equal then that displays the result and resets any saved values
if another operation then the result is shown and another number will be taken to perform that operation

*/