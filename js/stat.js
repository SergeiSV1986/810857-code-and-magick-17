var Cloud = {
  x: 100,
  y: 10,
  height: 270,
  width: 420,
  color: '#fff',
};

var CloudShadow = {
  x: 10,
  y: 10,
  color: 'rgba(0, 0, 0, 0.7)',
};

var Bar = {
  height: 150,
  width: 40,
  cap: 50,
};

var BarColumn = {
  height: Bar.height + Bar.cap,
  width: Bar.width + Bar.cap,
};

var Text = {
  color: '#000',
  font: 'bold 16px PT Mono',
  baseline: 'hanging',
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var renderCloudText = function (ctx, text) {
  ctx.fillStyle = Text.color;
  ctx.font = Text.font;
  ctx.textBaseline = Text.baseline;

  text.split('\n').forEach(function (line, i) {
    ctx.fillText(line, Cloud.x + 26, (Cloud.y + 20) + 20 * i);
  });
};

var renderCloud = function (ctx) {
  ctx.shadowColor = CloudShadow.color;
  ctx.shadowOffsetX = CloudShadow.x;
  ctx.shadowOffsetY = CloudShadow.y;
  ctx.shadowBlur = 0;
  ctx.fillStyle = Cloud.color;
  ctx.fillRect(Cloud.x, Cloud.y, Cloud.width, Cloud.height);
  ctx.shadowColor = 'rgba(0, 0, 0, 0)'; // shadow off (!)
  renderCloudText(ctx, 'Ура вы победили!\nСписок результатов:');
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx);

  var maxTime = Math.max.apply(null, times);

  for (var i = 0; i < names.length; i++) {
    var time = Math.floor(times[i]);
    var name = names[i];
    var x = Bar.height + (BarColumn.width * i);
    var height = Math.floor(((Bar.height - 10) * time) / maxTime);
    var padding = BarColumn.height - height;

    ctx.fillStyle = name === 'Вы'
      ? 'rgb(255, 0, 0)'
      : 'rgba(0, 0, 255, 0.' + getRandomNumber(0, 7) + ')';

    ctx.fillRect(x, Bar.width + padding, Bar.width, height);

    ctx.fillStyle = Text.color;
    ctx.fillText(time, x, Cloud.y + padding + 10);
    ctx.fillText(name, x, Cloud.y + Bar.height + 90);
  }
};
