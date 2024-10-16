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
        {name: 'PolygonsR*', min: 2, max:128, step:0.05, slider:true},
        {name: 'PolygonsT*', min: 1, max:128, step:0.05, slider:true},
        {name: 'Arc', min: 0, max:2*Math.PI, step:0.05, slider:true}
        ],
    cone:[
        {name:'Radius', min:0.5, max:2.5, step:0.05, slider:true},
        {name:'Height', min:0,max:3.5,step:0.05, slider:true},
        {name:'PolygonsR*', min: 2, max:128, step:0.05, slider:true},
        {name:'PolygonsY', min:1,max:64, step:1, slider:true},
        {name:'Open Ended', slider:false},
        {name:'θ Start', min:0,max:2*Math.PI, step:0.01, slider:true},
        {name:'θ Length', min:0,max:2*Math.PI, step:0.01, slider:true}
    ],
    torusKnot:[
        {name: 'Radius', min: 0.5, max:1.5, step:0.05, slider:true},
        {name: 'Tube Width', min: 0.1, max:0.75, step:0.01, slider:true},
        {name: 'PolygonsT*', min: 2, max:128, step:0.05, slider:true},
        {name: 'PolygonsR*', min: 3, max:128, step:0.05, slider:true},
        {name: 'P', min:1, max:24, step:1, slider:true},
        {name: 'Q', min:1, max:24, step:1, slider: true}
    ]
}