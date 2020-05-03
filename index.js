const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'toor',
    database: 'blessed_recipes'
  }
});
var blessed = require('blessed');

var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'Receptek';

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
const categoriesList = blessed.list({
  bottom: 5,
  left: 0,
  width: '20%',
  height: '80%',
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

const recipeList = blessed.list({
  bottom: 5,
  right: 0,
  width: '80%',
  height: '80%',
  border: {
    type: 'line'
  },
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
screen.key('tab', function (ch, key) {
  screen.focusNext();
});
categoriesList.on('click', function (data) {
  categoriesList.focus();
});
recipeList.on('click', function (data) {
  recipeList.focus();
});

screen.key(['escape', 'q'], function (ch, key) {
  return process.exit(0);
});

const getCategories = async () => { // ezt ne bántsd
  const categoryNames = await knex.from('category').select('name', 'id');
  categoriesList.clearItems();
  categoryNames.forEach(element => {
    categoriesList.addItem(element.name + '(' + element.id + ')');
  });
  screen.render();
};

categoriesList.on('select', async function (item, select) {
  recipeList.setItems([]);
  const categoryId = (item.getText().split('(')[1].split(')')[0]);
  getFoodsInCategory(categoryId);
  screen.render();
  recipeIsWrittenOnScreen = false;
});

const getFoodsInCategory = async (categoryId) => {
  const value = await knex.from('recipe').select('name', 'id').where('categoryId', categoryId);
  value.forEach(element => {
    recipeList.addItem(element.name + '(' + element.id + ')');
  });
  screen.render();
};

let recipeIsWrittenOnScreen = false;
recipeList.on('select', async function (item, select) {
  if (recipeIsWrittenOnScreen === false) {
    recipeList.setItems([]);
    const recipeId = (item.getText().split('(')[1].split(')')[0]);
    screen.render();
    getRecipeDetails(recipeId);
    recipeIsWrittenOnScreen = true;
  }
});

const getRecipeDetails = async (recipeId) => {
  const foodDetails = await knex.from('recipe').select().where('id', recipeId).first();
  recipeList.setItems([]);
  (Object.getOwnPropertyNames(foodDetails)).forEach(element => {
    recipeList.addItem(element + ': ' + foodDetails[element]);
  });
  screen.render();
};

getCategories();
screen.append(header);
screen.append(categoriesList);
screen.append(recipeList);
screen.append(crudBar);
categoriesList.focus();
screen.render();
