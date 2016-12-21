interface MyAnimation {
    animate(): void;
}
declare class MyScene extends BABYLON.Scene implements MyAnimation {
    private _things;
    constructor(engine: BABYLON.Engine);
    addThing(thing: MyAnimation): void;
    animate(): void;
    readonly engine: BABYLON.Engine;
    readonly canvas: HTMLCanvasElement;
}
declare class Cube implements MyAnimation {
    private _scene;
    private _box;
    private _position;
    private _rotationX;
    private _rotationY;
    private _rotationZ;
    private _colors;
    private _size;
    constructor(scene: MyScene, options?: {
        rotationX?: number;
        rotationY?: number;
        rotationZ?: number;
        position?: BABYLON.Vector3;
        colors?: BABYLON.Color4;
        size?: number;
    });
    position: BABYLON.Vector3;
    animate(): void;
}
declare class Test {
    private _mainScene;
    private _otherScenes;
    constructor(mainScene: MyScene);
    addScene(scene: MyScene): void;
    animate(): void;
}
declare let canvasName: string;
declare let canvas: HTMLCanvasElement;
declare let engine: BABYLON.Engine;
declare let mainScene: MyScene;
declare let cube0: Cube;
declare let test: Test;
declare let scene1: MyScene;
declare let cube1: Cube;
declare let scene2: MyScene;
declare let cube2: Cube;
