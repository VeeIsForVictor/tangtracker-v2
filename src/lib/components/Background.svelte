<div class="moving-grid absolute top-0 left-0 h-dvh w-dvw"></div>

<style>
	.moving-grid {
		z-index: -100;

		/* Set the background size to define the grid cell dimensions */
		background-size: 40px 40px;

		/* Create the grid using two repeating linear gradients */
		background-image:
			linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
			linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px);

		/* Apply the animation */
		animation: move-grid 3s linear infinite;

		/* Styling for the container */
		background-color: var(--color-orange-50);
		height: 100vh;
		width: 100%;
	}

	@keyframes move-grid {
		from {
			background-position: 0 0;
		}
		to {
			/* Moving by the background-size ensures a seamless loop */
			background-position: 40px 40px;
		}
	}
</style>
