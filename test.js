"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// Test Multiple Scenes
console.log("ww=" + window.innerWidth + " wh=" + window.innerHeight);
/**
 * A Scene which can be one of many. It's main features
 * are it uses a standard camera, light and its background is
 * transparent and black. Each scene could have different
 * cammera and lights.
 */
var MyScene = (function (_super) {
    __extends(MyScene, _super);
    function MyScene(name, engine) {
        var _this = _super.call(this, engine) || this;
        _this._name = name;
        _this._camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), _this);
        _this._camera.setPosition(new BABYLON.Vector3(0, 0, -30));
        _this.activeCamera.attachControl(_this.canvas);
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 0, 0), _this);
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.specular = new BABYLON.Color3(1, 1, 1);
        _this._things = [];
        // Have the Scene have a clear color of black but transparent (alpha == 0.0)
        // so the canvas background color shows through
        _this.clearColor = new BABYLON.Color4(0.0, 0, 0, 0.0);
        console.log("this.clearColor=" + _this.clearColor);
        // Don't clear by default, otherwise only one scene will be scene
        _this.autoClear = false;
        return _this;
    }
    MyScene.prototype.addThing = function (thing) {
        this._things.push(thing);
    };
    MyScene.prototype.animate = function () {
        for (var _i = 0, _a = this._things; _i < _a.length; _i++) {
            var thing = _a[_i];
            thing.animate();
        }
        this.render();
    };
    Object.defineProperty(MyScene.prototype, "engine", {
        get: function () {
            return this.getEngine();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyScene.prototype, "canvas", {
        get: function () {
            return this.engine.getRenderingCanvas();
        },
        enumerable: true,
        configurable: true
    });
    return MyScene;
}(BABYLON.Scene));
/**
 * A Cube class that defines a cube where its parameters can be controlled
 */
var Cube = (function () {
    function Cube(name, scene, options) {
        this._name = name;
        this._scene = scene;
        this._rotationX = (options && options.rotationX) ? options.rotationX : 0.0;
        this._rotationY = (options && options.rotationY) ? options.rotationY : 0.0;
        this._rotationZ = (options && options.rotationZ) ? options.rotationZ : 0.0;
        this._colors = (options && options.colors) ? options.colors : new BABYLON.Color4(0.5, 0.5, 0.5, 1.0);
        this._size = (options && options.size) ? options.size : 3;
        console.log("Cube._colors=" + this._colors);
        this._box = BABYLON.MeshBuilder.CreateBox("box", { size: this._size,
            faceColors: [
                this._colors,
                this._colors,
                this._colors,
                this._colors,
                this._colors,
                this._colors,
            ] }, this._scene);
        // Use the accessors to set initial position
        this.position = (options && options.position) ? options.position : new BABYLON.Vector3(0, 0, 0);
        this._box.position = this.position;
        console.log("MyScene.constructor:- size=" + this._size + " this.position=" + this.position + " _box.position=" + this._box.position);
    }
    Object.defineProperty(Cube.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (pos) {
            this._position = pos;
        },
        enumerable: true,
        configurable: true
    });
    Cube.prototype.animate = function () {
        this._box.rotation.x += this._rotationX;
        this._box.rotation.y += this._rotationY;
        this._box.rotation.z += this._rotationZ;
    };
    return Cube;
}());
/**
 * A test class that displays multiple scenes
 */
var Test = (function () {
    function Test(engine) {
        this._engine = engine;
        this._otherScenes = [];
    }
    Test.prototype.addScene = function (scene) {
        this._otherScenes.push(scene);
    };
    Test.prototype.animate = function () {
        var _this = this;
        // Have the first one clear the screen
        this._otherScenes[0].autoClear = true;
        this._engine.runRenderLoop(function () {
            for (var _i = 0, _a = _this._otherScenes; _i < _a.length; _i++) {
                var aScene = _a[_i];
                aScene.animate();
            }
        });
    };
    return Test;
}());
// Create a canvas and engine shared by all of the scenes
var canvasName = 'canvas';
var canvas = document.getElementById(canvasName);
var engine = new BABYLON.Engine(canvas, true);
// Create the tester adding some scenes
var test = new Test(engine);
// Scene1 with one cube
var scene1 = new MyScene("scene1", engine);
var cube1 = new Cube("cube1", scene1, { rotationX: 0.005, rotationY: 0.005, rotationZ: 0.005,
    size: 2, position: new BABYLON.Vector3(2, 2, 0),
    colors: new BABYLON.Color4(1, 1, 0, 1) });
scene1.addThing(cube1);
test.addScene(scene1);
// Scene2 with one cube
var scene2 = new MyScene("scene2", engine);
var cube2 = new Cube("cube2", scene2, { rotationX: 0.01, rotationY: 0.02, rotationZ: 0.03,
    size: 2, position: new BABYLON.Vector3(-2, -2, 0),
    colors: new BABYLON.Color4(1, 0, 0, 1) });
scene2.addThing(cube2);
test.addScene(scene2);
// Start "animating"
test.animate();
console.log("done");
