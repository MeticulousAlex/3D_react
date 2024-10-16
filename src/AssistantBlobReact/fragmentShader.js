const fragmentShader = `
uniform float u_intensity;
uniform float u_time;
uniform int u_texture_type;

varying vec2 vUv;
varying float vDisplacement;

void main() {
    float distort = 2.0 * vDisplacement * u_intensity * sin(vUv.y * 10.0 + u_time);
// this defines our gradient
    vec3 color;
    if (u_texture_type == 1){
        color = vec3(abs( vec2(0.95, 0.65) - 0.5) * 2.0  * (1.0 - distort), 0.35); //last coefficent 1.0 to default color
    } else if (u_texture_type == 2) {
        color = vec3(abs( vUv - 0.5) * 2.0  * (1.0 - distort), 0.27); //last coefficent 1.0 to default color
    } else {
        color = vec3(abs( vUv - 0.5) * 2.0  * (1.0 - distort), 1.0); //last coefficent 1.0 to default color
    }
    gl_FragColor = vec4(color, 1.0);
}

`;

export default fragmentShader;