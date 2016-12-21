// Test Multiple Scenes
console.log("ww=" + window.innerWidth + " wh=" + window.innerHeight);

interface MyAnimation {
  animate() : void;
}

class MyScene extends BABYLON.Scene implements MyAnimation {
  private _things: MyAnimation[];

  constructor(engine: BABYLON.Engine) {
    super(engine);

    this._things = [];

    // Have the Scene have a clear color of black but transparent (alpha == 0.0)
    // so the canvas background color shows through
    this.clearColor = new BABYLON.Color4(0.0, 0, 0, 0.0);
    console.log("this.clearColor=" + this.clearColor);
  }

  addThing(thing: MyAnimation) {
    this._things.push(thing);
  }

  animate() : void {
      for (let thing of this._things) {
        thing.animate();
      }
  }

  get engine() : BABYLON.Engine {
    return this.getEngine();
  }
  get canvas() : HTMLCanvasElement {
    return this.engine.getRenderingCanvas();
  }
}

class Cube implements MyAnimation {
    private _scene: MyScene;
    private _box: BABYLON.Mesh;
    private _position: BABYLON.Vector3;
    private _rotationX: number;
    private _rotationY: number;
    private _rotationZ: number;
    private _colors: BABYLON.Color4;
    private _size: number;

  constructor(scene: MyScene,
              options?: {
                rotationX?: number, rotationY?: number, rotationZ?: number,
                position?: BABYLON.Vector3,
                colors?: BABYLON.Color4,
                size?: number,
              } ) {
    this._scene = scene;
    this._rotationX = (options && options.rotationX) ? options.rotationX : 0.0;
    this._rotationY = (options && options.rotationY) ? options.rotationY : 0.0;
    this._rotationZ = (options && options.rotationZ) ? options.rotationZ : 0.0;
    this._colors = (options && options.colors) ? options.colors : new BABYLON.Color4(0.5, 0.5, 0.5, 1.0);
    this._size = (options && options.size) ? options.size : 3;

    this._box = BABYLON.MeshBuilder.CreateBox("box", {size: this._size,
                  faceColors: [
                    this._colors,
                    this._colors,
                    this._colors,
                    this._colors,
                    this._colors,
                    this._colors,
                  ]}, this._scene);

    // Use the accessors to set initial position
    this.position = (options && options.position) ? options.position : new BABYLON.Vector3(0, 0, 0);
    this._box.position = this.position;
    console.log("MyScene.constructor:- size=" + this._size + " this.position=" + this.position + " _box.position=" + this._box.position);
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
    this._box.rotation.z += this._rotationZ;
  }
}

class Test {
  private _mainScene: MyScene;
  private _otherScenes: MyScene[];

  constructor(mainScene: MyScene) {
    this._mainScene = mainScene;
    this._otherScenes = [];

    //let camera = new BABYLON.ArcRotateCamera("camera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), this._scene);
    let camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), this._mainScene);
    camera.setPosition(new BABYLON.Vector3(0, 0, -30));

    this._mainScene.activeCamera.attachControl(this._mainScene.canvas);

    let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 0, 0), this._mainScene);
    light.diffuse = new BABYLON.Color3(1, 1, 1);
    light.specular = new BABYLON.Color3(1, 1, 1);

  }

  addScene(scene: MyScene) {
    this._otherScenes.push(scene);
  }

  animate() : void {
    this._mainScene.engine.runRenderLoop(() => {
      this._mainScene.animate();
      this._mainScene.render();
      for (let aScene of this._otherScenes) {
        aScene.animate();
        //aScene.render(); // Causes an error because no camera?
      }
    });
  }
}

let canvasName = 'canvas';
let canvas = <HTMLCanvasElement>document.getElementById(canvasName);
let engine = new BABYLON.Engine(canvas, true) ;
let mainScene = new MyScene(engine);
let cube0 = new Cube(mainScene,
                     {rotationX: 0.0, rotationY: 0.0, rotationZ: 0.0,
                       size: 1, position: new BABYLON.Vector3(0, 0, 0),
                       colors: new BABYLON.Color4(1, 0, 0, 1)});

let test = new Test(mainScene);

let scene1 = new MyScene(engine);
let cube1 = new Cube(scene1,
                     {rotationX: 0.005, rotationY: 0.005, rotationZ: 0.005,
                       size: 2, position: new BABYLON.Vector3(2, 2, 0),
                       colors: new BABYLON.Color4(0, 1, 0, 1)});
test.addScene(scene1);

let scene2 = new MyScene(engine);
let cube2 = new Cube(scene2,
                     {rotationX: 0.01, rotationY: 0.02, rotationZ: 0.03,
                       size: 2, position: new BABYLON.Vector3(-2, -2, 0),
                       colors: new BABYLON.Color4(0, 1, 1, 1)});
test.addScene(scene2);

test.animate();

console.log("done");
