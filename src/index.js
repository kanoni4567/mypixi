let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;
    TextureCache = PIXI.utils.TextureCache;
    Rectangle = PIXI.Rectangle;

let app = new Application({ 
  width: 512, 
  height: 512,                       
  antialias: true, 
  transparent: false, 
  resolution: 1
});

document.body.appendChild(app.view);

loader
  .add('src/assets/treasureHunter.json')
  .load(setup3);

function setup1() {
  let cat = new Sprite(resources["src/assets/cat.png"].texture);
  app.stage.addChild(cat);
  cat.position.set(96, 96);
  cat.scale.set(0.5, 0.5);
  cat.anchor.set(0.5, 0.5);
  cat.rotation = 1;
}

function setup2() {
  let texture = TextureCache["src/assets/tileset.png"];
  let rectangle = new Rectangle(192, 128, 64, 64);
  texture.frame = rectangle;
  let rocket = new Sprite(texture);
  rocket.position.set(32, 32);
  app.stage.addChild(rocket);
  app.renderer.render(app.stage);
}

let dungeon, explorer, treasure, door, id;

function setup3() {
  let dungeonTexture = TextureCache["dungeon.png"];
  dungeon = new Sprite(dungeonTexture);
  app.stage.addChild(dungeon);

  explorer = new Sprite(resources["src/assets/treasureHunter.json"].textures["explorer.png"]);
  explorer.x = 68;
  explorer.y = app.stage.height / 2 - explorer.height / 2;
  app.stage.addChild(explorer);

  id = resources["src/assets/treasureHunter.json"].textures;
  treasure = new Sprite(id['treasure.png']);
  treasure.x = app.stage.width - treasure.width - 48;
  treasure.y = app.stage.height / 2 - treasure.height / 2;
  app.stage.addChild(treasure);

  door = new Sprite(id['door.png']);
  door.position.set(32, 0);
  app.stage.addChild(door);

  let numOfBlobs = 6;
      spacing = 48;
      xOffset = 150;
  for (let i = 0; i < numOfBlobs; i++) {
    let blob = new Sprite(id['blob.png']);
    let x = spacing * i + xOffset;
    let y = randomInt(0, app.stage.height - blob.height);
    blob.position.set(x, y);
    app.stage.addChild(blob);
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}