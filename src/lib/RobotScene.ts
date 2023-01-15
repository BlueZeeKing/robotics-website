import {
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	BoxGeometry,
	MeshStandardMaterial,
	Color,
	Mesh,
	PlaneGeometry,
	DirectionalLight,
	VSMShadowMap,
	AmbientLight,
	ShadowMaterial,
	MathUtils,
	Camera,
	Vector2,
	Object3D,
	Group,
	SpotLight,
	SpotLightHelper
} from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// @ts-expect-error Loading external assets
import model from '$lib/assets/f360.fbx';

export default class RobotScene {
	canvas: HTMLCanvasElement;

	scene = new Scene();
	camera: Camera;
	renderer: WebGLRenderer;

	ground = new Mesh(new PlaneGeometry(12, 12, 3, 3), new ShadowMaterial({ opacity: 0.4 }));
	robot: Group | null = null;

	directionalLight = new DirectionalLight('white', 0.5);
	ambientLight = new AmbientLight('white', 0.5);

	shouldUpdate = true;

	constructor(canvas: HTMLCanvasElement, onLoad: (scene: RobotScene) => void) {
		this.canvas = canvas;
		this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true });

		this.setup(onLoad);
	}

	async setup(onLoad: (scene: RobotScene) => void) {
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = VSMShadowMap;
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		this.scene.background = new Color(0xffffff);

		this.robot = await this.loadModel();

		console.log(this.robot);

		const castShadow = (child: Object3D) => {
			child.castShadow = true;
			child.children.forEach(castShadow);
		};

		this.robot.children.forEach(castShadow);

		this.scene.add(this.robot);
		this.scene.add(this.ground);
		this.scene.add(this.directionalLight);
		this.scene.add(this.ambientLight);

		this.robot.scale.multiplyScalar(0.5);
		this.robot.castShadow = true;
		this.robot.position.set(0, 2, 0);
		this.robot.rotateX(MathUtils.degToRad(90));
		this.robot.rotateY(MathUtils.degToRad(0));

		this.directionalLight.castShadow = true;
		this.directionalLight.shadow.mapSize = new Vector2(1024, 1024);
		this.directionalLight.shadow.radius = 10;
		this.directionalLight.position.y = 5;
		this.directionalLight.position.z = 0;
		this.directionalLight.target = this.robot;

		this.ground.receiveShadow = true;
		this.ground.rotateX(MathUtils.degToRad(-90));

		onLoad(this);
	}

	update(again = true, first = true) {
		if (first) {
			this.shouldUpdate = again;
		}

		if (again && this.shouldUpdate) {
			requestAnimationFrame(() => this.update(true, false));
		}

		this.renderer.render(this.scene, this.camera);
	}

	loadModel() {
		const loader = new FBXLoader();

		return new Promise<Group>((resolve, reject) => {
			loader.load(
				model,
				(model) => resolve(model),
				undefined,
				(error) => reject(error)
			);
		});
	}
}
