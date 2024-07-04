import parseEasingFunction from "./parseEasingFunction";

function useEasing(easing, func, argsFrom, argsTo, duration, origin, config) {
    if (!parseEasingFunction(false).includes(easing)) {
        easing = 'linear';
    }
    var mode = config.mode || 'diff';
    var complete = config.complete || function() {};
    var parser = parseEasingFunction(easing);
    function getValue(from, to, percent, mode) {
        var all = to - from;
        return mode == 'diff' ? all * parser(percent) : from + all * parser(percent);
    }
    var startTime = Date.now();
    var valuesFrom = Object.values(argsFrom);
    var valuesTo = Object.values(argsTo);
    /*
    var baseArgs = [];
    Object.keys(argsFrom).forEach(key => {
        baseArgs[key] = argsTo[key] - argsFrom[key];
    });*/
    var lastTime = startTime;
    function animate() {
        var currentTime = Date.now();
        if (currentTime - startTime > duration) {
            currentTime = startTime + duration;
        }
        var currPercent = (currentTime - startTime) / duration;
        var lastPercent = (lastTime - startTime) / duration;
        lastTime = currentTime;
        var applyArgs = [];
        /*
        Object.keys(baseArgs).forEach((key, i) => {
            applyArgs.push(baseArgs[key] * (parser(currPercent) - parser(lastPercent)));
        })
            */
        valuesFrom.forEach((from, i) => {
            // console.log(getValue(from, valuesTo[i], currPercent, mode), getValue(from, valuesTo[i], lastPercent, mode))
            applyArgs.push(mode == 'based' ? getValue(from, valuesTo[i], currPercent, mode) : getValue(from, valuesTo[i], currPercent, mode) - getValue(from, valuesTo[i], lastPercent, mode))// : getValue(from, valuesTo[i], currPercent));
        })
        func.apply(origin, applyArgs);
        if (currentTime - startTime == duration) {
            complete();
            cancelAnimationFrame(animate);
            return;
        }
        requestAnimationFrame(animate);
    }
    animate();
}

export default useEasing;