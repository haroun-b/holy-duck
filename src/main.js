import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

function windowRatio() {
  return window.innerWidth / window.innerHeight;
}

function handleLoadError(err) {
  console.error(err);
  document.getElementById("error-message").style.display = "block";
}

const holyDuck3D = {
  scene: new THREE.Scene(),
  camera: new THREE.PerspectiveCamera(75, windowRatio(), 0.1, 1000),
  renderer: new THREE.WebGLRenderer(),
  gltfLoader: new GLTFLoader(),

  init() {
    this.gltfLoader.load(
      "/assets/holy-duck.glb",
      ({ scene: modelScene }) => {
        this.scene.add(modelScene);

        this.camera.position.z = 13;
        this.camera.position.y = 6;

        document.body.append(this.renderer.domElement);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.renderer.setAnimationLoop(() => {
          modelScene.rotation.y += 0.008;

          this.renderer.render(this.scene, this.camera);
        });

        document.getElementById("backdrop").style.display = "flex";
      },
      undefined,
      handleLoadError
    );
  },
  handleWindowResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera.aspect = windowRatio();
    this.camera.updateProjectionMatrix();
  }
};

holyDuck3D.init();
window.addEventListener(
  "resize",
  holyDuck3D.handleWindowResize.bind(holyDuck3D)
);

const cursorEl = document.getElementById("cursor");
window.addEventListener("mousemove", (e) => {
  cursorEl.style.top = `${e.clientY}px`;
  cursorEl.style.left = `${e.clientX}px`;
});
