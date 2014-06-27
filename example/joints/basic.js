(function(){
  var graph = new joint.dia.Graph();
  var paper = new joint.dia.Paper({
      el: $('#basic-joint'), width: 480, height: 360, model: graph, gridSize: 1,
      defaultLink: new joint.dia.Link({
          attrs: {
              // @TODO: scale(0) fails in Firefox
              '.marker-source': { d: 'M 10 0 L 0 5 L 10 10 z', transform: 'scale(0.001)' },
              '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' }
          }
      })
  });

  var a = new joint.shapes.basic.Rect({ position: { x: 50, y: 50 }, size: { width: 100, height: 40 }, attrs: { text: { text: 'A' } } });
  var b = new joint.shapes.basic.Rect({ position: { x: 250, y: 50 }, size: { width: 100, height: 40 }, attrs: { text: { text: 'B' } } });
  var c = new joint.shapes.basic.Rect({ position: { x: 150, y: 150 }, size: { width: 100, height: 40 }, attrs: { text: { text: 'C' } } });
  var d = new joint.shapes.basic.Rect({ position: { x: 350, y: 150 }, size: { width: 100, height: 40 }, attrs: { text: { text: 'D' } } });
  var e = new joint.shapes.basic.Rect({ position: { x: 250, y: 250 }, size: { width: 100, height: 40 }, attrs: { text: { text: 'E' } } });

  graph.addCells([a, b, c, d, e]);

  var l1 = new joint.dia.Link({
      source: { id: a.id }, target: { id: b.id },
      attrs: {
          // @TODO: scale(0) fails in Firefox
          '.marker-source': { d: 'M 10 0 L 0 5 L 10 10 z', transform: 'scale(0.001)' },
          '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' }
      }
  });

  var l2 = new joint.dia.Link({
      source: { id: b.id }, target: { id: c.id },
      attrs: {
          // @TODO: scale(0) fails in Firefox
          '.marker-source': { d: 'M 10 0 L 0 5 L 10 10 z', transform: 'scale(0.001)' },
          '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' }
      }
  });

  var l3 = new joint.dia.Link({
      source: { id: b.id }, target: { id: d.id },
      attrs: {
          // @TODO: scale(0) fails in Firefox
          '.marker-source': { d: 'M 10 0 L 0 5 L 10 10 z', transform: 'scale(0.001)' },
          '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' }
      }
  });

  var l4 = new joint.dia.Link({
      source: { id: d.id }, target: { id: e.id },
      attrs: {
          // @TODO: scale(0) fails in Firefox
          '.marker-source': { d: 'M 10 0 L 0 5 L 10 10 z', transform: 'scale(0.001)' },
          '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' }
      }
  });

  graph.addCells([l1, l2, l3, l4]);

  // Trigger signaling on element click.
  paper.on('cell:pointerdown', function(cellView) {

      cellView.model.trigger('signal', cellView.model);
  });



  // Signaling.
  // ----------

  graph.on('signal', function(cell, data) {

      if (cell instanceof joint.dia.Link) {

          var targetCell = graph.getCell(cell.get('target').id);
          sendToken(cell, 1, function() {

              targetCell.trigger('signal', targetCell);
          });

      } else {

          flash(cell);
          var outboundLinks = graph.getConnectedLinks(cell, { outbound: true });
          _.each(outboundLinks, function(link) {
              link.trigger('signal', link);
          });
      }
  });

  function flash(cell) {

      var cellView = paper.findViewByModel(cell);
      cellView.highlight();
      _.delay(function() { cellView.unhighlight(); }, 200);
  }

  function sendToken(link, sec, callback) {

      var token = V('circle', { r: 7, fill: 'green' });

      $(paper.viewport).append(token.node);
      token.animateAlongPath({ dur: sec + 's', repeatCount: 1 }, paper.findViewByModel(link).$('.connection')[0]);

      _.delay(function() {
          token.remove();
          callback();
      }, sec * 1000);
  }
})();
