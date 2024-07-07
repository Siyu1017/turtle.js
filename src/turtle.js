'use strict';

import pkg from '../package.json';
import useEasing from './useEasing';

class turtle {
    version = pkg.version;
    defaultState = {
        penDown: true,
        filling: false,
        position: {
            x: 0,
            y: 0
        },
        heading: 0
    }
    defaultConfig = {
        shape: 'classic',
        shapeSize: 18,
        shapeColor: '#000',
        shapeVisible: true,
        penSize: 1,
        penColor: '#000',
        fillColor: '#000',
        backgroundColor: '#fff',
        transitionDuration: 500,
        transitionEasingFunction: 'easeInOutCirc',
        lineCap: 'round',
        lineJoin: 'round'
    }
    config = {
        shape: 'classic',
        shapeSize: 18,
        shapeColor: '#000',
        shapeVisible: true,
        penSize: 1,
        penColor: '#000',
        fillColor: '#000',
        backgroundColor: '#fff',
        transitionDuration: 500,
        transitionEasingFunction: 'easeInOutCirc',
        lineCap: 'round',
        lineJoin: 'round'
    }
    state = {
        penDown: true,
        filling: false,
        position: {
            x: 0,
            y: 0
        },
        heading: 0,
        speed: 5
    }
    shapes = {
        "arrow": {
            type: "polygon",
            points: [[-10, 0], [10, 0], [0, 10]]
        },
        "turtle": {
            type: "polygon",
            points: [
                [0, 16], [-2, 14], [-1, 10], [-4, 7],
                [-7, 9], [-9, 8], [-6, 5], [-7, 1], [-5, -3], [-8, -6],
                [-6, -8], [-4, -5], [0, -7], [4, -5], [6, -8], [8, -6],
                [5, -3], [7, 1], [6, 5], [9, 8], [7, 9], [4, 7], [1, 10],
                [2, 14]
            ]
        },
        "circle": {
            type: "polygon",
            points: [
                [10, 0], [9.51, 3.09], [8.09, 5.88],
                [5.88, 8.09], [3.09, 9.51], [0, 10], [-3.09, 9.51],
                [-5.88, 8.09], [-8.09, 5.88], [-9.51, 3.09], [-10, 0],
                [-9.51, -3.09], [-8.09, -5.88], [-5.88, -8.09],
                [-3.09, -9.51], [-0.00, -10.00], [3.09, -9.51],
                [5.88, -8.09], [8.09, -5.88], [9.51, -3.09]
            ]
        },
        "square": {
            type: "polygon",
            points: [[10, -10], [10, 10], [-10, 10], [-10, -10], [10, -10]]
        },
        "triangle": {
            type: "polygon",
            points: [[10, -5.77], [0, 11.55], [-10, -5.77]]
        },
        "classic": {
            type: "polygon",
            points: [[0, 0], [-5, -9], [0, -7], [5, -9]]
        }
    }
    actionQueue = [];
    imageData = null;
    animateDatas = {
        heading: 0,
        x: 0,
        y: 0
    }
    _saveImageData() {
        this.imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        return this;
    }
    _restoreImageData() {
        if (this.imageData) this.ctx.putImageData(this.imageData, 0, 0);
        return this;
    }
    _getComputedDistance(value, heading) {
        if (!heading) {
            heading = this.state.heading;
        }
        var distance = {
            x: 0,
            y: 0
        }
        const theta = Math.PI / 180 * (heading % 90);
        if (heading < 90 && heading > 0) {
            distance.x += Math.cos(theta) * value;
            distance.y += Math.sin(theta) * value;
        } else if (heading > 270 && heading < 360) {
            distance.x += Math.sin(theta) * value;
            distance.y -= Math.cos(theta) * value;
        } else if (heading > 90 && heading < 180) {
            distance.x -= Math.sin(theta) * value;
            distance.y += Math.cos(theta) * value;
        } else if (heading > 180 && heading < 270) {
            distance.x -= Math.cos(theta) * value;
            distance.y -= Math.sin(theta) * value;
        } else {
            if (heading == 90) {
                distance.y += value;
            } else if (heading == 180) {
                distance.x -= value;
            } else if (heading == 270) {
                distance.y -= value;
            } else {
                distance.x += value;
            }
        }
        return distance;
    }
    _convertPositon(x, y, mode = 'a') {
        // Modes : [a, r]
        var width = this.ctx.canvas.width,
            height = this.ctx.canvas.height;
        // r : relative to center
        if (mode == 'r') {
            return {
                x: x - width / 2,
                y: y - height / 2
            }
        }
        // a : absolute value relative to the upper left corner of the canvas
        if (mode == 'a') {
            return {
                x: width / 2 + x,
                y: height / 2 + y
            }
        }
    }
    _getRealityPosition(x, y) {
        return this._convertPositon(x, y, 'a');
    }
    _getVirtualPosition(x, y) {
        return this._convertPositon(x, y, 'r');
    }
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
        canvasClarifier(this.canvas, this.ctx);
        this.state.position = {
            x: this.canvas.offsetWidth / 2,
            y: this.canvas.offsetHeight / 2
        };
        this.animateDatas.x = this.state.position.x;
        this.animateDatas.y = this.state.position.y;
        this.pendown();

        var lastTime = Date.now();
        var currentAction = 0;

        /*
        function drawShape() {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.translate(this.state.position.x, this.state.position.y);
            this.ctx.rotate((this.state.heading + 90) * Math.PI / 180);
            const storkeWidth = 1;
            this.ctx.strokeWidth = storkeWidth;
            this.ctx.moveTo(0, -this.config.shapeSize / 2 + storkeWidth);
            this.ctx.lineTo(-this.config.shapeSize / 2 + storkeWidth, this.config.shapeSize / 2 - storkeWidth);
            this.ctx.lineTo(0, this.config.shapeSize / 2 / 2);
            this.ctx.lineTo(this.config.shapeSize / 2 - storkeWidth, this.config.shapeSize / 2 - storkeWidth);
            this.ctx.lineTo(0, -this.config.shapeSize / 2 + storkeWidth);
            this.ctx.fillStyle = this.config.shapeColor;
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.restore();
        }
            */

        // var noAnimationActions = []

        function drawShape(name) {
            this.ctx.save();
            if (!this.shapes[name]) {
                name = 'classic';
            }
            var points = [...this.shapes[name].points];
            var path = new Path2D();
            path.moveTo(points[0][0], points[0][1]);
            points.shift();
            points.forEach(arr => {
                path.lineTo(arr[0], arr[1]);
            })
            this.ctx.translate(this.animateDatas.x, this.animateDatas.y);
            this.ctx.rotate((this.animateDatas.heading - 90) * Math.PI / 180);
            this.ctx.fillStyle = this.config.shapeColor;
            this.ctx.fill(path);
            this.ctx.restore();
        }

        function runAction(action) {
            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }

            var transitionActionsWithDistance = ['forward', 'backward'];
            var transitionActionsWithCoordinate = ['goto'];
            var transitionActionsWithAngle = ['left', 'right'];

            this._restoreImageData();
            this.ctx.save();
            this.ctx.lineWidth = this.config.penSize;
            this.ctx.lineCap = this.config.lineCap;
            this.ctx.lineJoin = this.config.lineJoin;
            this.ctx.strokeStyle = this.config.penColor;
            this.ctx.fillStyle = this.config.fillColor;
            var useTransition = false;
            if (transitionActionsWithDistance.concat(transitionActionsWithCoordinate).concat(transitionActionsWithAngle).includes(action.name)) {
                useTransition = true;
            }
            if (transitionActionsWithAngle.includes(action.name)) {
                // turtle.left
                // turtle.right
                if (action.name == 'left') {
                    this.state.heading -= Object.values(action.args)[0];
                } else {
                    this.state.heading += Object.values(action.args)[0];
                }
                if (this.state.heading > 360) {
                    this.state.heading = this.state.heading % 360;
                }
                useEasing(this.config.transitionEasingFunction, action.func, {
                    value: 0
                }, action.args, this.config.transitionDuration, this, {
                    mode: 'diff',
                    complete: (() => {
                        this.animateDatas.heading = this.state.heading;
                        action.complete ? action.complete() : null;
                    }).bind(this)
                })
            } else if (transitionActionsWithCoordinate.includes(action.name)) {
                // turtle.goto
                this.state.position.x = action.args[0];
                this.state.position.y = action.args[1];
                useEasing(this.config.transitionEasingFunction, action.func, {
                    x: this.animateDatas.x,
                    y: this.animateDatas.y
                }, action.args, this.config.transitionDuration, this, {
                    mode: 'based',
                    complete: (() => {
                        this.animateDatas.x = this.state.position.x;
                        this.animateDatas.y = this.state.position.y;
                        action.complete ? action.complete() : null;
                    }).bind(this)
                });
            } else if (transitionActionsWithDistance.includes(action.name)) {
                // turtle.forward
                // turtle.backward
                var distance = this._getComputedDistance(action.args[0]);
                this.state.position.x += distance.x;
                this.state.position.y += distance.y;
                useEasing(this.config.transitionEasingFunction, action.func, {
                    value: 0
                }, action.args, this.config.transitionDuration, this, {
                    mode: 'diff',
                    complete: (() => {
                        this.animateDatas.x = this.state.position.x;
                        this.animateDatas.y = this.state.position.y;
                        action.complete ? action.complete() : null;
                    }).bind(this)
                });
            } else if (action.func) {
                action.func.apply(this, Object.values(action.args));
            }
            if (!useTransition) {
                this.ctx.restore();
                this._saveImageData();
            }
        }

        function checkAction() {
            if (this.actionQueue.length > 0 && currentAction < this.actionQueue.length) {
                runAction(this.actionQueue[currentAction]);
                currentAction++;
                if (this.actionQueue.length > 0 && currentAction < this.actionQueue.length) {
                    if (this.actionQueue[currentAction - 1].type == 'control' || this.actionQueue[currentAction - 1].type == 'state' || this.actionQueue[currentAction - 1].type == 'teleport') {
                        checkAction();
                    }
                }
                // this.actionQueue.shift();
            }
        }

        function animate() {
            canvasClarifier(this.canvas, this.ctx);
            if (Date.now() - lastTime > this.config.transitionDuration) {
                checkAction();
                lastTime = Date.now();
            }
            this._restoreImageData();
            if (this.config.shapeVisible == true) {
                drawShape(this.config.shape);
            }
            requestAnimationFrame(() => animate());
        }
        checkAction = checkAction.bind(this);
        runAction = runAction.bind(this);
        drawShape = drawShape.bind(this);
        animate = animate.bind(this);
        animate();
    }
    // Methods specific to Turtle.js
    setlinecap(type) {
        return new Promise((resolve) => {
            this.actionQueue.push({
                type: 'control',
                name: 'setlinecap',
                args: [type],
                func: function (type) {
                    var types = [`round`, `butt`, `square`];
                    if (!types.includes(type)) {
                        type = types[0];
                    }
                    this.config.lineCap = type;
                    resolve(type);
                }
            })
        })
    }
    setlinejoin(type) {
        return new Promise((resolve) => {
            this.actionQueue.push({
                type: 'control',
                name: 'setlinejoin',
                args: [type],
                func: function (type) {
                    var types = [`round`, `bevel`, `miter`];
                    if (!types.includes(type)) {
                        type = types[0];
                    }
                    this.config.lineJoin = type;
                    resolve(type);
                }
            })
        })
    }
    seteasing(easing) {
        return new Promise((resolve) => {
            this.actionQueue.push({
                type: 'control',
                name: 'seteasing',
                args: [easing],
                func: function (easing) {
                    if (!parsetransitionEasingFunction(false).includes(easing)) {
                        return console.warn(`setheading(type)\ntypes : ${parsetransitionEasingFunction(false).join(', ')}`);
                    }
                    this.config.transitionEasingFunction = easing;
                    resolve(easing);
                }
            })
        })
    }
    setduration(duration) {
        return new Promise((resolve) => {
            this.actionQueue.push({
                type: 'control',
                name: 'setduration',
                args: [duration],
                func: function (duration) {
                    this.config.transitionDuration = duration;
                    resolve(duration);
                }
            })
        })
    }
    // Actions
    forward(value) {
        return new Promise((resolve) => {
            this.actionQueue.push({
                name: 'forward',
                args: [value],
                func: function (value) {
                    this._restoreImageData();
                    this.ctx.save();
                    this.ctx.lineWidth = this.config.penSize;
                    this.ctx.lineCap = this.config.lineCap;
                    this.ctx.lineJoin = this.config.lineJoin;
                    this.ctx.moveTo(this.animateDatas.x, this.animateDatas.y);
                    var distance = this._getComputedDistance(value);
                    this.animateDatas.x += distance.x;
                    this.animateDatas.y += distance.y;
                    this.ctx.lineTo(this.animateDatas.x, this.animateDatas.y);
                    if (this.state.penDown == true) {
                        this.ctx.stroke();
                    }
                    this.ctx.restore();
                    this._saveImageData();
                },
                complete: () => { resolve(this.state.position) }
            })
        })
    }
    backward(value) {
        return this.forward(-value);
    }
    right(value) {
        return new Promise((resolve) => {
            this.actionQueue.push({
                name: 'right',
                args: [value],
                func: function (value) {
                    this.animateDatas.heading += value;
                    if (this.animateDatas.heading > 360) {
                        this.animateDatas.heading = this.animateDatas.heading % 360;
                    }
                },
                complete: () => { resolve(this.state.heading) }
            })
        })
    }
    left(value) {
        return new Promise((resolve) => {
            this.actionQueue.push({
                name: 'left',
                args: [value],
                func: function (value) {
                    this.animateDatas.heading -= value;
                    if (this.animateDatas.heading < 0) {
                        this.animateDatas.heading = this.animateDatas.heading % 360;
                    }
                },
                complete: () => { resolve(this.state.heading) }
            })
        })
    }
    goto(x, y) {
        return new Promise((resolve) => {
            this.actionQueue.push({
                name: 'goto',
                args: [x, y],
                func: function (x, y) {
                    this.animateDatas.x = x;
                    this.animateDatas.y = y;
                    this.ctx.lineTo(this.animateDatas.x, this.animateDatas.y);
                    if (this.state.penDown == true) {
                        this.ctx.stroke();
                    }
                    this.ctx.moveTo(this.animateDatas.x, this.animateDatas.y);
                },
                complete: () => { resolve(this.state.position) }
            })
        })
    }
    teleport(x, y) {
        return new Promise((resolve) => {
            this.actionQueue.push({
                type: 'teleport',
                name: 'teleport',
                args: [x, y],
                func: function (x, y) {
                    this.state.position.x = x;
                    this.state.position.y = y;
                    this.animateDatas.x = x;
                    this.animateDatas.y = y;
                    this.ctx.moveTo(this.state.position.x, this.state.position.y);
                    resolve(this.state.position);
                }
            })
        })
    }
    setx(value) {
        return new Promise((resolve) => {
            this.actionQueue.push({
                name: 'setx',
                args: [value],
                func: function (value) {
                    this.state.position.x = value;
                    this.animateDatas.x = value;
                    this.ctx.moveTo(this.state.position.x, this.state.position.y);
                    resolve(this.state.position);
                }
            })
        })
    }
    sety(value) {
        return new Promise((resolve) => {
            this.actionQueue.push({
                name: 'sety',
                args: [value],
                func: function (value) {
                    this.state.position.y = value;
                    this.animateDatas.y = value;
                    this.ctx.moveTo(this.state.position.x, this.state.position.y);
                    resolve(this.state.position);
                }
            })
        })
    }
    setheading(angle) {
        return new Promise((resolve) => {
            this.actionQueue.push({
                name: 'setheading',
                args: [angle],
                func: function (angle) {
                    this.state.heading = angle;
                    this.animateDatas.heading = angle;
                    resolve(this.state.heading);
                }
            })
        })
    }
    home() {
        return new Promise((resolve) => {
            this.actionQueue.push({
                name: 'home',
                args: [],
                func: function () {
                    this.state.position.x = this.canvas.offsetWidth / 2;
                    this.state.position.y = this.canvas.offsetHeight / 2;
                    this.animateDatas.x = this.state.position.x;
                    this.animateDatas.y = this.state.position.y;
                    this.ctx.moveTo(this.state.position.x, this.state.position.y);
                    this.animateDatas.heading = 0;
                    this.state.heading = 0;
                    resolve(this.state);
                }
            })
        })
    }
    circle(radius, startAngle = 0, endAngle = 360) {
        return new Promise((resolve) => {
            this.actionQueue.push({
                name: 'circle',
                args: [radius, startAngle, endAngle],
                func: function (radius, startAngle = 0, endAngle = 360) {
                    this.ctx.arc(this.state.position.x, this.state.position.y, radius, Math.PI / 180 * startAngle, Math.PI / 180 * endAngle);
                    this.ctx.stroke();
                    resolve();
                }
            })
        })
    }
    dot(size, color) {
        return new Promise((resolve) => {
            this.actionQueue.push({
                name: 'dot',
                args: [size, color],
                func: function (size, color) {
                    if (!size || size <= 0) {
                        size = Math.max(this.config.penSize + 4, this.config.penSize * 2);
                    }
                    this.ctx.save();
                    this.ctx.beginPath();
                    this.ctx.fillStyle = color;
                    this.ctx.arc(this.state.position.x, this.state.position.y, size, 0, Math.PI * 2);
                    this.ctx.fill();
                    this.ctx.closePath();
                    this.ctx.restore();
                    resolve();
                }
            })
        })
    }
    stamp() {
        return unsupported('stamp');
    }
    clearstamp(id) {
        return unsupported('clearstamp');
    }
    clearstamps(n) {
        return unsupported('clearstamps');
    }
    undo() {
        return unsupported('undo');
    }
    redo() {
        return unsupported('redo');
    }
    speed(speed) {
        return unsupported('speed');
    }
    // state
    position() {
        return new Promise((resolve) => {
            this.actionQueue.push({
                type: 'state',
                name: 'position',
                args: [],
                func: function () {
                    return resolve({
                        x: this.state.position.x,
                        y: this.state.position.y
                    });
                }
            })
        })
    }
    towards() {
        return unsupported('towards');
    }
    xcor() {
        return new Promise((resolve) => {
            this.actionQueue.push({
                type: 'state',
                name: 'xcor',
                args: [],
                func: function () {
                    return resolve(this.state.position.x);
                }
            })
        })
    }
    ycor() {
        return new Promise((resolve) => {
            this.actionQueue.push({
                type: 'state',
                name: 'ycor',
                args: [],
                func: function () {
                    return resolve(this.state.position.y);
                }
            })
        })
    }
    heading() {
        return new Promise((resolve) => {
            this.actionQueue.push({
                type: 'state',
                name: 'heading',
                args: [],
                func: function () {
                    return resolve(this.state.heading);
                }
            })
        })
    }
    distance() {
        return unsupported('distance');
    }
    // Settings for measurement
    degrees(degrees) {
        return unsupported('degrees');
    }
    radians(radians) {
        return unsupported('radians');
    }
    // Control
    pendown() {
        return new Promise((resolve) => {
            this.actionQueue.push({
                type: 'control',
                name: 'pendown',
                args: [],
                func: function () {
                    this.state.penDown = true;
                    this._updatestate();
                    resolve(this.state.penDown);
                }
            })
        })
    }
    penup() {
        return new Promise((resolve) => {
            this.actionQueue.push({
                type: 'control',
                name: 'penup',
                args: [],
                func: function () {
                    this.state.penDown = false;
                    this._updatestate();
                    resolve(this.state.penDown);
                }
            })
        })
    }
    pensize(width) {
        if (!width) {
            return new Promise((resolve) => {
                this.actionQueue.push({
                    type: 'state',
                    name: 'pensize',
                    args: [],
                    func: function () {
                        return resolve(this.config.penSize);
                    }
                })
            })
        }
        return new Promise((resolve) => {
            this.actionQueue.push({
                type: 'control',
                name: 'pensize',
                args: [width],
                func: function (width) {
                    if (width <= 0) {
                        width = 1;
                    }
                    this.config.penSize = width;
                    this._updatestate();
                    resolve(this.config.penSize);
                }
            })
        })
    }
    pen() {
        return unsupported('pen');
    }
    isdown() {
        return new Promise((resolve) => {
            this.actionQueue.push({
                type: 'state',
                name: 'isdown',
                args: [],
                func: function () {
                    return resolve(this.state.penDown);
                }
            })
        })

    }
    pencolor(color) {
        if (!color) {
            return new Promise((resolve) => {
                this.actionQueue.push({
                    type: 'state',
                    name: 'pencolor',
                    args: [],
                    func: function () {
                        return resolve(this.config.penColor);
                    }
                })
            })
        }
        return new Promise((resolve) => {
            this.actionQueue.push({
                type: 'control',
                name: 'pencolor',
                args: [color],
                func: function (color) {
                    this.config.penColor = color;
                    this._updatestate();
                    resolve(this.config.penColor);
                }
            })
        })
    }
    fillcolor(color) {
        if (!color) {
            return new Promise((resolve) => {
                this.actionQueue.push({
                    type: 'state',
                    name: 'fillcolor',
                    args: [],
                    func: function () {
                        return resolve(this.config.fillColor);
                    }
                })
            })
        }
        return new Promise((resolve) => {
            this.actionQueue.push({
                type: 'control',
                name: 'fillcolor',
                args: [color],
                func: function (color) {
                    this.config.fillColor = color;
                    this._updatestate();
                    resolve(this.config.fillColor);
                }
            })
        })
    }
    color(color) {
        if (!color) {
            return new Promise((resolve) => {
                this.actionQueue.push({
                    type: 'state',
                    name: 'color',
                    args: [],
                    func: function () {
                        return resolve({
                            pencolor: this.config.penColor,
                            fillcolor: this.config.fillColor
                        });
                    }
                })
            })
        }
        return new Promise((resolve) => {
            this.actionQueue.push({
                type: 'control',
                name: 'color',
                args: [color],
                func: function (color) {
                    this.config.penColor = color;
                    this.config.fillColor = color;
                    this._updatestate();
                    resolve({
                        pencolor: this.config.penColor,
                        fillcolor: this.config.fillColor
                    })
                }
            })
        })
    }
    filling() {
        return new Promise((resolve) => {
            this.actionQueue.push({
                type: 'state',
                name: 'filling',
                args: [],
                func: function () {
                    return resolve(this.state.filling);
                }
            })
        })
    }
    begin_fill() {
        return new Promise((resolve) => {
            this.actionQueue.push({
                type: 'control',
                name: 'begin_fill',
                args: [],
                func: function () {
                    this.state.filling = true;
                    this._updatestate();
                    resolve(this.state.filling);
                }
            })
        })
    }
    end_fill() {
        return new Promise((resolve) => {
            this.actionQueue.push({
                type: 'control',
                name: 'end_fill',
                args: [],
                func: function () {
                    this.ctx.save();
                    this.ctx.fillStyle = this.config.fillColor;
                    this.ctx.closePath();
                    this.ctx.fill();
                    this.ctx.restore();
                    this.state.filling = false;
                    this._updatestate();
                    resolve(this.state.filling);
                }
            })
        })
    }
    reset() {
        return new Promise((resolve) => {
            this.actionQueue.push({
                // type: 'control',
                name: 'reset',
                args: [],
                func: function () {
                    canvasClarifier(this.canvas, this.ctx);
                    // this.imageData = null;
                    this.state = this.defaultState;
                    this.config = this.defaultConfig;
                    this.state.position.x = this.canvas.offsetWidth / 2;
                    this.state.position.y = this.canvas.offsetHeight / 2;
                    this.animateDatas.x = this.state.position.x;
                    this.animateDatas.y = this.state.position.y;
                    this.ctx.moveTo(this.state.position.x, this.state.position.y);
                    this.animateDatas.heading = 0;
                    this.state.heading = 0;
                    this._updatestate();
                    resolve({
                        state: this.state,
                        config: this.config
                    });
                }
            })
        })
    }
    clear() {
        return unsupported('clear');
    }
    write(arg, move = false, align = 'left', font) {
        return new Promise((resolve) => {
            this.actionQueue.push({
                name: 'write',
                args: [arg, move, align, font],
                func: function (arg, move = false, align = 'left', font) {
                    this.ctx.font = font;
                    this.ctx.textAlign = align;
                    this.ctx.fillStyle = this.config.penColor;
                    this.ctx.fillText(arg, this.state.position.x, this.state.position.y);
                    resolve();
                }
            })
        })
    }
    // Visibility
    showturtle() {
        return new Promise((resolve) => {
            this.actionQueue.push({
                type: 'control',
                name: 'showturtle',
                args: [],
                func: function () {
                    this.config.shapeVisible = true;
                    resolve(this.config.shapeVisible);
                }
            })
        })
    }
    hideturtle() {
        return new Promise((resolve) => {
            this.actionQueue.push({
                type: 'control',
                name: 'hideturtle',
                args: [],
                func: function () {
                    this.config.shapeVisible = false;
                    resolve(this.config.shapeVisible);
                }
            })
        })
    }
    isvisible() {
        return new Promise((resolve) => {
            this.actionQueue.push({
                type: 'state',
                name: 'isvisibl',
                args: [],
                func: function () {
                    return resolve(this.config.shapeVisible);
                }
            })
        })
    }
    // Appearance
    shape(name) {
        if (!name) {
            return new Promise((resolve) => {
                this.actionQueue.push({
                    type: 'state',
                    name: 'shape',
                    args: [],
                    func: function () {
                        return resolve(this.config.shape);
                    }
                })
            })
        }
        return new Promise((resolve) => {
            this.actionQueue.push({
                type: 'control',
                name: 'shape',
                args: [name],
                func: function (name) {
                    this.config.shape = name;
                    resolve(this.config.shape);
                }
            })
        })
    }
    resizemode(mode) {
        return unsupported('resizemode');
    }
    shapesize(width, length, outline) {
        return unsupported('shapesize');
    }
    shearfactor(shear) {
        return unsupported('shearfactor');
    }
    settiltangle(angle) {
        return unsupported('settiltangle');
    }
    tiltangle(angle) {
        return unsupported('tiltangle');
    }
    tilt(angle) {
        return unsupported('tilt');
    }
    shapetransform(t11, t12, t21, t22) {
        return unsupported('shapetransform');
    }
    get_shapepoly() {
        return unsupported('get_shapepoly');
    }
    // Update state
    _updatestate() {
        this.ctx.strokeStyle = this.config.penColor;
        this.ctx.lineWidth = this.config.penSize;
        this.ctx.fillStyle = this.config.fillColor;
    }
    // Events
    // -------------------------------------------------------------- //
    // Short functions
    fd = this.forward;
    bk = this.backward;
    back = this.backward;
    rt = this.right;
    lt = this.left;
    setpos = this.goto;
    setposition = this.goto;
    seth = this.setheading;
    pos = this.position;
    pd = this.pendown;
    down = this.pendown;
    pu = this.penup;
    up = this.penup;
    width = this.pensize;
    st = this.showturtle;
    ht = this.hideturtle;
}

export default turtle;
window.turtle = turtle;

/*
使用事件
onclick()
onrelease()
ondrag()
特殊海龟方法
begin_poly()
end_poly()
get_poly()
clone()
getturtle() | getpen()
getscreen()
setundobuffer()
undobufferentries()
TurtleScreen/Screen 方法
窗口控制
bgcolor()
bgpic()
clearscreen()
resetscreen()
screensize()
setworldcoordinates()
动画控制
delay()
tracer()
update()
使用屏幕事件
listen()
onkey() | onkeyrelease()
onkeypress()
onclick() | onscreenclick()
ontimer()
mainloop() | done()
设置与特殊方法
mode()
colormode()
getcanvas()
getshapes()
register_shape() | addshape()
turtles()
window_height()
window_width()
输入方法
textinput()
numinput()
Screen 专有方法
bye()
exitonclick()
setup()
title()
*/

function unsupported(name) {
    return console.warn(`turtle v${pkg.version} does not support ${name}\nLearn more : https://github.com/Siyu1017/turtle.js/DOCS.md`);
}

function canvasClarifier(canvas, ctx, width, height) {
    const originalSize = {
        width: (width ? width : canvas.offsetWidth),
        height: (height ? height : canvas.offsetHeight)
    }
    var ratio = window.devicePixelRatio || 1;
    canvas.width = originalSize.width * ratio;
    canvas.height = originalSize.height * ratio;
    ctx.scale(ratio, ratio);
    if (originalSize.width != canvas.offsetWidth || originalSize.height != canvas.offsetHeight) {
        canvas.style.width = originalSize.width + 'px';
        canvas.style.height = originalSize.height + 'px';
    }
}