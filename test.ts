// Test Multiple Scenes
console.log("ww=" + window.innerWidth + " wh=" + window.innerHeight);

/**
 * An interface that animates
 */
interface MyAnimation {
  animate() : void;
}

/**
 * A Scene which can be one of many. It's main features
 * are it uses a standard camera, light and its background is
 * transparent and black. Each scene could have different
 * cammera and lights.
 */
class MyScene extends BABYLON.Scene implements MyAnimation {
  private _name: string;
  private _camera: BABYLON.ArcRotateCamera;
  private _things: MyAnimation[];

  constructor(name: string, engine: BABYLON.Engine) {
    super(engine);

    this._name = name;

    this._camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), this);
    this._camera.setPosition(new BABYLON.Vector3(0, 0, -30));
    this.activeCamera.attachControl(this.canvas);

    let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 0, 0), this);
    light.diffuse = new BABYLON.Color3(1, 1, 1);
    light.specular = new BABYLON.Color3(1, 1, 1);

    this._things = [];

    // Have the Scene have a clear color of black but transparent (alpha == 0.0)
    // so the canvas background color shows through
    this.clearColor = new BABYLON.Color4(0.0, 0, 0, 0.0);
    console.log("this.clearColor=" + this.clearColor);

    // Don't clear by default, otherwise only one scene will be scene
    this.autoClear = false;
  }

  addThing(thing: MyAnimation) {
    this._things.push(thing);
  }

  animate() : void {
      for (let thing of this._things) {
        thing.animate();
      }
      this.render();
  }

  get engine() : BABYLON.Engine {
    return this.getEngine();
  }
  get canvas() : HTMLCanvasElement {
    return this.engine.getRenderingCanvas();
  }
}

/**
 * A Cube class that defines a cube where its parameters can be controlled
 */
class Cube implements MyAnimation {
    private _name: string;
    private _scene: MyScene;
    private _box: BABYLON.Mesh;
    private _position: BABYLON.Vector3;
    private _rotationX: number;
    private _rotationY: number;
    private _rotationZ: number;
    private _colors: BABYLON.Color4;
    private _size: number;

  constructor(name: string, scene: MyScene,
              options?: {
                rotationX?: number, rotationY?: number, rotationZ?: number,
                position?: BABYLON.Vector3,
                colors?: BABYLON.Color4,
                size?: number,
              } ) {
    this._name = name;
    this._scene = scene;
    this._rotationX = (options && options.rotationX) ? options.rotationX : 0.0;
    this._rotationY = (options && options.rotationY) ? options.rotationY : 0.0;
    this._rotationZ = (options && options.rotationZ) ? options.rotationZ : 0.0;
    this._colors = (options && options.colors) ? options.colors : new BABYLON.Color4(0.5, 0.5, 0.5, 1.0);
    this._size = (options && options.size) ? options.size : 3;
    console.log("Cube._colors=" + this._colors);

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

/**
 * A test class that displays multiple scenes
 */
class Test {
  private _engine: BABYLON.Engine;
  private _otherScenes: MyScene[];

  constructor(engine: BABYLON.Engine) {
    this._engine = engine;
    this._otherScenes = [];
  }

  addScene(scene: MyScene) {
    this._otherScenes.push(scene);
  }

  animate() : void {
    // Have the first one clear the screen
    this._otherScenes[0].autoClear = true;
    this._engine.runRenderLoop(() => {
      for (let aScene of this._otherScenes) {
        aScene.animate();
      }
    });
  }
}

// Create a canvas and engine shared by all of the scenes
let canvasName = 'canvas';
let canvas = <HTMLCanvasElement>document.getElementById(canvasName);
let engine = new BABYLON.Engine(canvas, true) ;

// Create the tester adding some scenes
let test = new Test(engine);

// Scene1 with one cube
let scene1 = new MyScene("scene1", engine);
let cube1 = new Cube("cube1", scene1,
                     {rotationX: 0.005, rotationY: 0.005, rotationZ: 0.005,
                       size: 2, position: new BABYLON.Vector3(2, 2, 0),
                       colors: new BABYLON.Color4(1, 1, 0, 1)});
scene1.addThing(cube1);
test.addScene(scene1);

// Scene2 with one cube
let scene2 = new MyScene("scene2", engine);
let cube2 = new Cube("cube2", scene2,
                     {rotationX: 0.01, rotationY: 0.02, rotationZ: 0.03,
                       size: 2, position: new BABYLON.Vector3(-2, -2, 0),
                       colors: new BABYLON.Color4(1, 0, 0, 1)});
scene2.addThing(cube2);
test.addScene(scene2);

// Start "animating"
test.animate();

console.log("done");
