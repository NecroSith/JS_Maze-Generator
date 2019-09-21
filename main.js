'use strict';

const COLUMN_COUNT = 10,
    ROW_COUNT = 10,
    CELL_SIZE = 50,
    PADDING = 10,
    WALL_COLOR = 'black',
    SPACE_COLOR = 'white';

const canvas = document.querySelector('canvas'),
    context = canvas.getContext('2d'),
    map = createMap(),
    tracker = { x: 0, y: 0 };

init();
console.log(isWall(2, 2))

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
    drawMap();
    drawTracker();
    moveTracker();
    requestAnimationFrame(tick);
}

function clearCanvas() {
    drawRectangle(WALL_COLOR, 0, 0, canvas.width, canvas.height);
    drawRectangle(SPACE_COLOR, PADDING, PADDING, canvas.width - PADDING * 2, canvas.height - PADDING * 2);
}

function createMap() {
    let map = [];
    for (let i = 0; i < COLUMN_COUNT; i++) {
        let columns = [];
        for (let j = 0; j < ROW_COUNT; j++) {
            columns.push('wall');
        }
        map.push(columns);
    }
    return map;
}

function drawMap() {
    for (let i = 0; i < COLUMN_COUNT; i++) {
        for (let j = 0; j < ROW_COUNT; j++) {
            drawRectangle(WALL_COLOR, PADDING + i * CELL_SIZE, PADDING + j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
}

function drawTracker() {
    drawRectangle('red', PADDING + tracker.x * CELL_SIZE, PADDING + tracker.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function moveTracker() {
    let directions = [];

    if (tracker.x > 0) {
        directions.push('left');
    }
    if (tracker.x < COLUMN_COUNT - 1) {
        directions.push('right');
    }
    if (tracker.y > 0) {
        directions.push('up');
    }
    if (tracker.y < ROW_COUNT - 1) {
        directions.push('down');
    }

    const direction = getRandomFrom(directions);
    console.log(direction);


    switch (direction) {
        case 'left':
            if (isWall(tracker.x - 2, tracker.y)) {
                setSpace(tracker.x - 1, tracker.y);
                setSpace(tracker.x - 2, tracker.y);
            }
            tracker.x -= 2;
            break;
        case 'right':
            if (isWall(tracker.x + 2, tracker.y)) {
                setSpace(tracker.x + 1, tracker.y);
                setSpace(tracker.x + 2, tracker.y);
            }
            tracker.x += 2;
            break;
        case 'up':
            if (isWall(tracker.x, tracker.y - 2)) {
                setSpace(tracker.x, tracker.y - 1);
                setSpace(tracker.x, tracker.y - 2);
            }
            tracker.y -= 2;
            break;
        case 'down':
            if (isWall(tracker.x, tracker.y + 2)) {
                setSpace(tracker.x, tracker.y + 1);
                setSpace(tracker.x, tracker.y + 2);
            }
            tracker.y += 2;
            break;
    }
}

function getRandomFrom(input) {
    return input[Math.floor(Math.random() * input.length - 1) + 1];
}

function isWall(x, y) {
    console.log(x + ": " + y);
    if (map[x][y] === 'wall') {
        return true;
    } else {
        return false;
    }
}

function setSpace(x, y) {
    // drawRectangle(SPACE_COLOR, x, y, CELL_SIZE, CELL_SIZE);
    map[x][y] = 'space';
}

function drawRectangle(fillColor, startX, startY, endX, endY) {
    context.fillStyle = fillColor;
    context.beginPath();
    context.rect(startX, startY, endX, endY);
    context.fill();
}