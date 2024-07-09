var position = {
    x: 0,
    y: 0
}

const mouseCoordinate = {
    name: 'mouse-coordinate',
    init: (api) => {
        api.on('mousemove', (e) => {
            position = {
                x: e.x,
                y: e.y
            }
        })
    },
    execute: (api) => {
        CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius, config = {}) {
            api.ctx.save();
            api.ctx.beginPath();
            api.ctx.moveTo(x + radius, y);
            api.ctx.lineTo(x + width - radius, y);
            api.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            api.ctx.lineTo(x + width, y + height - radius);
            api.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            api.ctx.lineTo(x + radius, y + height);
            api.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            api.ctx.lineTo(x, y + radius);
            api.ctx.quadraticCurveTo(x, y, x + radius, y);
            api.ctx.closePath();
            api.ctx.fillStyle = config.background || "#000";
            api.ctx.strokeStyle = config.border || "#000";
            api.ctx.fill();
            api.ctx.stroke();
            api.ctx.restore();
        }
        CanvasRenderingContext2D.prototype.autoPosition = function (x, y, width, height, margin = 8) {
            var translateX = 0;
            var translateY = 0;
            if (x + width + margin > this.canvas.offsetWidth) {
                translateX = x - (((x - width - margin) > this.canvas.offsetWidth - width - margin ? this.canvas.offsetWidth : x) - width - margin);
            }
            if (x - margin < 0) {
                translateX = x - margin;
            }
            if (y + height + margin > this.canvas.offsetHeight) {
                translateY = y - (((y - height - margin) > this.canvas.offsetHeight - height - margin ? this.canvas.offsetHeight : y) - height - margin);
            }
            if (y - margin < 0) {
                translateY = y - margin;
            }
            this.translate(-translateX, -translateY);
        }
        CanvasRenderingContext2D.prototype.textBlock = function (text, x, y, padding, radius, config = {}) {
            this.save();
            this.beginPath();
            this.font = `${config.fontSize}px ${config.fontFamily}`;
            this.textBaseline = 'middle';
            const textMetrics = this.measureText(text);
            const width = textMetrics.width;
            const height = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
            const rectSize = {
                width: width + padding.left + padding.right,
                height: height + padding.top + padding.bottom
            }
            if (config.align == 'center') {
                this.autoPosition(x - rectSize.width / 2, y, rectSize.width, rectSize.height);
                this.roundRect(x - rectSize.width / 2, y, rectSize.width, rectSize.height, radius, config);
                this.textAlign = 'center';
                this.fillText(text, x, y + (height + padding.top + padding.bottom) / 2);
            } else if (config.align == 'right') {
                this.autoPosition(x - rectSize.width, y, rectSize.width, rectSize.height);
                this.roundRect(x - rectSize.width, y, rectSize.width, rectSize.height, radius, config);
                this.fillText(text, x - rectSize.width + padding.left, y + (height + padding.top + padding.bottom) / 2);
            } else {
                this.autoPosition(x, y, rectSize.width, rectSize.height);
                this.roundRect(x, y, width + padding.left + padding.right, height + padding.top + padding.bottom, radius, config);
                this.fillText(text, x + padding.left, y + (height + padding.top + padding.bottom) / 2);
            }
            this.restore();
        }

        if (api.canvas.style.cursor != 'none') {
            api.canvas.style.cursor = 'none';
        }

        const cursorSize = 12;

        api.ctx.save();
        var path = new Path2D();
        var points = [[0, 0], [3, 1.2], [1.57, 1.57], [1.2, 3], [0, 0]];
        var minX = 0,
            minY = 0,
            maxX = 0,
            maxY = 0;
        points.forEach(point => {
            minX = Math.min(minX, point[0]);
            minY = Math.min(minY, point[1]);
            maxX = Math.max(maxX, point[0]);
            maxY = Math.max(maxY, point[1]);
        })
        path.moveTo(points[0][0], points[0][1]);
        points.forEach(arr => {
            path.lineTo(arr[0], arr[1]);
        })
        api.ctx.translate(position.x, position.y);
        // api.ctx.rotate(-45 * Math.PI / 180);
        const size = {
            width: maxX - minX,
            height: maxY - minY
        }
        const scaleFactor = cursorSize / Math.max(size.width, size.height);
        api.ctx.transform(scaleFactor, 0, 0, scaleFactor, 0, 0);
        // pi.ctx.translate(size.width / 2, size.height / 2);
        api.ctx.fillStyle = '#fbb1ff';
        api.ctx.fill(path);
        api.ctx.restore();

        const xDistance = cursorSize / 2 + 4;
        const yDistance = cursorSize / 2 + 4;
        api.ctx.textBlock(`(${position.x}, ${position.y})`, position.x + xDistance, position.y + yDistance, {
            left: 8,
            right: 8,
            top: 6,
            bottom: 6
        }, 6, {
            fontSize: 12,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
            background: '#fbb1ff',
            border: '#fbb1ff',
            align: 'left'
        });
    },
    zIndex: 9999999999
}

export default mouseCoordinate;