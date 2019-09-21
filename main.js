'use strict';

const COLUMN_COUNT = 10;
const ROW_COUNT = 10;
const CELL_SIZE = 50;
const PADDING = 10;

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const map = createMap();

init();

function init() {
    canvas.width = PADDING * 2 + COLUMN_COUNT * CELL_SIZE;
    canvas.height = PADDING * 2 + ROW_COUNT * CELL_SIZE;
    start();
}

function start() {
    requestAnimationFrame(tick);
}

function tick(timestamp) {
    clearCanvas();
    requestAnimationFrame(tick);
}

function clearCanvas() {
    context.fillStyle = 'black';
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fill();

    context.fillStyle = 'white';
    context.beginPath();
    context.rect(PADDING, PADDING, canvas.width - PADDING * 2, canvas.height - PADDING * 2);
    context.fill();
}

function createMap() {
    let map = [];

    for (let i = 0; i < COLUMN_COUNT; i++) {
        let column = [];
        for (let j = 0; j < ROW_COUNT; j++) {
            column.push('wall');
        }
        map.push(column);
    }

    return map;
}