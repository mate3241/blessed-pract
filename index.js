var blessed = require('blessed');

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'Receptek';
const food = {
  előétel: ['sajttál', 'pirítós', 'saláta'],
  leves: ['gombakrémleves', 'halászlé', 'gulyásleves'],
  főétel: ['sült kacsa', 'oldalas', 'rántott sajt'],
  desszert: ['palacsinta', 'dobostorta', 'tiramisu']
};
const header = blessed.box({
  top: 0,
  left: 0,
  width: '100%',
  height: '10%',
  align: 'center',
  valign: 'middle',
  content: 'Receptkezelő 0.1',
  border: {
    type: 'line'
  }

});
// Create a box perfectly centered horizontally and vertically.
const categoriesList = blessed.list({
  bottom: 5,
  left: 0,
  width: '20%',
  height: '80%',
  items: Object.getOwnPropertyNames(food),
  tags: true,
  mouse: true,
  keys: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: '#f0f0f0'
    },
    focus: {
      border: {
        fg: 'green'
      }
    }
  }
});

const foodList = blessed.list({
  bottom: 5,
  right: 0,
  width: '80%',
  height: '80%',
  border: {
    type: 'line'
  },
  items: food['előétel'],
  keys: true,
  mouse: true,
  focusable: true,
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: 'f0f0f0'
    },
    focus: {
      border: {
        fg: 'green'
      }
    }
  }
});

var crudBar = blessed.listbar({
  bottom: 0,
  height: '8%',
  mouse: true,
  keyboard: true,
  border: 'line',
  align: 'center',
  style: {
    bg: 'green',
    item: {
      bg: 'red',
      hover: {
        bg: 'blue'
      }
    },
    selected: {
      bg: 'blue'
    }
  },
  commands: {
    Create: {
      keys: ['C-c'],
      callback: function () {
        console.log('Create');
      }
    },
    Read: {
      keys: ['C-r'],
      callback: function () {
        console.log('Read');
      }
    },
    Update: {
      keys: ['C-u'],
      callback: function () {
        console.log('Update');
      }
    },
    Destroy: {
      keys: ['C-d'],
      callback: function () {
        console.log('Destroy');
      }
    }
  }
});
foodList.on('click', function (data) {
  foodList.focus();
});
// If our box is clicked, change the content.
categoriesList.on('click', function (data) {
  categoriesList.focus();
});
categoriesList.key('tab', function (ch, key) {
  foodList.focus();
});
foodList.key('tab', function (ch, key) {
  categoriesList.focus();
});
// If box is focused, handle `enter`/`return` and give us some more content.
categoriesList.key('enter', function (ch, key) {
  //foodList.setItems(food.item);
  
  //categoriesList.setLine(1, 'bar');
  //categoriesList.insertLine(1, 'foo');
  screen.render();
});
categoriesList.on('select', function (item, select) {
  foodList.setItems([]);
  foodList.setItems(food[item.getText()]);
  screen.render();
  });
screen.key(['escape', 'q'], function (ch, key) {
  return process.exit(0);
});
screen.append(header);
screen.append(categoriesList);
screen.append(foodList);
screen.append(crudBar);
categoriesList.focus();
screen.render();
