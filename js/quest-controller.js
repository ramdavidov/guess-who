'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);

function init() {
    createQuestsTree();
    // $('.game-logo').fadeOut()
}

function onStartGuessing() {
    $('.game-start').hide()
    renderQuest();
}

function renderQuest() {
    var $elQuest = $('.quest')
    $elQuest.show('true')
    // $('.quest').show();
    var currQuest = getCurrQuest()
    var $elText = $('.quest-txt')
    $elText.text(currQuest.txt)
    // $('.quest-txt').text(currQuest.txt);
}

function onUserResponse(res) {
    var currQuest = getCurrQuest()
    if (isChildless(currQuest)) {
        if (res === 'yes') {
            modalVictory()
            $('.quest').hide()
            victory()
            onRestartGame()
        } else {

            modalDefeat()
            onGameOver()
        }
    } else {
        gLastRes = res
        moveToNextQuest(res);
        renderQuest();
    }
}

function modalToggle() {
var $elModal = $('.modal')
$elModal.modal('toggle')
}

function modalVictory() {
    modalToggle()
    var $elTitel = $('.modal-title')
    var $elBodyText= $('.modal-body')
    $elTitel.text('Yes, I knew it!')
    $elBodyText.text('Let\'s play again!')
}

function modalDefeat() {
    modalToggle()
    var $elTitel = $('.modal-title')
    var $elBodyText= $('.modal-body')
    $elTitel.text('You have bested me!')

    $elBodyText.text('You truly are one of a kind!')
}

function onGameOver() {
    var $elQuest = $('.quest')
    var $elNewQuest = $('.new-quest')
    $elQuest.hide()
    $elNewQuest.show()
}

function onAddGuess() {
    var $elGuess = $('.newGuess')
    var $elQuest = $('.newQuest')
    var newGuessTxt = $elGuess.val()
    var newQuestTxt = $elQuest.val()
    console.log('new guess:', newGuessTxt, 'new question:', newQuestTxt);
    addGuess(newQuestTxt, newGuessTxt, gLastRes)
    onRestartGame();
}


function onRestartGame() {
    $('.new-quest').hide();
    $('.game-start').show();
    gLastRes = null;
}

