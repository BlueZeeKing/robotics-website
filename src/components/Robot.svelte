<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import RobotScene from "../lib/RobotScene"
  import { browser } from '$app/environment';
	import { MathUtils } from "three";
	import Overview from "./Overview.svelte";


  let domElement: HTMLCanvasElement;
  let container: HTMLDivElement;

  let robotScene: RobotScene | null = null;

  let pos = 0
  let hold = false

  const ease = (a: number) => {
    return MathUtils.clamp(a/2*3, 0, 1)
  }

  function update(scene: RobotScene) {
    console.log("update")
    if (scene.robot) {
      let shiftAmount = window.innerWidth/4
      domElement.style.left = `${Math.min(pos, 0.5) * (shiftAmount * -2) + shiftAmount}px`

      scene.robot.rotation.z = MathUtils.degToRad(Math.min(pos, 0.5) * 720 + 45)
      scene.robot.position.y = Math.min(pos, 0.5) * -1 + 2

      scene.camera.position.y = Math.min(pos, 0.5) * -3 + 4
      scene.camera.position.z = Math.min(pos, 0.5) * -2 + 5
      scene.camera.lookAt(scene.robot.position);

      if (hold) {
        container.style.position = "fixed"
        container.style.top = "0"
      } else {
        container.style.position = "absolute"
        container.style.top = `${window.innerHeight}px`
      }
    }
  }

  const scrollHandler = () => {
    hold = window.scrollY < window.innerHeight
    pos = ease(window.scrollY/window.innerHeight)

    if (robotScene && robotScene.robot) {
      update(robotScene)
    }
  }

  onMount(() => {
    robotScene = new RobotScene(domElement, update)
    robotScene.update(true)

    scrollHandler()

    document.addEventListener("scroll", scrollHandler)
  })

  onDestroy(() => {
    if (browser) {
      document.removeEventListener("scroll", scrollHandler)
    }
  })
</script>

<div bind:this={container} class="left-0 right-0">
  <div class="h-screen w-screen relative">
    <canvas class="z-10 absolute" bind:this={domElement}></canvas>
    <Overview pos={pos} />
  </div>
</div>