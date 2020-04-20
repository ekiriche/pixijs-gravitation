import React, {useEffect, useState} from 'react';
import './App.css';
import * as PIXI from 'pixi.js';
import ShapeFactory from "../shapeFactory/ShapeFactory";
import {MaxShapeHeight, MaxShapeWidth, ShapeType, stageHeight} from "../constants/constants";

let app = new PIXI.Application({
    width: window.innerWidth,
    height: stageHeight
});
const shapeFactory = new ShapeFactory();

const App = () => {
    const [gravity, setGravity] = useState(5);
    const [shapesPerSec, setShapesPerSec] = useState(3);
    const [createShapeInterval, setCreateShapeInterval]: [number | null, Function] = useState(null);
    const [shapeMovementInterval, setShapeMovementInterval]: [number | null, Function] = useState(null);

    useEffect(() => {
        app.renderer.view.style.position = "absolute";
        app.renderer.view.style.display = "block";

        document.body.getElementsByClassName("canvas-wrapper")[0].appendChild(app.view);
        // @ts-ignore
        document.body.getElementsByClassName("canvas-wrapper")[0].addEventListener("click", (event: MouseEvent) => {
            console.log(event);
            addShapeOnStage(event.offsetX, event.offsetY);
        });

        resetCycle();
        resetShapeMovementCycle();

        window.addEventListener('resize', () => {
          app.renderer.resize(window.innerWidth, stageHeight);
        });
  }, []);

    const resetCycle = () => {
        if (createShapeInterval) {
            clearInterval(createShapeInterval);
        }
        setCreateShapeInterval(setInterval(() => {
            addShapeOnStage();
        }, 1000 / shapesPerSec));
    };

    const addShapeOnStage = (posX: number | null = null, posY: number | null = null) => {
        let shape = shapeFactory.createShape(
            ShapeType.threeSides,
            posX ? posX : Math.random() * (app.screen.width - MaxShapeWidth),
            posY ? posY : -MaxShapeHeight,
            null,
            onShapeClick
        );

        app.stage.addChild(shape);
    };

    const changeGravity = (newGravity: number) => {
        setGravity(newGravity);
        resetShapeMovementCycle();
    };

    const resetShapeMovementCycle = () => {
        if (shapeMovementInterval) {
            clearInterval(shapeMovementInterval);
        }
        setShapeMovementInterval(setInterval(() => {
            app.stage.children.forEach((item: PIXI.DisplayObject, index: number) => {
                if (item.y - 2 * MaxShapeHeight > stageHeight) {
                    item.destroy();
                } else {
                    item.y += gravity;
                }
            })
        }, 20));
    };

    const onShapeClick = (type: ShapeType) => {
        // @ts-ignore
        app.stage.children.forEach((item: PIXI.Graphics) => {
            console.log(item);
            if (type === ShapeType.threeSides)
            // @ts-ignore
            item._tint = 0xFF2D00;
        })
    };

  return (
    <div className="app-container">
        <div className="top-container">
            <button onClick={() => changeGravity(gravity + 1)}>+Gravity</button>
        </div>
        <div className="canvas-wrapper" />
        <div className="bottom-container">

        </div>
    </div>
  );
};

export default App;
