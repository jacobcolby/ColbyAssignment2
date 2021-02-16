"use strict";

// declare global variables
let gl; 
let points;
let points2;
let colors;
let colors2;

window.onload = function init()
{
    let canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if (!gl) { alert( "WebGL 2.0 isn't available" ); }


    //  Initialize our data for the triangles
    //
    colors = [
        vec3(1.0, 0.5, 0.0),
        vec3(1.0, 0.2, 0.6),
        vec3(0.0, 0.8, 1.0)
    ];

    points = [
        vec2(0.4, 0.9),
        vec2(-0.7, 0),
        vec2(0.4, -0.9)
    ];
    //Draw Eye
    let x = -0.3;
    let y = 0.1;
    let dx = 0.2
    let dy = 0.2
    let r = 1
    let g = 1
    let b = 1
    let pt0 = vec2(x,y);
    let color = vec3(r,g,b);
    drawSolidTriangle(pt0, dx, dy, color);
    x = -0.3;
    y = 0.15;
    dx = 0.1
    dy = 0.1
    r = 0
    g = 0
    b = 0
    pt0 = vec2(x,y);
    color = vec3(r,g,b);
    drawSolidTriangle(pt0, dx, dy, color);

    //Draw Fin
    x = 0.1;
    y = -0.5;
    dx = 0.7
    dy = 0.7
    r = 0.3
    g = 0.5
    b = 0.6
    pt0 = vec2(x,y);
    color = vec3(r,g,b);
    drawSolidTriangle(pt0, dx, dy, color);

    //Draw Seaweed
    for (let i = 0; i < 20; i++) {
        x = (Math.random() * 2 ) - 1
        y = (Math.random() * 0.4 ) - 1.7;
        dx = (Math.random() * 0.2) + 0.1
        dy = (Math.random() * 0.6 ) + 0.5
        r = Math.random() * 0.4
        g = 0.65
        b = Math.random() * 0.4
        pt0 = vec2(x,y);
        color = vec3(r,g,b);
        drawSolidTriangle(pt0, dx, dy, color);
    }
    
    

    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor(0.1, 0.4, 1.0, 1.0 ); //BG color

    //  Load shaders and initialize attribute buffers

    let program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    let cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
    
    let colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc); 
    
    // Load the data into the GPU

    let bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    let aPosition = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( aPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( aPosition );


    render();
};

function drawSolidTriangle(pt0, dx, dy, color) {
    //adds values to points and colors global variables
    //creates a triangle at pt0, with width dx, and height dy
    let pt1 = vec2(pt0[0], pt0[1]+dy);
    let pt2 = vec2(pt0[0] + dx, pt0[1]+dy);
    points.push(pt0);
    points.push(pt1);
    points.push(pt2);

    colors.push(color);
    colors.push(color);
    colors.push(color);
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points.length);
}
