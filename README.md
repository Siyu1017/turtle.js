# turtle.js

JavaScript version of turtle graphics

[![npm version](https://img.shields.io/npm/v/@siyu971017/turtle.js.svg?style=flat-square)](https://www.npmjs.org/package/@siyu971017/turtle.js)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@siyu971017/turtle.js?style=flat-square)](https://bundlephobia.com/package/@siyu971017/turtle.js@latest)
[![npm downloads](https://img.shields.io/npm/dm/@siyu971017/turtle.js.svg?style=flat-square)](https://npm-stat.com/charts.html?package=@siyu971017/turtle.js)
[![Known Vulnerabilities](https://snyk.io/test/npm/@siyu971017/turtle.js/badge.svg)](https://snyk.io/test/npm/@siyu971017/turtle.js)

## Install
Use npm

```
$ npm install @siyu971017/turtle.js
```

Or grab from [jsDelivr CDN](https://www.jsdelivr.com/package/npm/@siyu971017/turtle.js)

```html
<script src="https://cdn.jsdelivr.net/npm/@siyu971017/turtle.js@1.0/dist/turtle.umd.min.js"></script>
```

## Usage

1. Import the turtle

    ```js
    import turtle from '@siyu971017/turtle.js';
    ```
2. Call the turtle-function after the target canvas element has loaded

    ```js
    var t = new turtle(canvasElement);
    ```

## Methods
See [Docs](./DOCS.md) for more information

有關更多信息，請參閱[中文版文檔](./DOCS_ZH.md)

## Examples

### Draw a triangle
```js
for (let i = 0; i < 3; i++) {
    t.forward(50);
    t.right(120);
}
```

### Draw a square
```js
for (let i = 0; i < 4; i++) {
    t.forward(50);
    t.right(90);
}
```

### Draw a regular polygon with any number of sides
```js
function drawRegularPolygon(sides) {
    if (sides < 3) {
        sides = 3;
    }
    for (let i = 0; i < sides; i++) {
        t.forward(50);
        t.right(360 / sides);
    } 
}

drawRegularPolygon(6);
```
