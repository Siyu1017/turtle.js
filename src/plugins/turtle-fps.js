var lastTime = Date.now();
var fps = 0;
var showFPS = 0;

const turtleFps = {
    name: 'turtle-fps',
    init: (api) => {

    },
    execute: (api) => {
        var now = Date.now();
        if (now - lastTime > 1000) {
            showFPS = fps;
            lastTime = now;
            fps = 0;
        } else {
            fps++;
        }
        api.ctx.save();
        api.ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif';
        api.ctx.textAlign = 'right';
        api.ctx.fillText(`FPS : ${showFPS}`, api.canvas.offsetWidth - 16, 32);
        api.ctx.restore();
    }
}

export default turtleFps;