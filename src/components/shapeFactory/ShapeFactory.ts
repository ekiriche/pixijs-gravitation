import * as PIXI from 'pixi.js';
import {MaxShapeHeight, MaxShapeWidth, ShapeType} from "../constants/constants";

class ShapeFactory {
    private createArray: Array<(type: ShapeType, posX: number, posY: number, color: any, onShapeClick: any) => PIXI.DisplayObject> = [];

    constructor() {
        this.createArray.push(this.createThreeSidedShape);
        this.createArray.push(this.createFourSidedShape);
        this.createArray.push(this.createFiveSidedShape);
        this.createArray.push(this.createSixSidedShape);
        this.createArray.push(this.createCircleShape);
        this.createArray.push(this.createEllipseShape);
    }

    public createShape = (type: ShapeType, posX: number, posY: number, color: any, onShapeClick: any): PIXI.DisplayObject => {
        if (type === ShapeType.random) {
            return this.createArray[Math.floor(Math.random() * this.createArray.length)](type, posX, posY, color, onShapeClick);
        }
        return this.createArray[type](type, posX, posY, color, onShapeClick);
    };

    private createBaseShape = (type: ShapeType, onShapeClick: any) => {
        const shape = new PIXI.Graphics();

        shape.interactive = true;
        shape.buttonMode = true;

        shape.on('click', () => {
            shape.destroy();
            onShapeClick(shape);
        });

        return shape;
    };

    private createThreeSidedShape = (type: ShapeType, posX: number, posY: number, color: any, onShapeClick: any) => {
        const shape = this.createBaseShape(type, onShapeClick);

        shape.beginFill(0x66CCFF);
        shape.drawPolygon([
            posX, posY,
            posX + Math.random() * MaxShapeWidth, posY + Math.random() * MaxShapeHeight - Math.random() * MaxShapeHeight,
            posX + Math.random() * MaxShapeWidth, posY + Math.random() * MaxShapeHeight - Math.random() * MaxShapeHeight,
        ]);
        shape.endFill();
        shape.accessibleTitle = ShapeType.threeSides.toString();

        return shape;
    };

    private createFourSidedShape = (type: ShapeType, posX: number, posY: number, color: any, onShapeClick: any): PIXI.DisplayObject => {
        const shape = this.createBaseShape(type, onShapeClick);

        shape.beginFill(0x66CCFF);
        shape.drawPolygon([
            posX, posY,
            posX + Math.random() * MaxShapeWidth, posY + Math.random() * MaxShapeHeight - Math.random() * MaxShapeHeight,
            posX + Math.random() * MaxShapeWidth, posY + Math.random() * MaxShapeHeight - Math.random() * MaxShapeHeight,
            posX + Math.random() * MaxShapeWidth, posY + Math.random() * MaxShapeHeight - Math.random() * MaxShapeHeight,
        ]);
        shape.endFill();

        return shape;
    };

    private createFiveSidedShape = (type: ShapeType, posX: number, posY: number, color: any, onShapeClick: any): PIXI.DisplayObject => {
        const shape = this.createBaseShape(type, onShapeClick);

        shape.beginFill(0x66CCFF);
        shape.drawPolygon([
            posX, posY,
            posX + Math.random() * MaxShapeWidth, posY + Math.random() * MaxShapeHeight - Math.random() * MaxShapeHeight,
            posX + Math.random() * MaxShapeWidth, posY + Math.random() * MaxShapeHeight - Math.random() * MaxShapeHeight,
            posX + Math.random() * MaxShapeWidth, posY + Math.random() * MaxShapeHeight - Math.random() * MaxShapeHeight,
            posX + Math.random() * MaxShapeWidth, posY + Math.random() * MaxShapeHeight - Math.random() * MaxShapeHeight,
        ]);
        shape.endFill();

        return shape;
    };

    private createSixSidedShape = (type: ShapeType, posX: number, posY: number, color: any, onShapeClick: any): PIXI.DisplayObject => {
        const shape = this.createBaseShape(type, onShapeClick);

        shape.beginFill(0x66CCFF);
        shape.drawPolygon([
            posX, posY,
            posX + Math.random() * MaxShapeWidth, posY + Math.random() * MaxShapeHeight - Math.random() * MaxShapeHeight,
            posX + Math.random() * MaxShapeWidth, posY + Math.random() * MaxShapeHeight - Math.random() * MaxShapeHeight,
            posX + Math.random() * MaxShapeWidth, posY + Math.random() * MaxShapeHeight - Math.random() * MaxShapeHeight,
            posX + Math.random() * MaxShapeWidth, posY + Math.random() * MaxShapeHeight - Math.random() * MaxShapeHeight,
            posX + Math.random() * MaxShapeWidth, posY + Math.random() * MaxShapeHeight - Math.random() * MaxShapeHeight,
        ]);
        shape.endFill();

        return shape;
    };

    private createCircleShape = (type: ShapeType, posX: number, posY: number, color: any, onShapeClick: any): PIXI.DisplayObject => {
        const shape = this.createBaseShape(type, onShapeClick);

        shape.beginFill(0x66CCFF);
        shape.drawCircle(posX, posY, Math.random() * MaxShapeHeight / 2);
        shape.endFill();

        return shape;
    };

    private createEllipseShape = (type: ShapeType, posX: number, posY: number, color: any, onShapeClick: any): PIXI.DisplayObject => {
        const shape = this.createBaseShape(type, onShapeClick);

        shape.beginFill(0x66CCFF);
        shape.drawEllipse(posX, posY, Math.random() * MaxShapeWidth, Math.random() * MaxShapeHeight / 2);
        shape.endFill();

        return shape;
    };
}

export default ShapeFactory;