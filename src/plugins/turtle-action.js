var action = {};

const turtleAction = {
    name: 'turtle-action',
    init: (api) => {
        api.on('start', (e) => { action = e });
    },
    execute: (api) => {
        CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius, config = {}) {
            this.save();
            this.beginPath();
            this.moveTo(x + radius, y);
            this.lineTo(x + width - radius, y);
            this.quadraticCurveTo(x + width, y, x + width, y + radius);
            this.lineTo(x + width, y + height - radius);
            this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            this.lineTo(x + radius, y + height);
            this.quadraticCurveTo(x, y + height, x, y + height - radius);
            this.lineTo(x, y + radius);
            this.quadraticCurveTo(x, y, x + radius, y);
            this.closePath();
            this.fillStyle = config.background || "#000";
            this.strokeStyle = config.border || "#000";
            this.fill();
            this.stroke();
            this.restore();
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
                this.roundRect(x - rectSize.width / 2, y, rectSize.width, rectSize.height, radius, config);
                this.textAlign = 'center';
                this.fillText(text, x, y + (height + padding.top + padding.bottom) / 2);
            } else if (config.align == 'right') {
                this.roundRect(x - rectSize.width, y, rectSize.width, rectSize.height, radius, config);
                this.fillText(text, x - rectSize.width + padding.left, y + (height + padding.top + padding.bottom) / 2);
            } else {
                this.roundRect(x, y, width + padding.left + padding.right, height + padding.top + padding.bottom, radius, config);
                this.fillText(text, x + padding.left, y + (height + padding.top + padding.bottom) / 2);
            }
            this.restore();
        }

        if (action.name) {
            var gap = api.config.shapeSize / 2 + 4;
            api.ctx.textBlock(`turtle.${action.name}()`, api.animateDatas.x, api.animateDatas.y + gap, {
                left: 8,
                right: 8,
                top: 6,
                bottom: 6
            }, 6, {
                fontSize: 12,
                fontFamily: 'monospace',
                background: '#b1d9ff',
                border: '#b1d9ff',
                align: 'center'
            });
        }
    }
}

export default turtleAction;