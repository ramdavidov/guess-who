const KEY = 'QUESTS'
var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {
    gQuestsTree = loadFromStorage(KEY);
    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
    }
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    saveToStorage(KEY, gCurrQuest)
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest

    gCurrQuest = gPrevQuest[res]
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    var newQuest = createQuest(newQuestTxt)
    newQuest.yes = createQuest(newGuessTxt)
    newQuest.no = gCurrQuest

    gPrevQuest[lastRes] = newQuest
    gCurrQuest = gQuestsTree;

    saveToStorage(KEY, gCurrQuest)
}

function getCurrQuest() {
    return gCurrQuest
}

function victory() {
    gCurrQuest = gQuestsTree
    gPrevQuest = null
}
