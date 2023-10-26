const productData = JSON.parse(JSON.stringify(require('../src/data/producttypes.json')));


class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}


class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (const item of this.items) {
      if (item.name == productData["BRIE"]) {
        updateBrieQuality(item);
      }
      else if (item.name == productData["TICKET"]) {
        updateTicketQuality(item);
      }
      else if (item.name == productData["HAND"]) {
        updateHandQuality(item);
      }
      else if (item.name == productData["CONJURED"]) {
        updateConjuredQuality(item);
      }
      else {
        updateNormalProductQuality(item);
      }
    }

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}



//UPDATE FUNCTIONS
function updateHandQuality(item) { 
  //no logic necessary to update hand quality
}

function updateBrieQuality(item) {
  if (itemHasQualityLessThan(50, item)) {
    increaseQuality(item);
    if (itemHasSellInLessThan(0, item)) {
      increaseQuality(item);
    }
  }

  reduceSellIn(item);
}

function updateTicketQuality(item) { 
  if (itemHasQualityLessThan(50, item)) {
    increaseQuality(item);
    if (itemHasSellInLessThan(11, item) && itemHasQualityLessThan(50, item)) {
        increaseQuality(item);
        if (itemHasSellInLessThan(6, item)) {
          increaseQuality(item);
      }
    }
  }
  if (itemHasSellInLessThan(0, item)) {
    item.quality = 0;
  }

  reduceSellIn(item);
}

function updateConjuredQuality(item) {
  if (itemHasQualityGreaterThan(0, item)) {
    reduceQuality(item);
    reduceQuality(item);
    if (itemHasSellInLessThan(0, item)) {
      //twice as fast when SellIn has expired too?
      reduceQuality(item);
      reduceQuality(item);
    }
  }

  reduceSellIn(item);
}

function updateNormalProductQuality(item) { 
  if (itemHasQualityGreaterThan(0, item)) {
      reduceQuality(item);
      if (itemHasSellInLessThan(0, item)) {
        reduceQuality(item);
      }
  }

  reduceSellIn(item)
}




function itemHasQualityLessThan(requestedQuality, item) {
  if (item.quality < requestedQuality) {
    return true;
  }
}

function itemHasQualityGreaterThan(requestedQuality, item) {
  if (item.quality > requestedQuality) {
    return true;
  }
}

function itemHasSellInLessThan(requestedSellIn, item) {
  if (item.sellIn < requestedSellIn) {
    return true;
  }
}

function reduceQuality(item) {
  item.quality -= 1;
}

function increaseQuality(item) {
  item.quality += 1;
}

function reduceSellIn(item) {
  item.sellIn -= 1;
}