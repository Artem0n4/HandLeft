function setButton() {
  const click = function (
    position: Vector,
    container:
      | ItemContainer
      | com.zhekasmirnov.innercore.api.mod.ui.container.UiAbstractContainer
  ) {
    const players = Network.getConnectedPlayers();
    for(const i in players){
    const client = Network.getClientForPlayer(players[i]);
    client.send("hl.manipulate", {})
    }
  };

  const BUTTON = new UI.Window({
    location: {
      x: 5,
      y: UI.getScreenHeight() / 2 - 110,
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
        scale: 30,
        clicker: {
          onClick: function (position, container) {
            return click(position, container);
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

