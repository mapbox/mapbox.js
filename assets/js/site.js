textarea.bind('click', function() {
    if (document.selection) {
        var rangeD = document.body.createTextRange();
            rangeD.moveToElementText(document.getElementById('code-output'));
        rangeD.select();
        }
    else if (window.getSelection) {
        var rangeW = document.createRange();
            rangeW.selectNode(document.getElementById('code-output'));
        window.getSelection().addRange(rangeW);
    }
    return false;
});
