declare module 'particles.js' {
  interface ParticlesConfig {
    particles: any;
    interactivity: any;
    retina_detect: boolean;
  }

  function particlesJS(id: string, config: ParticlesConfig): void;
  export default particlesJS;
}
