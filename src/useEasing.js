import parseEasingFunction from "./parseEasingFunction";

function useEasing(easing, func, argsFrom, argsTo, duration, origin, config) {
    if (!parseEasingFunction(false).includes(easing)) {
        easing = 'linear';
    }
    var mode = config.mode || 'diff';
    var complete = config.complete || function () { };
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
    var arr = [...valuesFrom];
    function animate() {
        var currentTime = Date.now();
        var over = currentTime - startTime > duration ? true : false;
        var currentPercent = over == true ? 1 : (currentTime - startTime) / duration;
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
            applyArgs.push(mode == 'based' ? getValue(from, valuesTo[i], currentPercent, mode) : getValue(from, valuesTo[i], currentPercent, mode) - getValue(from, valuesTo[i], lastPercent, mode))// : getValue(from, valuesTo[i], currPercent));
            if (mode == 'based') {
                arr[i] = getValue(from, valuesTo[i], currentPercent, mode)
            } else {
                arr[i] += getValue(from, valuesTo[i], currentPercent, mode) - getValue(from, valuesTo[i], lastPercent, mode);
            }
        })
        func.apply(origin, applyArgs);
        if (over == true) {
            complete();
            cancelAnimationFrame(animate);
            // console.log(arr)
            return;
        }
        requestAnimationFrame(animate);
    }
    animate();
}

export default useEasing;