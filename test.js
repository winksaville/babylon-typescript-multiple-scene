"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// Test Multiple Scenes
console.log("ww=" + window.innerWidth + " wh=" + window.innerHeight);
var MyScene = (function (_super) {
    __extends(MyScene, _super);
    function MyScene(canvasName) {
        var _this;
        var canvas = document.getElementById(canvasName);
        var engine = new BABYLON.Engine(canvas, true);
        _this = _super.call(this, engine) || this;
        return _this;
    }
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
var Cube = (function () {
    function Cube(scene, options) {
        this._scene = scene;
        this._rotationX = (options && options.rotationX) ? options.rotationX : 0.0;
        this._rotationY = (options && options.rotationY) ? options.rotationY : 0.0;
        this._colors = (options && options.colors) ? options.colors : new BABYLON.Color4(1, 0, 0, 0.2);
        this._size = (options && options.size) ? options.size : 3;
        // Use the set accessor
        this.position = (options && options.position) ? options.position : new BABYLON.Vector3(0, 0, 0);
        this._box = BABYLON.MeshBuilder.CreateBox("box", { size: this._size, faceColors: [this._colors] }, this._scene);
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
    };
    return Cube;
}());
var Test = (function () {
    function Test(scene) {
        this._scene = scene;
        this._things = [];
        new BABYLON.ArcRotateCamera("camera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), this._scene);
        this._scene.activeCamera.attachControl(this._scene.canvas);
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 0, 0), this._scene);
        light.diffuse = new BABYLON.Color3(1, 0, 0);
        light.specular = new BABYLON.Color3(1, 1, 1);
    }
    Test.prototype.addThing = function (thing) {
        this._things.push(thing);
    };
    Test.prototype.animate = function () {
        var _this = this;
        this._scene.engine.runRenderLoop(function () {
            for (var _i = 0, _a = _this._things; _i < _a.length; _i++) {
                var thing = _a[_i];
                thing.animate();
                _this._scene.render();
            }
        });
    };
    return Test;
}());
var scene1 = new MyScene('canvas');
var cube1 = new Cube(scene1, { rotationX: 0.005, rotationY: 0.01 });
var test = new Test(scene1);
test.addThing(cube1);
test.animate();
console.log("done");
