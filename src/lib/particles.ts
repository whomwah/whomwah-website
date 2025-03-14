import { IOptions, RecursivePartial, SingleOrMultiple, tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export async function loadParticles(
  options: SingleOrMultiple<RecursivePartial<IOptions>>
) {
  await loadSlim(tsParticles);

  const particles = await tsParticles.load({ id: "tsparticles", options });
  if (!particles) return;

  const setParticleCount = () => {
    const width = window.innerWidth;

    // Adjust the number of particles based on the window's width
    if (width < 500) {
      particles.options.particles.number.value = 50;
    } else if (width < 800) {
      particles.options.particles.number.value = 100;
    } else {
      particles.options.particles.number.value = 200;
    }

    // Refresh the particles with the new options
    particles.refresh();
  };

  // Set the initial particle count
  setParticleCount();

  window.addEventListener("resize", () => setParticleCount());
}

const configs: SingleOrMultiple<RecursivePartial<IOptions>> = {
  pauseOnBlur: true,
  particles: {
    color: {
      value: ["#c2d1f5", "#c2e5d6", "#fef1c2", "#fbd2d2"],
    },
    links: {
      color: "random",
      distance: 200,
      enable: true,
      opacity: 0.8,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: "bounce",
      speed: 1,
    },
    number: {
      value: 200,
    },
    size: {
      value: 1,
    },
  },
  background: {
    color: "#fff",
  },
  fullScreen: {
    zIndex: 0,
  },
};

loadParticles(configs);
