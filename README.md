# Shake Animation
![NPM](https://nodei.co/npm/shake-animation.png?downloads=true&downloadRank=true&stars=true)<br>
![NPM Downloads](https://img.shields.io/npm/d18m/shake-animation?style=flat&logo=npm&logoColor=%23CB3837&label=Download&color=%23CB3837&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Feventlistener-manager) 
![GitHub Repo stars](https://img.shields.io/github/stars/pjy0509/shake-animation?style=flat&logo=github&logoColor=181717&label=Stars&color=181717&link=https%3A%2F%2Fgithub.com%2Fpjy0509%2Feventlistener-manager)<br> 
![Static Badge](https://img.shields.io/badge/Typescript-8A2BE2?logo=typescript&color=000000)
## Sample page
### [Link](https://pjy0509.github.io/example/shake-animation/)
## Install
npm
```bash
npm i shake-animation
```
cdn
```html
<script src="https://unpkg.com/shake-animation@latest/dist/index.umd.js"></script>
```
## Report errors and suggestions
### [Gmail](mailto:qkrwnss0509@gmail.com?subject=Report_errors_and_suggestions)
## Change log
| Version | Log           |
|---------|---------------|
| 1.0.2   | Update Readme |
## 1. Start shake animation
### Start shake animation
```typescript
let element = document.querySelector('.shake');
let shake = new Shake(element); // create new and regist from Shake.instance

shake.start('horizontal');
// or
document.querySelector('.shake').shake().start('horizontal'); // get from Shake.instace if exiest or create new and regist from Shake.instance
``` 
### Start shake animation with animation speed
```typescript
let element = document.querySelector('.shake');
let shake = new Shake(element); // create new and regist from Shake.instance

shake.start('horizontal', 'fast');
// or
document.querySelector('.shake').shake().start('horizontal', 'fast'); // get from Shake.instace if exiest or create new and regist from Shake.instance
``` 
### Start shake animation with animation speed and duration
```typescript
let element = document.querySelector('.shake');
let shake = new Shake(element); // create new and regist from Shake.instance

shake.start('horizontal', 'fast', 1000); // animation for 1s
// or
document.querySelector('.shake').shake().start('horizontal', 'fast', 1000); // get from Shake.instace if exiest or create new and regist from Shake.instance
``` 
### Start shake animation `n` times
```typescript
let element = document.querySelector('.shake');
let shake = new Shake(element); // create new and regist from Shake.instance

shake.start('horizontal', 'fast', Shake.cycle(2)); // animation for 2 times
// or
document.querySelector('.shake').shake().start('horizontal', 'fast', Shake.cycle(2)); // get from Shake.instace if exiest or create new and regist from Shake.instance
``` 
## 2. Stop shake animation
```typescript
shake.stop();
// or
document.querySelector('.shake').shake().stop('horizontal'); // release from Shake.instance
``` 
### Supported shake animation type
Supported shake animation type include tilt, horizontal, vertical, jump, pulse, blur.
```typescript
export type ShakeAnimation = 'tilt' | 'horizontal' | 'vertical' | 'jump' | 'pulse' | 'blur';
```
### Supported shake animation speed
Supported shake animation speed include slow, medium, fast.
```typescript
export type ShakeSpeed = 'slow' | 'medium' | 'fast';
```