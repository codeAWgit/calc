'use strict'
let operationInfo = { operator: '', entry: '0' }

function clrEntry(alsoNums) {
    $('.calcScreen').text('0')
    if (alsoNums) {
        operationInfo = { operator: '', entry: '0' }
    }
}

function numToScreen(scrNum) {
   operationInfo.entry += scrNum
    
    operationInfo.entry = operationInfo.entry.replace(/[.]+/, '.')
    operationInfo.entry = operationInfo.entry.replace(/^[0]([1-9])/, '$1')
    // Decide on a way to get rid of additional places where zeroes can be added.
    $('.calcScreen').text( operationInfo.entry )
    console.log(operationInfo)
}

function operation(oprtr) {
    if ( !operationInfo.operator ) {
        operationInfo.frstOperand = +operationInfo.entry
        operationInfo.operator = oprtr
        operationInfo.entry = '0'
        clrEntry()
    }
    else if ( operationInfo.operator == 'plus' ){
        let result = operationInfo.frstOperand + Number(operationInfo.entry)

        operationInfo.entry = '0'
        clrEntry()
        numToScreen( result.toString() )
        operationInfo.frstOperand = result
        operationInfo.operator = oprtr  
    }
    else if ( operationInfo.operator == 'equal' ){
        let result = operationInfo.frstOperand + Number(operationInfo.entry)
        clrEntry()
        numToScreen( result.toString() )
        operationInfo.frstOperand = result
        operationInfo.operator = oprtr  
    }
}

/*

operand is entered (key presses result in new numbers being displayed on the screen)

operator is entered (screen shows zero as its ready to receive another operand, operator is saved)

second operand is entered (key presses show on the screen for the second operand)

another operation is entered or equal is entered

if equal then that displays the result and resets any saved values
if another operation then the result is shown and another number will be taken to perform that operation

*/