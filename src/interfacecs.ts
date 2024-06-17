export type ShakeAnimation = 'tilt' | 'horizontal' | 'vertical' | 'jump' | 'pulse' | 'blur';
export type ShakeSpeed = 'slow' | 'medium' | 'fast';
export type Behavior = Partial<{ [Style in keyof CSSStyleDeclaration]: string }>;
export type Animation = { [Progress: number]: Behavior };
export type Animations = { [AnimationName in ShakeAnimation]: Animation; };