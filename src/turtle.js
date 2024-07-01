'use strict';

import pkg from '../package.json';

class turtle {
    defaultstate = {
        penDown: true,
        filling: false,
        shape: 'turtle',
        size: 10,
        color: '#000',
        fillColor: '#000',
        penSize: 1,
        position: {
            x: 0,
            y: 0
        },
        heading: 0
    }
    state = {
        penDown: true,
        filling: false,
        shape: 'turtle',
        size: 10,
        color: '#000',
        fillColor: '#000',
        penSize: 1,
        position: {
            x: 0,
            y: 0
        },
        heading: 0
    }
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        canvasClarifier(this.canvas, this.ctx);
        /*
        this.ctx.arc(this.canvas.offsetWidth / 2, this.canvas.offsetHeight / 2, 5, 0, Math.PI * 2);
        this.ctx.fill();
        */
        this.goto(this.canvas.offsetWidth / 2, this.canvas.offsetHeight / 2);
        this.pendown();
    }
    // Actions
    forward(value) {
        const theta = Math.PI / 180 * (this.state.heading % 90);
        if (this.state.heading < 90 && this.state.heading > 0) {
            this.state.position.x += Math.cos(theta) * value;
            this.state.position.y += Math.sin(theta) * value;
        } else if (this.state.heading > 270 && this.state.heading < 360) {
            this.state.position.x += Math.sin(theta) * value;
            this.state.position.y -= Math.cos(theta) * value;
        } else if (this.state.heading > 90 && this.state.heading < 180) {
            this.state.position.x -= Math.sin(theta) * value;
            this.state.position.y += Math.cos(theta) * value;
        } else if (this.state.heading > 180 && this.state.heading < 270) {
            this.state.position.x -= Math.cos(theta) * value;
            this.state.position.y -= Math.sin(theta) * value;
        } else {
            if (this.state.heading == 90) {
                this.state.position.y += value;
            } else if (this.state.heading == 180) {
                this.state.position.x -= value;
            } else if (this.state.heading == 270) {
                this.state.position.y -= value;
            } else {
                this.state.position.x += value;
            }
        }
        this.ctx.lineTo(this.state.position.x, this.state.position.y);
        if (this.state.penDown == true) {
            this.ctx.stroke();
        }
    }
    backward(value) {
        return this.forward(-value);
    }
    right(value) {
        this.state.heading += value;
        if (this.state.heading > 360) {
            this.state.heading = this.state.heading % 360;
        }
    }
    left(value) {
        this.state.heading -= value;
        if (this.state.heading < 0) {
            this.state.heading = this.state.heading % 360;
        }
    }
    goto(x, y) {
        this.state.position.x = x;
        this.state.position.y = y;
        this.ctx.moveTo(this.state.position.x, this.state.position.y);
        if (this.state.penDown == true) {
            this.ctx.stroke();
        }
    }
    teleport(x, y) {
        this.state.position.x = x;
        this.state.position.y = y;
        this.ctx.moveTo(this.state.position.x, this.state.position.y);
    }
    setx(value) {
        this.state.position.x = value;
        this.ctx.moveTo(this.state.position.x, this.state.position.y);
    }
    sety(value) {
        this.state.position.y = value;
        this.ctx.moveTo(this.state.position.x, this.state.position.y);
    }
    setheading(angle) {
        this.state.heading = angle;
    }
    home() {
        this.teleport(this.canvas.offsetWidth / 2, this.canvas.offsetHeight / 2);
        this.state.heading = 0;
    }
    circle(radius, startAngle = 0, endAngle = 360) {
        this.ctx.arc(this.state.position.x, this.state.position.y, radius, Math.PI / 180 * startAngle, Math.PI / 180 * endAngle);
        this.ctx.stroke();
    }
    dot(size, color) {
        if (!size || size <= 0) {
            size = Math.max(this.state.penSize + 4, this.state.penSize * 2);
        }
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.arc(this.state.position.x, this.state.position.y, size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
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
        return {
            x: this.state.position.x,
            y: this.state.position.y
        };
    }
    towards() {
        return unsupported('towards');
    }
    xcor() {
        return this.state.position.x;
    }
    ycor() {
        return this.state.position.y;
    }
    heading() {
        return this.state.heading;
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
        this.state.penDown = true;
        this.updatestate();
    }
    penup() {
        this.state.penDown = false;
        this.updatestate();
    }
    pensize(width) {
        if (!width) return this.state.penSize;
        if (width <= 0) return;
        this.state.penSize = width;
        this.updatestate();
    }
    pen() {
        return unsupported('pen');
    }
    isdown() {
        return this.state.penDown;
    }
    pencolor(color) {
        if (!color) return this.state.color;
        this.state.color = color;
        this.updatestate();
    }
    fillcolor(color) {
        if (!color) return this.state.fillColor;
        this.state.fillColor = color;
        this.updatestate();
    }
    color(color) {
        if (!color) {
            return {
                pencolor: this.state.color,
                fillcolor: this.state.fillColor
            };
        }
        this.pencolor(color);
        this.fillcolor(color);
    }
    filling() {
        return this.state.filling;
    }
    begin_fill() {
        this.state.filling = true;
        this.updatestate();
    }
    end_fill() {
        this.state.filling = false;
        this.updatestate();
    }
    reset() {
        canvasClarifier(this.canvas, this.ctx);
        this.state = this.defaultstate();
        this.updatestate();
        this.home();
    }
    clear() {
        return unsupported('clear');
    }
    write(arg, move = false, align = 'left', font) {
        this.ctx.font = font;
        this.ctx.textAlign = align;
        this.ctx.fillStyle = this.state.color;
        this.ctx.fillText(arg, this.state.position.x, this.state.position.y);
    }
    // Visibility
    showturtle() {
        return unsupported('showturtle');
    }
    hideturtle() {
        return unsupported('hideturtle');
    }
    isvisible() {
        return unsupported('isvisible');
    }
    // Appearance
    shape(name) {
        return unsupported('shape');
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
    updatestate() {
        this.ctx.strokeStyle = this.state.color;
        this.ctx.lineWidth = this.state.penSize;
        this.ctx.fillStyle = this.state.fillColor;
    }
    // Events
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

function canvasClarifier(canvas, ctx) {
    var ratio = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    ctx.scale(ratio, ratio);
}