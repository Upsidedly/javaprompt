# javaprompt
The javaprompt package which includes several dynamic input functions created by upsided.

## Installation
```bash
npm i javaprompt
yarn add javaprompt
pnpm add javaprompt
```
---


## History
### 1.0.0
- Added `input()` command.
    - Supports return types of `string`, `number`, and `integer`, any other type selected will show the prompt but return an empty string
- Simple `rl.ts` file which has the readline instance and configuration.

### 1.0.1
- Added `boolean` type to `input` command.
    - Input has to be `t`, `f`, `true` or `false`

### 1.0.2
- Added `float` type to `input` command.
    -Input has to be a floating-point number.

## Functions

### `input()`
