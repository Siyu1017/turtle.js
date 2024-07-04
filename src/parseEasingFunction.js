function parseEasingFunction(easing) {
    const easingFunctions = {
        ease: t => t * t * (3 - 2 * t),
        'ease-in': t => t * t,
        'ease-out': t => 1 - (1 - t) * (1 - t),
        'ease-in-out': t => t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t),
        'tep-start': t => 0,
        'tep-end': t => t >= 1 ? 1 : 0,
        linear: function (x) {
            return x;
        },
        easeInQuad: function (x) {
            return x * x;
        },
        easeOutQuad: function (x) {
            return 1 - (1 - x) * (1 - x);
        },
        easeInOutQuad: function (x) {
            return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
        },
        easeInCubic: function (x) {
            return x * x * x;
        },
        easeOutCubic: function (x) {
            return 1 - Math.pow(1 - x, 3);
        },
        easeInOutCubic: function (x) {
            return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
        },
        easeInQuart: function (x) {
            return x * x * x * x;
        },
        easeOutQuart: function (x) {
            return 1 - Math.pow(1 - x, 4);
        },
        easeInOutQuart: function (x) {
            return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
        },
        easeInQuint: function (x) {
            return x * x * x * x * x;
        },
        easeOutQuint: function (x) {
            return 1 - Math.pow(1 - x, 5);
        },
        easeInOutQuint: function (x) {
            return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
        },
        easeInSine: function (x) {
            return 1 - Math.cos((x * Math.PI) / 2);
        },
        easeOutSine: function (x) {
            return Math.sin((x * Math.PI) / 2);
        },
        easeInOutSine: function (x) {
            return -(Math.cos(Math.PI * x) - 1) / 2;
        },
        easeInExpo: function (x) {
            return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
        },
        easeOutExpo: function (x) {
            return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
        },
        easeInOutExpo: function (x) {
            return x === 0
                ? 0
                : x === 1
                    ? 1
                    : x < 0.5
                        ? Math.pow(2, 20 * x - 10) / 2
                        : (2 - Math.pow(2, -20 * x + 10)) / 2;
        },
        easeInCirc: function (x) {
            return 1 - Math.sqrt(1 - Math.pow(x, 2));
        },
        easeOutCirc: function (x) {
            return Math.sqrt(1 - Math.pow(x - 1, 2));
        },
        easeInOutCirc: function (x) {
            return x < 0.5
                ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
                : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
        },
        easeInBack: function (x) {
            const c1 = 1.70158;
            const c2 = c1 * 1.525;
            const c3 = c1 + 1;
            return c3 * x * x * x - c1 * x * x;
        },
        easeOutBack: function (x) {
            const c1 = 1.70158;
            const c2 = c1 * 1.525;
            const c3 = c1 + 1;
            return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
        },
        easeInOutBack: function (x) {
            const c1 = 1.70158;
            const c2 = c1 * 1.525;
            const c3 = c1 + 1;
            return x < 0.5
                ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
                : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
        },
        easeInElastic: function (x) {
            return x === 0
                ? 0
                : x === 1
                    ? 1
                    : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * Math.PI / 3);
        },
        easeOutElastic: function (x) {
            return x === 0
                ? 0
                : x === 1
                    ? 1
                    : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * Math.PI / 3) + 1;
        },
        easeInOutElastic: function (x) {
            return x === 0
                ? 0
                : x === 1
                    ? 1
                    : x < 0.5
                        ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * Math.PI / 4.5)) / 2
                        : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * Math.PI / 4.5)) / 2 + 1;
        },
        easeInBounce: function (x) {
            return 1 - easingFunctions.easeOutBounce(1 - x);
        },
        easeOutBounce: function (x) {
            const n1 = 7.5625;
            const d1 = 2.75;
    
            if (x < 1 / d1) {
                return n1 * x * x;
            } else if (x < 2 / d1) {
                return n1 * (x -= 1.5 / d1) * x + 0.75;
            } else if (x < 2.5 / d1) {
                return n1 * (x -= 2.25 / d1) * x + 0.9375;
            } else {
                return n1 * (x -= 2.625 / d1) * x + 0.984375;
            }
        },
        easeInOutBounce: function (x) {
            return x < 0.5
                ? (1 - easingFunctions.easeOutBounce(1 - 2 * x)) / 2
                : (1 + easingFunctions.easeOutBounce(2 * x - 1)) / 2;
        }
    };

    if (easing == false) {
        return Object.keys(easingFunctions);
    }

    if (easing in easingFunctions) {
        return easingFunctions[easing];
    }

    if (easing.startsWith('cubic-bezier(')) {
        const bezierParams = easing.match(/cubic-bezier\(([^)]+)\)/)[1].split(',').map(Number);
        if (bezierParams.length !== 4) {
            throw new Error(`Invalid cubic-bezier parameters: ${easing}`);
        }
        const [x1, y1, x2, y2] = bezierParams;
        return t => {
            const t2 = t * t;
            const t3 = t2 * t;
            return (1 - 3 * x2 + 3 * x1) * t3 + (3 * x2 - 6 * x1) * t2 + (3 * x1) * t;
        };
    }

    if (easing.startsWith('steps(')) {
        const stepsParams = easing.match(/steps\(([^)]+)\)/)[1].split(',').map(Number);
        if (stepsParams.length < 2) {
            throw new Error(`Invalid steps parameters: ${easing}`);
        }
        const [n, startOrEnd] = stepsParams;
        return t => {
            const step = Math.floor(t * n);
            return startOrEnd === 1 ? step / n : (step + 1) / n;
        };
    }

    if (easing.startsWith('frames(')) {
        const framesParams = easing.match(/frames\(([^)]+)\)/)[1].split(',').map(Number);
        if (framesParams.length < 1) {
            throw new Error(`Invalid frames parameters: ${easing}`);
        }
        const n = framesParams[0];
        return t => {
            const frame = Math.floor(t * n);
            return frame / n;
        };
    }

    console.warn(`Unsupported easing function: ${easing}`);

    return t => t;
}

export default parseEasingFunction;

/*
const easingFunctions = {
    linear: function (x) {
        return x;
    },
    easeInQuad: function (x) {
        return x * x;
    },
    easeOutQuad: function (x) {
        return 1 - (1 - x) * (1 - x);
    },
    easeInOutQuad: function (x) {
        return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    },
    easeInCubic: function (x) {
        return x * x * x;
    },
    easeOutCubic: function (x) {
        return 1 - Math.pow(1 - x, 3);
    },
    easeInOutCubic: function (x) {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    },
    easeInQuart: function (x) {
        return x * x * x * x;
    },
    easeOutQuart: function (x) {
        return 1 - Math.pow(1 - x, 4);
    },
    easeInOutQuart: function (x) {
        return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
    },
    easeInQuint: function (x) {
        return x * x * x * x * x;
    },
    easeOutQuint: function (x) {
        return 1 - Math.pow(1 - x, 5);
    },
    easeInOutQuint: function (x) {
        return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
    },
    easeInSine: function (x) {
        return 1 - Math.cos((x * Math.PI) / 2);
    },
    easeOutSine: function (x) {
        return Math.sin((x * Math.PI) / 2);
    },
    easeInOutSine: function (x) {
        return -(Math.cos(Math.PI * x) - 1) / 2;
    },
    easeInExpo: function (x) {
        return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
    },
    easeOutExpo: function (x) {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    },
    easeInOutExpo: function (x) {
        return x === 0
            ? 0
            : x === 1
                ? 1
                : x < 0.5
                    ? Math.pow(2, 20 * x - 10) / 2
                    : (2 - Math.pow(2, -20 * x + 10)) / 2;
    },
    easeInCirc: function (x) {
        return 1 - Math.sqrt(1 - Math.pow(x, 2));
    },
    easeOutCirc: function (x) {
        return Math.sqrt(1 - Math.pow(x - 1, 2));
    },
    easeInOutCirc: function (x) {
        return x < 0.5
            ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
            : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
    },
    easeInBack: function (x) {
        const c1 = 1.70158;
        const c2 = c1 * 1.525;
        const c3 = c1 + 1;
        return c3 * x * x * x - c1 * x * x;
    },
    easeOutBack: function (x) {
        const c1 = 1.70158;
        const c2 = c1 * 1.525;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    },
    easeInOutBack: function (x) {
        const c1 = 1.70158;
        const c2 = c1 * 1.525;
        const c3 = c1 + 1;
        return x < 0.5
            ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
            : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
    },
    easeInElastic: function (x) {
        return x === 0
            ? 0
            : x === 1
                ? 1
                : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * Math.PI / 3);
    },
    easeOutElastic: function (x) {
        return x === 0
            ? 0
            : x === 1
                ? 1
                : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * Math.PI / 3) + 1;
    },
    easeInOutElastic: function (x) {
        return x === 0
            ? 0
            : x === 1
                ? 1
                : x < 0.5
                    ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * Math.PI / 4.5)) / 2
                    : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * Math.PI / 4.5)) / 2 + 1;
    },
    easeInBounce: function (x) {
        return 1 - easingFunctions.easeOutBounce(1 - x);
    },
    easeOutBounce: function (x) {
        const n1 = 7.5625;
        const d1 = 2.75;

        if (x < 1 / d1) {
            return n1 * x * x;
        } else if (x < 2 / d1) {
            return n1 * (x -= 1.5 / d1) * x + 0.75;
        } else if (x < 2.5 / d1) {
            return n1 * (x -= 2.25 / d1) * x + 0.9375;
        } else {
            return n1 * (x -= 2.625 / d1) * x + 0.984375;
        }
    },
    easeInOutBounce: function (x) {
        return x < 0.5
            ? (1 - easingFunctions.easeOutBounce(1 - 2 * x)) / 2
            : (1 + easingFunctions.easeOutBounce(2 * x - 1)) / 2;
    }
};
*/