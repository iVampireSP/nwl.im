/* global document, randomColor, snabbt, FastClick */
// Constants
'use strict';

var container = document.getElementById('surface');

function rotateContainer() {
    snabbt(container, {
        fromRotation: [0, 0, 0],
        rotation: [0, 2 * Math.PI, 0],
        duration: 10000,
        perspective: 2000,
        complete: function() {
            rotateContainer();
        }
    });
}
rotateContainer();