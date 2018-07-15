const bodyWidth = $(window).width();
const bodyHeight = $(window).height();
const blue = 'https://image.ibb.co/gGEeCJ/bluebubble.png';
const pink = 'https://image.ibb.co/dUx5md/pinkbubble.png';
const rando = (min, max) => {
  return Math.floor(Math.random() * max) + min;
};

const time = (initx,finalx,inity,finaly) => {
  return Math.sqrt(Math.abs(Math.pow(initx-finalx, 2)) + Math.abs(Math.pow(inity-finaly, 2)));
};

//console.log (time(2,5,3,6));

function Bubble(color) {
    this.color = color;
    this.posx = rando(1, bodyWidth-50);
    this.posy = rando(1, bodyHeight-50);
    this.image = "<img class='bubble'>";
};

const animate = (element) => {
  let newSize = rando(30, 50);
  $(element).animate({height: newSize, width: newSize}, 1000)
  .promise()
  .then((posX, posY, newX, newY, duration) => {
    for(let i = 0; i<=6; i++) {
      posX = $(element).position().left;
      posY = $(element).position().top;
      newX = rando(1, bodyWidth-50);
      newY = rando(1, bodyHeight-50);
      duration = time(posX, newX, posY, newY);
      console.log(duration);
      $(element).animate({left: newX, top: newY}, 6000, function() {
        if (i === 6){
          $(element).remove();
        }
      }); 
    }
  });
}

const makeBubble = (colour) => {
  var newBlue = new Bubble(colour);
  var soapy = $.parseHTML(newBlue.image);
  $("body").append(soapy);
  $(soapy).attr("src", newBlue.color);
  $(soapy).css({"top": newBlue.posy, "left": newBlue.posx, "height": "10px", "width": "10px"});
  animate(soapy);
}

const bubbles = () => {
  for (let i = 0; i <= 15; ++i) {
    setTimeout(function(){
       makeBubble(blue);
    }, 500*i);
  };
  
  for (let i = 1; i <= 10; ++i) {
    setTimeout(function(){
       makeBubble(pink);
    }, 600*i);
  };
}

$("#logo").click(function() {
  bubbles();
});


$(document).on('click', '.bubble', function() {
  $(this).remove();
});

bubbles();
