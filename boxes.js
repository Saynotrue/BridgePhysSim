import * as THREE from 'three';
import * as CANNON from 'https://cdn.jsdelivr.net/npm/cannon-es@0.20.0/dist/cannon-es.js';

export const boxes = [];
export const boxBodies = [];

export function createBoxes(scene, world) {
  boxes.length = 0;
  boxBodies.length = 0;

  for (let i = 0; i < 3; i++) {
    const boxGeo = new THREE.BoxGeometry(1, 0.2, 0.2);
    const boxMat = new THREE.MeshStandardMaterial({ color: 0x00aaff });
    const boxMesh = new THREE.Mesh(boxGeo, boxMat);
    boxMesh.position.set(i * 1.2 - 1.2, 1, 0);
    scene.add(boxMesh);
    boxes.push(boxMesh);

    const mass = (i === 0 || i === 2) ? 0 : 1;
    const boxBody = new CANNON.Body({
      mass: mass,
      position: new CANNON.Vec3(i * 1.2 - 1.2, 1, 0),
      shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.1, 0.1)),
    });
    if (mass === 0) boxBody.type = CANNON.Body.STATIC;
    world.addBody(boxBody);
    boxBodies.push(boxBody);
  }
}