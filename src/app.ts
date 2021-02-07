import MainScene from './scene'
window.addEventListener('DOMContentLoaded', () => {
    // Create the game using the 'renderCanvas'.
    let playground = new MainScene('renderCanvas');

    // Create the scene.
    playground.createScene();

    // Start render loop.
    playground.doRender();
  });