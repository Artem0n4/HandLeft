
Network.addClientPacket("hl.manipulate", (packetData) => {
    const player = Player.get();
    const item = Entity.getCarriedItem;
    const set = Entity.setOffhandItem;
    if (Entity.getOffhandItem(player).id === 0) {
      set(
        player,
        item(player).id,
        item(player).id,
        item(player).data,
        item(player).extra
      );
      Player.setInventorySlot(Player.getSelectedSlotId(), 0, 0, 0, null);
    } else {
      const ontime = [];
      ontime.push(item(player), Entity.getOffhandItem(player));

      Player.setInventorySlot(
        Player.getSelectedSlotId(),
        ontime[1].id,
        ontime[1].count,
        ontime[1].data,
        ontime[1].extra
      );

      set(
        player,
        ontime[0].id,
        ontime[0].count,
        ontime[0].data,
        ontime[0].extra
      );
    }
})

Callback.addCallback("ItemUse", (coords, item, block, isExternal, player) => {
    const hand = Entity.getOffhandItem(player);
    if(Entity.getSneaking(player)) {
    if ((hand.id > 255 && hand.id < 8192)) return;
    const rel = coords.relative;
    const region = BlockSource.getDefaultForActor(player);
    region.setBlock(rel.x, hand.id === 2 ? rel.y - 1 : rel.y, rel.z, hand.id, 0);
    Entity.setOffhandItem(player, hand.id, hand.count - 1,
       coords.side, hand.extra)
 }
 });
  