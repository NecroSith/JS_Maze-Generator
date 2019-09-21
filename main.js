'use strict';

const COLUMN_COUNT = 41,
    ROW_COUNT = 41,
    CELL_SIZE = 10,
    PADDING = 10,
    TRACKER_COUNT = document.querySelector('.trackers').value,
    WALL_COLOR = 'black',
    SPACE_COLOR = 'white';

const canvas = document.querySelector('canvas'),
    context = canvas.getContext('2d'),
    startBtn = document.querySelector('.start'),
    map = createMap(),
    trackers = [];

clearCanvas();
startBtn.addEventListener('click', function() {
    init();
    start();
})

function init() {
    canvas.width = PADDING * 2 + COLUMN_COUNT * CELL_SIZE;
    canvas.height = PADDING * 2 + ROW_COUNT * CELL_SIZE;

    console.log(canvas.width);
    console.log(canvas.height);

    for (let i = 1; i <= TRACKER_COUNT; i++) {
        // if (i % 4 === 0) {
        //     console.log('4 check');
        //     trackers.push({ x: 0, y: ROW_COUNT - 1 });
        // } else if (i % 3 === 0) {
        //     console.log('3 check');
        //     trackers.push({ x: COLUMN_COUNT - 1, y: ROW_COUNT - 1 });
        // } else if (i % 2 === 0) {
        //     console.log('2 check');
        //     trackers.push({ x: COLUMN_COUNT - 1, y: 5 });
        // } else {
        //     console.log('1 check');
        trackers.push({ x: 0, y: 0 });
        // }
    }
}

function start() {
    requestAnimationFrame(tick);
}

function tick(timestamp) {
    moveTrackers();

    clearCanvas();
    drawMap();

    if (!mazeFinished()) {
        drawTrackers();
        requestAnimationFrame(tick);
    }
}

function clearCanvas() {
    drawRectangle(WALL_COLOR, 0, 0, canvas.width, canvas.height);
    // drawRectangle(SPACE_COLOR, PADDING, PADDING, canvas.width - PADDING * 2, canvas.height - PADDING * 2);
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
            if (isWall(i, j)) {
                drawRectangle(WALL_COLOR, PADDING + i * CELL_SIZE, PADDING + j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            } else {
                drawRectangle(SPACE_COLOR, PADDING + i * CELL_SIZE, PADDING + j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }

        }
    }
}

function drawTrackers() {
    for (const tracker of trackers) {
        drawRectangle('red', PADDING + tracker.x * CELL_SIZE, PADDING + tracker.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
}

function moveTrackers() {
    for (const tracker of trackers) {
        let directions = [];

        if (tracker.x > 0) {
            directions.push('left');
        }
        if (tracker.x < COLUMN_COUNT - 2) {
            directions.push('right');
        }
        if (tracker.y > 0) {
            directions.push('up');
        }
        if (tracker.y < ROW_COUNT - 2) {
            directions.push('down');
        }

        const direction = getRandomFrom(directions);

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
}

function getRandomFrom(input) {
    return input[Math.floor(Math.random() * input.length - 1) + 1];
}

function isWall(x, y) {
    return map[x][y] === 'wall';
}

function isEven(value) {
    return value % 2 === 0;
}

function setSpace(x, y) {
    map[x][y] = 'space';
}

function drawRectangle(fillColor, startX, startY, endX, endY) {
    context.fillStyle = fillColor;
    context.beginPath();
    context.rect(startX, startY, endX, endY);
    context.fill();
}

function mazeFinished() {
    for (let i = 0; i < COLUMN_COUNT; i++) {
        for (let j = 0; j < ROW_COUNT; j++) {
            if (isEven(i) && isEven(j) && isWall(i, j)) {
                return false;
            }
        }
    }
    return true;
}