/**
 * An interface that animates
 */
interface MyAnimation {
    animate(): void;
}
/**
 * A Scene which can be one of many. It's main features
 * are it uses a standard camera, light and its background is
 * transparent and black. Each scene could have different
 * cammera and lights.
 */
declare class MyScene extends BABYLON.Scene implements MyAnimation {
    private _name;
    private _camera;
    private _things;
    constructor(name: string, engine: BABYLON.Engine);
    addThing(thing: MyAnimation): void;
    animate(): void;
    readonly engine: BABYLON.Engine;
    readonly canvas: HTMLCanvasElement;
}
/**
 * A Cube class that defines a cube where its parameters can be controlled
 */
declare class Cube implements MyAnimation {
    private _name;
    private _scene;
    private _box;
    private _position;
    private _rotationX;
    private _rotationY;
    private _rotationZ;
    private _colors;
    private _size;
    constructor(name: string, scene: MyScene, options?: {
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
/**
 * A test class that displays multiple scenes
 */
declare class Test {
    private _engine;
    private _otherScenes;
    constructor(engine: BABYLON.Engine);
    addScene(scene: MyScene): void;
    animate(): void;
}
declare let canvasName: string;
declare let canvas: HTMLCanvasElement;
declare let engine: BABYLON.Engine;
declare let test: Test;
declare let scene1: MyScene;
declare let cube1: Cube;
declare let scene2: MyScene;
declare let cube2: Cube;
