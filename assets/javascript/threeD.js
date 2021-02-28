'use strict';

function sakura() {
    var container = document.getElementById('sakura');
    snabbt(container, {
        fromRotation: [0, 0, 0],
        rotation: [0, 2 * Math.PI, 0],
        duration: 10000,
        perspective: 2000,
        complete: function() {
            sakura();
        }
    });
}
// sakura();
function rotateEle(ele) {
    var container = ele;
    snabbt(container, {
        fromRotation: [0, 0, 0],
        rotation: [0, 1 * Math.PI, 0],
        duration: 5000,
        perspective: 2000,
        complete: function() {
            return true;
        }
    });
}




function rotateContainer() {

    var container = document.getElementById('surface');
    snabbt(container, {
        fromRotation: [0, 0, 0],
        rotation: [0, 5 * Math.PI, 0],
        duration: 10000,
        perspective: 2000,
        complete: function() {
            $('.ivampiresp-card').css('cssText', 'transform: rotate(0deg)');
        }
    });
}
rotateContainer();