import React, { useRef, useEffect } from "react";
import './globals';
import "p5/lib/addons/p5.sound";
import * as p5 from "p5";
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

        p.shapeSize = 45;

        p.colors = [];

        p.setup = () => {
            p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
            p.background(0);
            p.strokeWeight(1);
            p.song = p.loadSound(audio);
            p.song.onended(p.logCredits);
            for (let i = 0; i < cueSet1.length; i++) {
                let vars = {
                    'currentCue': (i + 1),
                    'durationTicks': cueSet1[i].durationTicks,
                }
                p.song.addCue(cueSet1[i].time, p.executeCueSet1, vars);
            }

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

        p.executeCueSet1 = (vars) => {
            if (!p.cueSet1Completed.includes(vars.currentCue)) {
                p.cueSet1Completed.push(vars.currentCue);
                p.shapeSize = p.random(130, 200) - parseInt(vars.durationTicks / 400);

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
                console.log(p.colors.length);                

                colorsIndex = 0;
                p.background(0);
                for (var x = 0; x < (p.width + p.shapeSize); x += (p.shapeSize * 2)) {
                    for (var y = 0; y < (p.height + p.shapeSize); y += (p.shapeSize * 2)) {
                        p.stroke(p.colors[colorsIndex].r, p.colors[colorsIndex].g, p.colors[colorsIndex].b);
                        p.fill(p.colors[colorsIndex].r, p.colors[colorsIndex].g, p.colors[colorsIndex].b, 63);

                        p.triangle(x - (p.shapeSize / 0.5), y + (p.shapeSize / 0.5), x, y - (p.shapeSize / 0.5), x + (p.shapeSize / 0.5), y + (p.shapeSize / 0.5));
                        p.triangle(x - (p.shapeSize / 1), y + (p.shapeSize / 1), x, y - (p.shapeSize / 1), x + (p.shapeSize / 1), y + (p.shapeSize / 1));
                        p.triangle(x - (p.shapeSize / 2), y + (p.shapeSize / 2), x, y - (p.shapeSize / 2), x + (p.shapeSize / 2), y + (p.shapeSize / 2));
                        p.triangle(x - (p.shapeSize / 4), y + (p.shapeSize / 4), x, y - (p.shapeSize / 4), x + (p.shapeSize / 4), y + (p.shapeSize / 4));
                        p.triangle(x - (p.shapeSize / 8), y + (p.shapeSize / 8), x, y - (p.shapeSize / 8), x + (p.shapeSize / 8), y + (p.shapeSize / 8));
                        colorsIndex++;
                    }
                }
            }
        }

        p.draw = () => {
            
        };

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
