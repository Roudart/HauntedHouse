class particulasClass{
    material = []; //para particulas
    particles;
    count = 0;
    prendido = true;
    constructor(){
        
        this.vertices = [];
        
        this.numParticles = 1 * 3;
        
        this.positions = new Float32Array(this.numParticles * 3);
        this.scales = new Float32Array(this.numParticles);
        
        this.iyu = 0;
        this.jyu = 0;
    
        for (let ix = 0; ix < 3; ix++) {
    
            for (let iy = 0; iy < 1; iy++) {
        
                this.positions[this.iyu] = 0; // x
                this.positions[this.iyu + 1] = 0; // y
                this.positions[this.iyu + 2] = 0; // z
        
                this.scales[this.jyu] = 1;
        
                this.iyu += 3;
                this.jyu++;
            }
        
        }
        
        
        this.geometry = new THREE.BufferGeometry();
        this.geometry.addAttribute('position', new THREE.BufferAttribute(this.positions, 3));
        this.geometry.addAttribute('scale', new THREE.BufferAttribute(this.scales, 1));
        
        this.sprite = new THREE.TextureLoader().load('img/particula.png');
        
        
        this.material = new THREE.PointsMaterial({ size: 1, sizeAttenuation: true, map: this.sprite, alphaTest: 1, transparent: true });
        this.material.color.setHSL(1.0, 0.3, 0.7);
        
        this.particles = new THREE.Points(this.geometry, this.material);
        scene.add(this.particles);
        console.log("se construye particula");
    }

    ready(){
        console.log("se agrega particula");
        
        return this.particles;
    }

    apagar(){
        this.particles.geometry.setDrawRange(0, 0);
        this.prendido=false;
    }

    prender(){
        this.particles.geometry.setDrawRange(0, 3);
        this.prendido=true;
    }

    render(posX, posY, posZ){
        if (this.prendido == false) {
            return;
        }
        console.log("se renderea particula");
        const positions = this.particles.geometry.attributes.position.array;
        const scales = this.particles.geometry.attributes.scale.array;
        this.particles.geometry.rotateY(THREE.Math.degToRad(.2));
        let ipd = 0;
        for (let ix = 0; ix < 3; ix++) {
            
            for (let iy = 0; iy < 1; iy++) {                
                positions[ipd + 1] = posY + (Math.sin((ix + this.count) * .03) - 0.25);
                positions[ipd + 0] = posX + (Math.sin((ix + this.count) * .5) * 0.6);
                positions[ipd + 2] = posZ + (Math.sin((ix + this.count) * 2) * 0.6); 
       
                ipd += 3;
            }

        }
       
        this.particles.geometry.attributes.position.needsUpdate = true;
        
        this.particles.geometry.setDrawRange(0, 3);
       
        this.count += 0.1;
        
    }

}    
