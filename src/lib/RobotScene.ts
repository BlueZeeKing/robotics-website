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
	Vector2
} from 'three';

export default class RobotScene {
	canvas: HTMLCanvasElement;

	scene = new Scene();
	camera: Camera;
	renderer: WebGLRenderer;

	robot = new Mesh(new BoxGeometry(1.5, 2, 1.5), new MeshStandardMaterial({ color: 0x10b981 }));
	ground = new Mesh(new PlaneGeometry(12, 12, 3, 3), new ShadowMaterial({ opacity: 0.4 }));

	directionalLight = new DirectionalLight(0xfffff, 0.5);
	ambientLight = new AmbientLight(0xfffff, 0.5);

	shouldUpdate = true;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true });

		this.setup();
	}

	setup() {
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = VSMShadowMap;
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		this.scene.background = new Color(0xffffff);

		this.scene.add(this.robot);
		this.scene.add(this.ground);
		this.scene.add(this.directionalLight);
		this.scene.add(this.ambientLight);

		this.robot.castShadow = true;
		this.robot.position.y = 2;
		this.robot.rotateX(MathUtils.degToRad(20));
		this.robot.rotateY(MathUtils.degToRad(45));

		this.directionalLight.castShadow = true;
		this.directionalLight.shadow.mapSize = new Vector2(1024, 1024);
		this.directionalLight.shadow.radius = 10;
		this.directionalLight.position.y = 5;
		this.directionalLight.position.z = 0;
		this.directionalLight.target = this.robot;

		this.ground.receiveShadow = true;
		this.ground.rotateX(MathUtils.degToRad(-90));
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
}
