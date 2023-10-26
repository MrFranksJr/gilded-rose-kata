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


function updateHandQuality(item) { };

function updateBrieQuality(item) {
  if (itemHasQualityLessThan(50, item)) {
    item.quality += 1;
  }

  item.sellIn -= 1;

  if (itemHasSellInLessThan(0, item) && itemHasQualityLessThan(50, item)) {
      item.quality += 1;
  }
};

function updateTicketQuality(item) { 
  if (itemHasQualityLessThan(50, item)) {
    item.quality += 1;
    if (itemHasSellInLessThan(11, item) && itemHasQualityLessThan(50, item)) {
        item.quality += 1;
        if (itemHasSellInLessThan(6, item)) {
          item.quality += 1;
      }
    }
  }
  item.sellIn -= 1;

  if (itemHasSellInLessThan(0, item)) {
    item.quality = 0;
  }
};

function updateNormalProductQuality(item) { 
  if (itemHasQualityGreaterThan(0, item)) {
      item.quality -= 1;
      if (itemHasSellInLessThan(0, item)) {
        item.quality -= 1;
      }
  }

  item.sellIn -= 1;
};



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