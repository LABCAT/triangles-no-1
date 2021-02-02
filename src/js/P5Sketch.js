import React, { useRef, useEffect } from "react";
import * as p5 from "p5";

const P5Sketch = () => {
    const sketchRef = useRef();

    const Sketch = p => {

        p.canvas = null;

        p.canvasWidth = window.innerWidth;

        p.canvasHeight = window.innerHeight;

        p.shapeSize = 60;

        p.colors = [];

        p.setup = () => {
            p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
            p.strokeWeight(1);
            let colorsIndex = 0;
            for (var x = 0; x < (p.width + p.shapeSize); x += (p.shapeSize * 2)) {
                for (var y = 0; y < (p.height + p.shapeSize); y += (p.shapeSize * 2)) {
                    p.colors[colorsIndex] = {
                        'r': p.random(255),
                        'g': p.random(255),
                        'b': p.random(255)
                    }
                    colorsIndex++;
                }
            }
        };

        p.draw = () => {
            p.background(0);
            
            let colorsIndex = 0;
            for (var x = 0; x < (p.width + p.shapeSize); x += (p.shapeSize * 2)) {
                for (var y = 0; y < (p.height + p.shapeSize); y += (p.shapeSize * 2)) {
                    p.stroke(p.colors[colorsIndex].r, p.colors[colorsIndex].g, p.colors[colorsIndex].b);
                    p.fill(p.colors[colorsIndex].r, p.colors[colorsIndex].g, p.colors[colorsIndex].b, 63);
                    
                    p.triangle(x - (p.shapeSize / 2), y + (p.shapeSize / 2), x, y - (p.shapeSize / 2), x + (p.shapeSize / 2), y + (p.shapeSize / 2));
                    p.triangle(x - (p.shapeSize / 3), y + (p.shapeSize / 3), x, y - (p.shapeSize / 3), x + (p.shapeSize / 3), y + (p.shapeSize / 3));
                    p.triangle(x - (p.shapeSize / 4), y + (p.shapeSize / 4), x, y - (p.shapeSize / 4), x + (p.shapeSize / 4), y + (p.shapeSize / 4));
                    p.triangle(x - (p.shapeSize / 5), y + (p.shapeSize / 5), x, y - (p.shapeSize / 5), x + (p.shapeSize / 5), y + (p.shapeSize / 5));
                    colorsIndex++;
                }
            }
        };

        
        p.updateCanvasDimensions = () => {
            p.canvasWidth = window.innerWidth;
            p.canvasHeight = window.innerHeight;
            p.createCanvas(p.canvasWidth, p.canvasHeight);
            p.redraw();
        }

        if (window.attachEvent) {
            window.attachEvent(
                'onresize',
                function () {
                    p.updateCanvasDimensions();
                }
            );
        }
        else if (window.addEventListener) {
            window.addEventListener(
                'resize',
                function () {
                    p.updateCanvasDimensions();
                },
                true
            );
        }
        else {
            //The browser does not support Javascript event binding
        }
    };

    useEffect(() => {
        new p5(Sketch, sketchRef.current);
    }, []);

    return (
        <div ref={sketchRef}>
        </div>
    );
};

export default P5Sketch;
