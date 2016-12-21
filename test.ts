// Test Multiple Scenes
console.log("ww=" + window.innerWidth + " wh=" + window.innerHeight);

class MyScene extends BABYLON.Scene {

  constructor(canvasName: string) {
    let canvas = <HTMLCanvasElement>document.getElementById(canvasName);
    let engine = new BABYLON.Engine(canvas, true) ;
    super(engine);
  }

  get engine() : BABYLON.Engine {
    return this.getEngine();
  }
  get canvas() : HTMLCanvasElement {
    return this.engine.getRenderingCanvas();
  }
}

interface MyThing {
  animate() : void;
}

class Cube implements MyThing {
    private _scene: MyScene;
    private _box: BABYLON.Mesh;
    private _position: BABYLON.Vector3;
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
    this._rotationX = (options && options.rotationX) ? options.rotationX : 0.0;
    this._rotationY = (options && options.rotationY) ? options.rotationY : 0.0;
    this._colors = (options && options.colors) ? options.colors : new BABYLON.Color4(1, 0, 0, 0.2);
    this._size = (options && options.size) ? options.size : 3;

    // Use the set accessor
    this.position = (options && options.position) ? options.position : new BABYLON.Vector3(0, 0, 0);

    this._box = BABYLON.MeshBuilder.CreateBox("box", {size: this._size, faceColors: [this._colors]}, this._scene);
  }

  set position(pos: BABYLON.Vector3) {
    this._position = pos;
  }
  get position() : BABYLON.Vector3 {
    return this._position;
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

    new BABYLON.ArcRotateCamera("camera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), this._scene);

    this._scene.activeCamera.attachControl(this._scene.canvas);

    let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 0, 0), this._scene);
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
        this._scene.render();
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
