var blessed = require('blessed');

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'Receptek';

// Create a box perfectly centered horizontally and vertically.
var box = blessed.box({
  bottom: 0,
  right: 0,
  width: '65%',
  height: '90%',
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

// Append our box to the screen.
screen.append(box);

let header = blessed.box({
  top: 0,
  left: 0,
  width: '100%',
  height: '10%',
  align: 'center',
  content: 'Receptkezelő 0.1',
  border: {
    type: 'line'
  }

});
screen.append(header);

var list = blessed.listbar({
  bottom: 0,
  left: 0,
  width: '35%',
  height: '90%',
  content: 'valami',
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: 'f0f0f0'
    }
  }

});

screen.append(list);

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
