// Test Multiple Scenes
console.log("ww=" + window.innerWidth + " wh=" + window.innerHeight);

class MyScene {
    private _canvas: HTMLCanvasElement;
    private _scene: BABYLON.Scene;
    private _engine: BABYLON.Engine;

  constructor(canvas: string) {
    this._canvas = <HTMLCanvasElement>document.getElementById(canvas);
    this._engine = new BABYLON.Engine(this._canvas, true) ;
    this._scene = new BABYLON.Scene(this._engine);
  }

  get canvas() {
    return this._canvas;
  }
  get scene() {
    return this._scene;
  }
  get engine() {
    return this._engine;
  }
}

interface MyThing {
  animate() : void;
}

class Cube implements MyThing {
    private _scene: MyScene;
    private _box: BABYLON.Mesh;
    //private _position: BABYLON.Vector3;
    private _rotationX: number;
    private _rotationY: number;
    private _colors: BABYLON.Color4;
    private _size: number;

  constructor(scene: MyScene,
              options?: {
                rotationX?: number, rotationY?: number,
                position?: BABYLON.Vector3,
                colors?: BABYLON.Color4,
                size?: number,
              } ) {
    this._scene = scene;
    //this._position = (options && options.positon) ? options.position : new BABYLON.Vector3(0, 0, 0);
    this._rotationX = (options && options.rotationX) ? options.rotationX : 0.0;
    this._rotationY = (options && options.rotationY) ? options.rotationY : 0.0;
    this._colors = (options && options.colors) ? options.colors : new BABYLON.Color4(1, 0, 0, 0.2);
    this._size = (options && options.size) ? options.size : 3;

    this._box = BABYLON.MeshBuilder.CreateBox("box", {size: this._size, faceColors: [this._colors]}, this._scene.scene);
  }

  animate() : void {
    this._box.rotation.x += this._rotationX;
    this._box.rotation.y += this._rotationY;
  }
}

class Test {
    private _scene: MyScene;
    private _things: MyThing[];

  constructor(scene: MyScene) {
    this._scene = scene;
    this._things = [];

    new BABYLON.ArcRotateCamera("camera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), this._scene.scene);

    this._scene.scene.activeCamera.attachControl(this._scene.canvas);

    let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 0, 0), this._scene.scene);
    light.diffuse = new BABYLON.Color3(1, 0, 0);
    light.specular = new BABYLON.Color3(1, 1, 1);

  }

  addThing(thing: MyThing) {
    this._things.push(thing);
  }

  animate() : void {
    this._scene.engine.runRenderLoop(() => {
      for (let thing of this._things) {
        thing.animate();
        this._scene.scene.render();
      }
    });
  }
}

let scene1 = new MyScene('canvas');
let cube1 = new Cube(scene1, {rotationX: 0.005, rotationY: 0.01});
let test = new Test(scene1);
test.addThing(cube1);
test.animate();

console.log("done");
