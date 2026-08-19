import confetti from "canvas-confetti";

export const celebrate = () => {
  const duration = 2000;
  const animationEnd = Date.now() + duration;

  const defaults = {
    startVelocity: 25,
    spread: 360,
    ticks: 70,
    zIndex: 9999,
  };

  const randomInRange = (min, max) =>
    Math.random() * (max - min) + min;

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = 8;

    confetti({
      ...defaults,
      particleCount,
      origin: {
        x: randomInRange(0.1, 0.9),
        y: 0,
      },
      angle: randomInRange(70, 110),
    });
  }, 120);
};