export const optionLimits={
    cube:[
        {name:'Width', min:1, max:3.5, step:0.05, slider:true},
        {name:'Height', min:1,max:3.5,step:0.05, slider:true},
        {name:'Depth', min:1,max:3.5, step:0.05, slider:true},
        {name:'PolygonsX', min:1,max:10, step:1, slider:true},
        {name:'PolygonsY', min:1,max:10, step:1, slider:true},
        {name:'PolygonsZ', min:1,max:10, step:1, slider:true},
        ],
    sphere:[
        {name:'Radius', min:0.5, max:2.5, step:0.05, slider:true},
        {name:'PolygonsX', min:1,max:64, step:1, slider:true},
        {name:'PolygonsY', min:1,max:64, step:1, slider:true},
        {name:'φ Start', min:0,max:2*Math.PI, step:0.01, slider:true},
        {name:'φ Length', min:0,max:2*Math.PI, step:0.01, slider:true},
        {name:'θ Start', min:0,max:2*Math.PI, step:0.01, slider:true},
        {name:'θ Length', min:0,max:2*Math.PI, step:0.01, slider:true}
        ],
    torus:[
        {name: 'Radius', min: 0.5, max:2, step:0.05, slider:true},
        {name: 'Tube Width', min: 0.1, max:0.9, step:0.01, slider:true},
        {name: 'PolygonsR', min: 2, max:128, step:0.05, slider:true},
        {name: 'PolygonsT', min: 1, max:128, step:0.05, slider:true},
        {name: 'Arc', min: 0, max:2*Math.PI, step:0.05, slider:true}
        ],
    cone:[
        {name:'Radius', min:0.5, max:2.5, step:0.05, slider:true},
        {name:'Height', min:0,max:3.5,step:0.05, slider:true},
        {name:'PolygonsR', min: 2, max:128, step:0.05, slider:true},
        {name:'PolygonsY', min:1,max:64, step:1, slider:true},
        {name:'Open Ended', slider:false},
        {name:'θ Start', min:0,max:2*Math.PI, step:0.01, slider:true},
        {name:'θ Length', min:0,max:2*Math.PI, step:0.01, slider:true}
    ],
    torusKnot:[
        {name: 'Radius', min: 0.5, max:1.5, step:0.05, slider:true},
        {name: 'Tube Width', min: 0.1, max:0.75, step:0.01, slider:true},
        {name: 'PolygonsT', min: 2, max:128, step:0.05, slider:true},
        {name: 'PolygonsR', min: 3, max:128, step:0.05, slider:true},
        {name: 'P*', min:1, max:24, step:1, slider:true},
        {name: 'Q*', min:1, max:24, step:1, slider: true}
    ]
}

export const primitiveDescriptions = {
    cube: <>A cube is a fundamental 3D primitive, defined by six equal square faces, eight vertices, and twelve edges. Its simple geometry allows easy scaling along length, width, and height, making it a common starting point in modeling and animation. Due to its symmetrical structure, the cube is efficient for rendering and ideal for texture mapping, allowing for straightforward application of surface details.<br></br><br></br>In 3D applications, cubes are often used as placeholders or collision boxes, offering reliable boundaries for object interactions.</>,
    sphere: <>A sphere is a basic 3D primitive. Every vertex of its surface is equidistant from the center. A sphere may contain fewer polygons, giving it a faceted, angular appearance, which is important in performance-sensitive applications, whereas increasing the number of polygons can make the sphere smoother, as each additional polygon reduces the angles between faces, approximating a more rounded look. Higher-polygon spheres are often used when realism or smooth shading is essential, such as high-quality animations, as they better capture light and shadow transitions.</>,
    torus:<>A torus is a 3D shape resembling a ring or donut, formed by rotating a circle around a central axis. It’s commonly used to model objects like rings and tires, with adjustable thickness and diameter for versatility.<br></br><br></br>The torus can be smooth or faceted, depending on the polygon count, allowing a balance between visual quality and rendering performance. It’s popular in 3D scenes for both structural and decorative elements.</>,
    cone:<>A cone is a 3D primitive with a circular base that tapers smoothly to an apex, defined by its height and radius. This shape, with rotational symmetry, is often used to model objects like funnels, spikes, and pylons.<br></br><br></br>The cone’s polygon count affects the smoothness of its curved surface—fewer polygons create a faceted look, while more polygons provide a smoother appearance. This versatility makes cones suitable for both stylized and realistic renderings in 3D applications.</>,
    knot:<>A torus knot is a 3D shape that twists around a central void, forming intricate loops unlike a regular torus. Its complexity can be adjusted by changing the number of twists, making it popular for decorative and abstract designs.<br></br><br></br>Higher polygon counts make the torus knot smoother and more detailed, enhancing its visual appeal in intricate renders. Its unique form adds complexity and interest to 3D scenes and models.<br></br><br></br>*Q - rotations around a cross section of the tube <br></br>*P - spins around its axis of rotational symmetry</>,
}