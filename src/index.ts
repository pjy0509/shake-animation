import packageJSON from '../package.json';
import {Animations, ShakeAnimation, ShakeSpeed} from "./interfacecs";
import {GlobalThis} from "./utils";

export {Animations, ShakeAnimation, ShakeSpeed};

export class Shake {
    static instance: Map<HTMLElement[], Shake> = new Map();
    static version = packageJSON.version;

    static Cycle = class Cycle {
        constructor(public number: number) {
        }

        getDuration(speed: ShakeSpeed): number {
            return this.number * ({'slow': 1000, 'medium': 500, 'fast': 250}[speed]);
        }
    }

    private static animation: Animations = {
        'tilt': {
            0: {
                'transform': 'rotate(0deg);'
            },
            12.5: {
                'transform': 'rotate(5deg);'
            },
            25: {
                'transform': 'rotate(0deg);'
            },
            37.5: {
                'transform': 'rotate(-5deg);'
            },
            50: {
                'transform': 'rotate(0deg);'
            },
            62.5: {
                'transform': 'rotate(5deg);'
            },
            75: {
                'transform': 'rotate(0deg);'
            },
            87.5: {
                'transform': 'rotate(-5deg);'
            },
            100: {
                'transform': 'rotate(0deg);'
            }
        },
        'horizontal': {
            0: {
                'transform': 'translateX(0px);'
            },
            12.5: {
                'transform': 'translateX(5px);'
            },
            25: {
                'transform': 'translateX(0px);'
            },
            37.5: {
                'transform': 'translateX(-5px);'
            },
            50: {
                'transform': 'translateX(0px);'
            },
            62.5: {
                'transform': 'translateX(5px);'
            },
            75: {
                'transform': 'translateX(0px);'
            },
            87.5: {
                'transform': 'translateX(-5px);'
            },
            100: {
                'transform': 'translateX(0px);'
            }
        },
        'vertical': {
            0: {
                'transform': 'translateY(0px);'
            },
            12.5: {
                'transform': 'translateY(5px);'
            },
            25: {
                'transform': 'translateY(0px);'
            },
            37.5: {
                'transform': 'translateY(-5px);'
            },
            50: {
                'transform': 'translateY(0px);'
            },
            62.5: {
                'transform': 'translateY(5px);'
            },
            75: {
                'transform': 'translateY(0px);'
            },
            87.5: {
                'transform': 'translateY(-5px);'
            },
            100: {
                'transform': 'translateY(0px);'
            }
        },
        'jump': {
            0: {
                'transform': 'translateY(0) rotate(0);'
            },
            25: {
                'transform': 'translateY(-5px)'
            },
            35: {
                'transform': 'translateY(-5px) rotate(8deg);'
            },
            65: {
                'transform': 'translateY(-5px) rotate(-8deg);'
            },
            75: {
                'transform': 'translateY(-5px);'
            },
            100: {
                'transform': 'translateY(0) rotate(0);'
            }
        },
        'pulse': {
            0: {
                'transform': 'scale(1)'
            },
            25: {
                'transform': 'scale(0.95)'
            },
            50: {
                'transform': 'scale(1)'
            },
            75: {
                'transform': 'scale(1.05)'
            },
            100: {
                'transform': 'scale(1)'
            }
        },
        'blur': {
            0: {
                'filter': 'blur(0px)'
            },
            25: {
                'filter': 'blur(3px)'
            },
            50: {
                'filter': 'blur(5px)'
            },
            75: {
                'filter': 'blur(3px)'
            },
            100: {
                'filter': 'blur(0px)'
            }
        }
    }

    private static userKeyframes: string | undefined = undefined;
    private static userAnimation: string | undefined = undefined;

    private readonly target: HTMLElement[];
    private activeKey: string | undefined;

    constructor(...args: any) {
        Shake.init();

        this.target = toElementArray(args);
        Shake.instance.set(this.target, this);
    }

    private static init() {
        if (!Shake.userKeyframes && !Shake.userAnimation) {
            const style: any = document.createElement('style');
            const div = document.createElement('div');

            for (const property of [['@keyframes', 'animation'], ['@-moz-keyframes', '-moz-animation'], ['@-moz-keyframes', '-moz-animation'], ['@-moz-keyframes', '-moz-animation'], ['@-moz-keyframes', '-moz-animation']]) {
                if (Shake.userKeyframes && Shake.userAnimation) {
                    break;
                }

                const [frame, animation] = property;

                if (!Shake.userKeyframes) {
                    const content = frame + ' test { from { opacity: 0; } to { opacity: 1; } }';

                    if (style.styleSheet) {
                        style.styleSheet = content;
                    } else {
                        style.textContent = content;
                    }
                    document.head.appendChild(style);

                    if (style.sheet?.cssRules.length !== 0) {
                        Shake.userKeyframes = frame;
                    }

                    document.head.removeChild(style);
                }

                if (!Shake.userAnimation) {
                    div.style.cssText = animation + ": test;";

                    if (div.style.length > 0) {
                        Shake.userAnimation = animation;
                    }

                    div.style.cssText = "";
                }
            }

            try {
                if (style.styleSheet) {
                    style.styleSheet = '';
                } else {
                    style.textContent = '';
                }
                document.head.removeChild(style);
            } catch {
            }
            document.head.appendChild(style);

            let keyFrameCSSs = [];
            let animationCSSs = [];

            for (const key in Shake.animation) {
                const animationName = key as ShakeAnimation
                let keyFrameCSS = Shake.userKeyframes + ' shake-' + animationName + '{';
                for (const speed of [['slow', 1000], ['medium', 500], ['fast', 250]]) {
                    const [name, millisecond] = speed;
                    animationCSSs.push('[data-shake-' + animationName + '-' + name + '] {animation:shake-' + animationName + ' ' + millisecond + 'ms infinite linear} ')
                }
                for (const progress in Shake.animation[animationName]) {
                    keyFrameCSS += progress + '%{'
                    for (const behavior in Shake.animation[animationName][progress]) {
                        keyFrameCSS += behavior + ':' + Shake.animation[animationName][progress][behavior];
                    }
                    keyFrameCSS += '}';
                }
                keyFrameCSS += '}';

                keyFrameCSSs.push(keyFrameCSS);
            }

            const content = keyFrameCSSs.join('') + animationCSSs.join('');

            if (style.sheet) {
                for (const css of keyFrameCSSs) {
                    style.sheet.insertRule(css, 0);
                }
                for (const css of animationCSSs) {
                    style.sheet.insertRule(css, 0);
                }
            } else if (style.styleSheet) {
                style.styleSheet = content;
            } else {
                style.textContent = content;
            }
        }
    }

    start(key: ShakeAnimation, speed: ShakeSpeed = 'slow', duration?: number | InstanceType<typeof Shake.Cycle>) {
        for (const element of this.target) {
            this.activeKey = 'data-shake-' + key + '-' + speed;
            element.setAttribute(this.activeKey, 'true');
            if (duration instanceof Shake.Cycle) {
                duration = duration.getDuration(speed);
            }
            if (duration) {
                setTimeout(() => {
                    this.stop();
                }, duration);
            }
        }
    }

    stop() {
        for (const element of this.target) {
            if (this.activeKey) {
                element.removeAttribute(this.activeKey);
            }
            void element.offsetHeight;
        }
        Shake.instance.delete(this.target);
    }

    static cycle(number: number) {
        return new Shake.Cycle(number);
    }

    static fromInstance(args: any): Shake | undefined {
        const instanceKey = toElementArray(args);
        const keys = Shake.instance.keys();
        let key = keys.next();
        loop: while (!key.done) {
            for (const index in key.value) {
                if (key.value[index] !== instanceKey[index]) {
                    key = keys.next();
                    continue loop;
                }
            }
            return Shake.instance.get(key.value);
        }
        return;
    }
}

function toElementArray(args: any): HTMLElement[] {
    if (!args || args.length === 0) {
        return [];
    }

    if (args[0] instanceof Array) {
        return args[0] as HTMLElement[];
    }

    if (args[0] instanceof Element) {
        return [args[0] as HTMLElement];
    }

    if (typeof args[0] === 'string') {
        return toElementArray(document.querySelectorAll(args));
    }

    if (args[0] instanceof NodeList || args[0] instanceof HTMLAllCollection || args[0] instanceof HTMLCollection) {
        return Array.from(args[0]) as HTMLElement[];
    }

    return [args] as HTMLElement[];
}

(() => {
    GlobalThis.Shake = Shake;

    HTMLElement.prototype.shake = function () {
        return Shake.fromInstance(this) || new Shake(this)
    };

    NodeList.prototype.shake = function () {
        return Shake.fromInstance(this) || new Shake(this)
    };

    HTMLAllCollection.prototype.shake = function () {
        return Shake.fromInstance(this) || new Shake(this)
    };

    HTMLCollection.prototype.shake = function () {
        return Shake.fromInstance(this) || new Shake(this)
    };
})();

declare global {
    interface Window {
        Shake: Shake;
    }

    interface HTMLElement {
        shake: () => Shake;
    }

    interface NodeList {
        shake: () => Shake;
    }

    interface HTMLAllCollection {
        shake: () => Shake;
    }

    interface HTMLCollection {
        shake: () => Shake;
    }
}