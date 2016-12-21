declare class MyScene extends BABYLON.Scene {
    constructor(canvasName: string);
    readonly engine: BABYLON.Engine;
    readonly canvas: HTMLCanvasElement;
}
interface MyThing {
    animate(): void;
}
declare class Cube implements MyThing {
    private _scene;
    private _box;
    private _position;
    private _rotationX;
    private _rotationY;
    private _colors;
    private _size;
    constructor(scene: MyScene, options?: {
        rotationX?: number;
        rotationY?: number;
        position?: BABYLON.Vector3;
        colors?: BABYLON.Color4;
        size?: number;
    });
    position: BABYLON.Vector3;
    animate(): void;
}
declare class Test {
    private _scene;
    private _things;
    constructor(scene: MyScene);
    addThing(thing: MyThing): void;
    animate(): void;
}
declare let scene1: MyScene;
declare let cube1: Cube;
declare let test: Test;
