<script lang="ts">
	import { onMount } from "svelte";


  export let pos: number;

  let container: HTMLDivElement
  let path: SVGPathElement
  let width = 0;

  $: if (container) {
    container.style.opacity = `${Math.max(pos-0.5, 0)*2}`
  }
</script>

<div bind:this={container} class="absolute w-screen h-screen z-20 top-0 grid-cols-3 grid place-content-center">
  <p class="p-8 leading-loose">The robot competing in the First Robotics Charged Up competition was a marvel of engineering and design. Built by a team of dedicated students and mentors, the robot was designed to navigate a challenging obstacle course, collect and deliver various objects, and perform other tasks. Equipped with advanced sensors and cutting-edge technology, the robot was able to navigate the course with precision and speed. Despite facing stiff competition from other teams, the robot performed exceptionally well, impressing the judges and spectators alike. The team behind the robot was thrilled with its performance and are already looking forward to the next competition.</p>
  <p class="p-8 leading-loose col-start-3">The robot that competed in the First Robotics Charged Up competition was built with a variety of advanced features. It was equipped with a state-of-the-art drivetrain that allowed for smooth and efficient movement across the field. The robot also had a number of manipulator arms and grippers that were used to collect and deliver objects throughout the course. Additionally, the robot was outfitted with a variety of sensors, including cameras, lidar, and ultrasonic sensors, which allowed it to navigate the course with precision and avoid obstacles. The robot also had a robust control system that was able to process sensor data in real-time and make precise adjustments to its movements. The team that built the robot spent countless hours designing, building, and testing the robot, and their hard work paid off in the competition as it performed extremely well.</p>
</div>