import React, { useRef, useEffect } from "react";
import './globals';
import "p5/lib/addons/p5.sound";
import * as p5 from "p5";
import ShuffleArray from './ShuffleArray.js';
import audio from '../audio/triangles-no-1.ogg'
import cueSet1 from './cueSet1.js'

const P5Sketch = () => {
    const sketchRef = useRef();

    const Sketch = p => {

        p.canvas = null;

        p.canvasWidth = window.innerWidth;

        p.canvasHeight = window.innerHeight;

        p.song = null;

        p.cueSet1Completed = [];

        p.shapeSize = 60;

        p.preload = () => {
            p.song = p.loadSound(audio);
        }

        p.setup = () => {
            p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
            p.background(0);
            p.strokeWeight(1);
            p.song.onended(p.logCredits);
            for (let i = 0; i < cueSet1.length; i++) {
                let vars = {
                    'currentCue': (i + 1),
                    'duration': cueSet1[i].duration,
                    'durationTicks': cueSet1[i].durationTicks,
                }
                p.song.addCue(cueSet1[i].time, p.executeCueSet1, vars);
            }
        };

        p.draw = () => {
            
        };

        p.executeCueSet1 = (vars) => {
            if (!p.cueSet1Completed.includes(vars.currentCue)) {
                p.cueSet1Completed.push(vars.currentCue);
                p.shapeSize = parseInt(vars.durationTicks / 500);

                if (vars.currentCue === cueSet1.length){
                    //the last one
                    p.shapeSize = p.shapeSize + p.random(20, 40);
                }
                else if (p.shapeSize > 80) {
                    p.shapeSize = p.shapeSize + p.random(-80, 0);
                }
                else {
                    p.shapeSize = p.shapeSize + p.random(-10, 20);
                }

                let triangles = [];
                let index = 0;
                for (var x = 0; x < (p.width + p.shapeSize); x += (p.shapeSize * 2)) {
                    for (var y = 0; y < (p.height + p.shapeSize); y += (p.shapeSize * 2)) {
                        triangles[index] = {
                            'x': x,
                            'y': y,
                            'shapeSize': p.shapeSize,
                            'r': p.random(255),
                            'g': p.random(255),
                            'b': p.random(255),
                        }
                        index++;
                    }
                }
                triangles = ShuffleArray(triangles);

                p.background(0);
                const delayAmount = parseInt(vars.duration * 1000) / triangles.length;
                for (let i = 0; i < triangles.length; i++) {
                    setTimeout(
                        function () {
                            p.drawTriangleGroup(triangles[i])
                        },
                        (delayAmount * i)
                    );
                }

            }
        }

        p.drawTriangleGroup = (triangleGroup) => {
            let i = 0.5;
            let x = triangleGroup.x;
            let y = triangleGroup.y;
            let shapeSize = triangleGroup.shapeSize;
            
            p.stroke(triangleGroup.r, triangleGroup.g, triangleGroup.b);
            p.fill(triangleGroup.r, triangleGroup.g, triangleGroup.b, 63);
            
            while (i <= 8) {
                p.triangle(x - (shapeSize / i), y + (shapeSize / i), x, y - (shapeSize / i), x + (shapeSize / i), y + (shapeSize / i));
                i = i * 2;
            }
        }

        p.mousePressed = () => {
            if (p.song.isPlaying()) {
                p.song.pause();
            } else {
                if (parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)) {
                    p.reset();
                }
                //document.getElementById("play-icon").classList.add("fade-out");
                p.canvas.addClass('fade-in');
                p.song.play();
            }
        };


        p.creditsLogged = false;

        p.logCredits = () => {
            if (!p.creditsLogged && parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)) {
                p.creditsLogged = true;
                console.log(
                    'Music By: http://labcat.nz/',
                    '\n',
                    'Animation By: https://github.com/LABCAT/triangles-no-1',
                );
                p.song.stop();
            }
        }

        p.reset = () => {
            p.clear();
            p.cueSet1Completed = [];
            p.shapeSize = 60;
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
