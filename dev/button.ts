function setButton() {
  
      
  

  const COORDS_Y = __config__.getFloat("button_y");
  const COORDS_X = __config__.getFloat("button_x");
  const BUTTON_SIZE = __config__.getFloat("button_size");

  const BUTTON = new UI.Window({
    location: {
      x: COORDS_X,
      y: UI.getScreenHeight() / 2 - COORDS_Y,
      width: 100,
      height: 100,
    },

    drawing: [
      {
        type: "background",
        color: android.graphics.Color.argb(0, 0, 0, 0),
      },
    ],

    elements: {
      button: {
        type: "button",
        x: 0,
        y: 0,
        bitmap: "button",
        bitmap2: "button_2",
        scale: BUTTON_SIZE,
        clicker: {
          onClick: function (position, container) {
            Network.sendToServer("hl.manipulate", {});
          },
        },
      },
    },
  });
  BUTTON.setAsGameOverlay(true);
  return {
    ui: BUTTON,
    container: new UI.Container(),
  };
}

const button = setButton();

Callback.addCallback("NativeGuiChanged", function (screenName) {
  if (screenName == "in_game_play_screen") {
    button.container.openAs(button.ui);
  } else {
    button.container.close();
  }
});

const Left = {
  getItem: function (entity, id, data?) {
    const item = Entity.getOffhandItem(entity);
    if (item.id == id && (item.data == data || 0)) return true;
    return false;
  },
  itemPlacer(
    block: number,
    item: { id: number; count: number; data: number } | any,
    entity,
    coords: Callback.ItemUseCoordinates
  ) {
    const rel = coords.relative;
    const block_ = BlockSource.getDefaultForActor(entity);
    const item_ = Entity.getCarriedItem(entity);
    return (
      Entity.setCarriedItem(
        entity,
        item,
        item_.count - 1,
        0,
        null
      ),
      block_.setBlock(rel.x, rel.y, rel.z, block, 0),
      Game.message("???")
    );
  },
  itemReplacer(item1, item2, entity, coords, block1, block2?) {
    if (Left.getItem(entity, item1, 0)) {
     return ( Left.itemPlacer(block1, item1, entity, coords),
      Entity.setOffhandItem(
        entity,
        item2,
        1,
        0,
        null
      ) )
    } else if (Left.getItem(entity, item2, 0)) {
     return ( Left.itemPlacer(block2 || 0, item2, entity, coords),
      Entity.setOffhandItem(
        entity,
        item1,
        1,
        0,
        null
      ) )
    }
  },
};

ModAPI.registerAPI("HandLeftAPI", {
  Left: Left,
  requireGlobal: function (command) {
    return eval(command);
  },
});
