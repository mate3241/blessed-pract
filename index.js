var blessed = require('blessed');

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'Receptek';

let header = blessed.box({
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
screen.append(header);
// Create a box perfectly centered horizontally and vertically.
var box = blessed.box({
  bottom: 5,
  left: 0,
  width: '20%',
  height: '80%',
  content: '{center}Ide jön majd a receptek listája{/center}',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  }
});
const categories = ['előétel', 'leves', 'főétel', 'desszert'];
const fillListWithCategories = () => {

  list.insertLine(1, categories);
};

// Append our box to the screen.
screen.append(box);

var list = blessed.listbar({
  bottom: 5,
  right: 0,
  width: '80%',
  height: '80%',
  content: 'itt lesznek leírva a receptek',
  border: {
    type: 'line'
  },
  focusable: true,
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: 'f0f0f0'
    }
  }

});

screen.append(list);
var crud = blessed.box({
  bottom: 0,
  height: '8%',
  mouse: true,
  keyboard: true,
  autoCommandKeys: true,
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
      callback: function () {
        console.log('Create');
      }
    },
    Read: {
      callback: function () {
        console.log('Read');
      }
    },
    Update: {
      callback: function () {
        console.log('Update');
      }
    },
    Destroy: {
      callback: function () {
        console.log('Destroy');
      }
    }
  }
});
screen.append(crud);
// fillListWithCategories();

// If our box is clicked, change the content.
box.on('click', function (data) {
  box.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
  screen.render();
});

// If box is focused, handle `enter`/`return` and give us some more content.
box.key('enter', function (ch, key) {
  box.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
  box.setLine(1, 'bar');
  box.insertLine(1, 'foo');
  screen.render();
});

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function (ch, key) {
  return process.exit(0);
});
// Focus our element.
box.focus();
// Render the screen.
screen.render();
