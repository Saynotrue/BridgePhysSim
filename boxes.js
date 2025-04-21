import * as THREE from 'three';
import * as CANNON from 'https://cdn.jsdelivr.net/npm/cannon-es@0.20.0/dist/cannon-es.js';

export const parts = [];
export const partBodies = [];

export function createBridgeParts(scene, world) {
  parts.length = 0;
  partBodies.length = 0;

  const numParts = 7;
  const spacing = 0.7;
  const y = 1;

  for (let i = 0; i < numParts; i++) {
    const boxGeo = new THREE.BoxGeometry(0.6, 0.15, 0.15);
    const boxMat = new THREE.MeshStandardMaterial({ color: 0x0077ff });
    const mesh = new THREE.Mesh(boxGeo, boxMat);
    mesh.position.set(i * spacing - ((numParts - 1) * spacing) / 2, y, 0);
    scene.add(mesh);
    parts.push(mesh);

    const mass = (i === 0 || i === numParts - 1) ? 0 : 1; // 양 끝은 고정
    const body = new CANNON.Body({
      mass: mass,
      position: new CANNON.Vec3(mesh.position.x, mesh.position.y, mesh.position.z),
      shape: new CANNON.Box(new CANNON.Vec3(0.3, 0.075, 0.075)),
    });

    if (mass === 0) body.type = CANNON.Body.STATIC;
    world.addBody(body);
    partBodies.push(body);
  }

  // 연결하는 제약조건 추가 (단순한 거리 제약)
  for (let i = 0; i < numParts - 1; i++) {
    const constraint = new CANNON.DistanceConstraint(partBodies[i], partBodies[i + 1], spacing);
    world.addConstraint(constraint);
  }
}
