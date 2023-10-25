var {expect} = require('chai');
var {Shop, Item} = require('../src/gilded_rose.js');

const tests = require('../tests.json')

describe("Gilded Rose", function() {

  for (test of tests) {
    const [
      name,
      originalSellIn,
      originalQuality,
      sellIn,
      quality
    ] = test;

    const testDescription = {
      name,
      originalSellIn,
      originalQuality,
      sellIn,
      quality
    }

    it(JSON.stringify(testDescription), function() {
      const gildedRose = new Shop([ new Item(name, originalSellIn, originalQuality) ]);
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).to.equal(sellIn);
      expect(items[0].quality).to.equal(quality);
    });
  }

  it("isolated: Aged Brie", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 2, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(1);
    expect(items[0].quality).to.equal(1);
  });

  it("isolated: Sulfuras, Hand of Ragnaros", function() {
    const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 0, 80) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(80);
  });


/* 
  it("Write expected test results", function() {
    const products = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
      new Item("Conjured Mana Cake", 3, 6),
    ]

    const testArray = [];

    for (const product of products) {
      const originalSellIn = product.sellIn;
      const originalQuality = product.quality;

      const gildedRose = new Shop([ product ]);
      gildedRose.updateQuality();

      testArray.push([
        product.name,
        originalSellIn,
        originalQuality,
        product.sellIn,
        product.quality,
      ])
    }

    console.log(JSON.stringify(testArray));
    console.log(testArray.length);
  });
 */


});