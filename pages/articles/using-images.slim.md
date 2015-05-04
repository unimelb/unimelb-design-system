---
title: How to use images in the design system
---

article
  .contrast-helper style="background-image: url(/assets/images/choose-header-images/header.jpg);"
    .stage#particles
    header.banner.blurred
      .mid-align
        h1 Hey, that looks nice!
        p Using images in the Design System
        p.author
          |By
          '
          strong Andi Weis

  section
    p.lead Choosing & using images on websites can be quite difficult. This guide helps to make you aware of various things you should consider to help you choose the right image.

    p Images can be a good way to help the user understand what you are trying to communicate. Good imagery informs, captures attention and even persuades our visitors. The wrong image, however, can confuse, misguide, annoy or even repel. You may never get the chance to correct this negative impact.

    p Before you look to find an image at all thought, you should start with the most first important question...

    h2.title Do I need an image at all?

    p Using an image for the sake of using an image is never helpful. There should always be a clear purpose for every element you include on your page as every element you add either supports or detracts from it's purpose. If it doesn't need to be there, get rid of it. Sometimes (read often) you are given an image that you are told you have to use, but even in this case (and often especially in this case) you should ask this of the person demanding the image.

    p Answering this questions requires being aware of what the user is trying to accomplish on your page. Is it a guide about how to connect to the wireless network, or is it an in-depth article about the latest discovery in the field of neuroscience? In these cases, an image will likely be very useful in either establishing an emotive connection or a more instantateous understanding of what is being discussed. If, however, the page is a course listing or highly functional contact page or entry requirements you probably don't need an image and stand between the user and the task they are trying to achieve (eg. find a course or find contact details respectively).

    p There is often a blurry line when choosing to use an image, but it is always good to ask yourself if an image would be helpful or not? Lets have a closer look at the purpose of images.

    h2.title What's the purpose of the image?

    p It is useful to distinguish between two different types of images often used on web pages: the content image and the background image. 

    p The <strong>content images</strong> explains, informs or generally adds value to your content. The <strong>background image</strong> on the other hand, sets the scene, complements your content and even changes the mood of the user.
    
    p So what's the difference between those two with regards to how they are displayed in the design system?

    h3 Content images
    p Content images are displayed within the text flow, can have captions and are never cropped or masked with text
    ul
      li Explains content in a better way than text (infographics, etc...)
      li Displays what the text is talking about (pictures, items, etc...)
      li Shows a person
      li Offers additional information
    p
      a href="#content-images" Read how to pick content images

    h3 Background images
    p Background images mostly have text on top and can be cropped according to the device sice, which means not all parts of the image is visible at all times
    ul
      li Complements your content
      li Sets a mood
      li Sets a color scheme
      li Hints what the topic is about (without showing something crucial for the content)
    p
      a href="#background-images" Read how to use background images

  .fullwidth.mid-align style="background-image: url(/assets/images/choose-header-images/science.jpg);"
    section
      h2.title#content-images Content images
      p The science of choosing and using content images is actually easier than one might think

  section.with-figure
    p Picking images for content is definitely easier than selecting background images. You don't have to worry about sizes or cropped parts as they are always shown in full proportion. However here are some guidelines for the selection and usage of content images:

    hr.spacer

    h2 #1 Add information
    p If an image does not add any information to the page it shouldn't be used in the first place. Still, some images provide more information than others:

    p Imagine you're writing an article about cancer research. Which of these two images provide more information?

    figure.full-width role="group"
      img src="/assets/images/choose-header-images/ci_01_01.jpg" alt="Laboratory Equipment (fig. 1)"
      figcaption Laboratory Equipment (fig. 1)

    figure.full-width role="group"
      img src="/assets/images/choose-header-images/ci_01_02.jpg" alt="Electron micrograph (fig. 2)"
      figcaption
        |Electron micrographs like this are used by
        br
        |scientists to compare surface structures
        br
        |of normal cells with cancer cells. (fig. 2)

    p Okay, that was easy. Although the laboratory shows a bit of movement, it is rather generic and could be used in any other article relating to laboratories. The micrograph on the other hand needs a caption to explain what the user is looking at, but adds a lot of value by visualising the rather abstract topic.

    p
      em Hint: If you can't think of a caption that relates directly to your content, the image might not be the right choice.

    hr.spacer

    h2 #2 Convey the right feeling
    p Look critically at image details to ensure the images communicates the right mood to the audience. Get others' opinions on how they are affected by an images.

    p You were given the following three images to complement an article about celebrating 25 years of internet in Australia. Which one would you choose?

    figure.full-width role="group"
      img src="/assets/images/choose-header-images/ci_03_01.jpg" alt="Data highway (fig. 1)"
      figcaption The data highway (fig. 1)

    figure.full-width role="group"
      img src="/assets/images/choose-header-images/ci_03_02.jpg" alt="Kids celebrating"
      figcaption Two children celebrating the web (fig. 2)

    figure.full-width role="group"
      img src="/assets/images/choose-header-images/ci_03_03.jpg" alt="Browsing the web (fig. 3)"
      figcaption Using the web in an everyday situation (fig. 3)

    p This one is tricky. Of course the "data highway" is not appropriate in any way. However, the decision between the children and the tablet is a bit harder. The everyday browsing may look adequate at first but there are two arguments not to choose it:
    ol
      li It is a very generic stock photo. We see them all over the internet and we've stopped being emotional about them all together. They are nearly depicted as advertisment.
      li The visible screen could potentionally show unwanted content. This may lead to more work, e.g., montaging a different screen into the tablet.
    p The children on the other hand are celebrating, pointing towards the laptop and there is no screen content visible. Furthermore it is the only image that shows human emotions to which we respond positively. It also complements a possible headline that contains the word celebration in some form. Therefore photo number 2 would be the recommended photo to use in this case.

    ul.accordion
      li
        span.accordion__title Bonus image (click me)
        .accordion__hidden
          p Or you scrap all of the above, do some research and just use the actual photo of a terminal connected to the computer that established the first internet connection 25 years ago :-)
          figure.full-width role="group"
            img src="/assets/images/choose-header-images/ci_03_04.jpg" alt="Terminal connected to the internet (fig. 4)"
            figcaption Terminal connected to the internet (fig. 3)

    hr.spacer

    h2 #3 Be consistent
    p Multiple images that are located closely to each other should use consistent colours and style of photography:

    figure.full-width role="group"
      img src="/assets/images/choose-header-images/ci_02_01.jpg" alt="Multiple nature images with different colours (fig. 1)"
      figcaption Multiple images without colour correction (fig. 1)

    figure.full-width role="group"
      img src="/assets/images/choose-header-images/ci_02_02.jpg" alt="Multiple nature images with adjusted colours (fig. 2)"
      figcaption The same images after adjustment of colours and contrast (fig. 2)

    p While all images are related to the topic nature, they feel disconnected in the first row. Colour corrections and contrast adjustments bring them closer together and provide a more coherent experience.

    hr.spacer

    h2 #4 Charts and infographics
    p Charts and infographics are a good way to display statistics or illustrate processes. Just be aware that there is no text (or at least not much) on the image as it will be displayed on small screens as well and therefore resized.

    figure.full-width role="group"
      img src="/assets/images/choose-header-images/ci_04_01.jpg" alt="Texas Registered Drivers 1980–2004 (fig. 1)"
      figcaption Texas Registered Drivers 1980–2004 (fig. 1)

    p This chart is heavily formatted and therefore hard to figure out. It also contains too much text which will not be readable on smaller screens.

    hr.spacer

    figure.full-width role="group"
      h3 Texas Registered Drivers 1980–2004
      img src="/assets/images/choose-header-images/ci_04_02.jpg" alt="Texas Registered Drivers 1980–2004 (fig. 2)"
      figcaption
        |The number of registered drivers in Texas rose from
        br
        |initially 10 million to 17 million drivers between 1980 and 2004 (fig. 2)

    p The same chart works much better when all unneccessary formatting and redundant information is left out. The header and caption are written in HTML and through that are exposed to google and screenreaders. Using the caption to summarize the table also adds value to this piece of information

    hr.spacer

    figure.full-width role="group"
      h3 Texas Registered Drivers 1980–2004
      div#googlechart
      figcaption
        |The number of registered drivers in Texas rose from
        br
        |initially 10 million to 17 million drivers between 1980 and 2004 (fig. 2)

    p Okay, this interactive chart is a bit of a show off. But it can be done and would be the most prefered version (readability and responsiveness). We aim to provide these charts in the Design System at one point.

  .fullwidth.mid-align style="background-image: url(/assets/images/choose-header-images/rocket.jpg);"
    section
      h2#background-images.title Background images
      p Start with a bang and engage with your readers right from the start

  section.with-figure
    p The right background image can easily boost any message you try to convey to your audience. Selecting the right image however can be quite painful. Before you get down to searching for that perfect image, you’ll need to make a few considerations to ensure you’re picking the best image possible. Here are some of the best practices for choosing your perfect background image.

    hr.spacer

    h2 #1 Don't forget the text
    p A background image never appears without text on top. Always make sure that the text is easily readable because it is always more important than the image. If the image contains information that should not be cut off or overlayed by text it is a content image and should not be used as background.

    figure.full-width role="group"
      img src="/assets/images/choose-header-images/bi_01_01.jpg" alt="Bright background image with text on top (fig. 1)"
      figcaption Bright background image (fig. 1)

    figure.full-width role="group"
      img src="/assets/images/choose-header-images/bi_01_02.jpg" alt="Bright background image with dark layer between image and text (fig. 2)"
      figcaption The same image with a black layer between image and text (fig. 2)

    figure.full-width role="group"
      img src="/assets/images/choose-header-images/bi_01_03.jpg" alt="Portrait of Glyn Davis overlayed with text (fig. 3)"
      figcaption Never use portrait photography. (fig. 3)

    figure.full-width role="group"
      img src="/assets/images/choose-header-images/bi_01_04.jpg" alt="Group of students (fig. 4)"
      figcaption Always remember that images might get cropped according to the current screen size and ratio. (fig. 4)

    hr.spacer

    h2 #2 Reinforce without explaining
    p Choose a background image that can complement or even help explain your message without taking away from the main purpose. Use your background image to reinforce the overall message, not as an attempt to communicate all at once. Don’t pick an image that draws more attention than the primary objective (read the content) of the page.

    figure.full-width role="group"
      img src="/assets/images/choose-header-images/bi_02_01.jpg" alt="Study findings about the universe (fig. 1)"
      figcaption This background image shows actual study findings (fig. 1)

    figure.full-width role="group"
      img src="/assets/images/choose-header-images/bi_02_02.jpg" alt="Space (fig. 2)"
      figcaption A different image sets the topic as space, universe, etc while not distracting the reader (fig. 2)

    hr.spacer

    h2 #3 Only use gigantically sized images
    p Because of the vast amount of different screen sizes the image has to be highly scalable. From small phone displays to massive Retina screens and everything in between. In a perfect world, you don't have to take care of any further optimisations. However, if you are not sure ask your webmaster if the webserver deals with it or not.
    p Generally we recommend the minimum width of a background image to be <strong>2000 Pixel</strong>

    hr.spacer

    h2 #4 Think about the colours
    p Through associations with natural, cultural and artistic uses of colour, we subconsciously relate different colours with a subtext of characteristics. Controlling the use of colour in your background images (which take up a huge chunk of space on the website), is a good way to reinforce your message.

    figure.full-width role="group"
      img src="/assets/images/choose-header-images/bi_03_01.jpg" alt="Picture of old lab and scientists (fig. 1)"
      figcaption Black and white (fig. 1)

    figure.full-width role="group"
      img src="/assets/images/choose-header-images/bi_03_02.jpg" alt="Picture of old lab and scientists (fig. 2)"
      figcaption Red filter (fig. 2)

    figure.full-width role="group"
      img src="/assets/images/choose-header-images/bi_03_03.jpg" alt="Picture of old lab and scientists (fig. 3)"
      figcaption Purple filter (fig. 3)

    figure.full-width role="group"
      img src="/assets/images/choose-header-images/bi_03_04.jpg" alt="Picture of old lab and scientists (fig. 4)"
      figcaption Blue filter (fig. 4)

    

    hr.spacer

    h2 #5 Don't get attached
    p Getting too attached to a particular image is never a good idea. Try to play with different angles on a topic to find images that might fit better. You will be surprised how many different images you sometimes find by letting go the one image you were given or you picked yourself. Sometimes you might go with the first choice you've made, but often you find something that fits even better. Get creative, but not attached!

    hr.spacer

    h2 #6 If you can't find an image, don't use one
    p That is by far the most important rule. Remember the first paragraph of this article?
    blockquote Images can be a good way to help the user understand what you are trying to communicate
    p And do you remember the third sentence as well?
    blockquote The wrong image, however, can confuse, misguide, annoy or even repel. You may never get the chance to correct this negative impact.
    p This is really important to keep in mind at all times. No image is sometimes better than some random image that does not help your message at all.

    
  .fullwidth.mid-align style="background-image: url(/assets/images/choose-header-images/supplies.jpg);"
    section
      h2.title Image resources
      p Knowing the supply chain, or where to find all the good images


  section.with-figure
    p There’s a number of places online where you can find potential images for your page. As with most resources, there are paid and free versions.

    hr.spacer

    h2 Free images
    p Make sure these images are really free to use by always checking their individual license.

    ul
      li
        a href="http://images.marketing.unimelb.edu.au/images/" University of Melbourne Imagebank
      li
        a href="http://allthefreestock.com/" AllTheFreeStock.com
      li
        a href="http://littlevisuals.co/" Little Visuals
      li
        a href="https://unsplash.com/" Unsplash
      li
        a href="http://deathtothestockphoto.com/" Death to the Stock Photo
      li
        a href="http://nos.twnsnd.co/" New Old Stock
      li
        a href="http://picjumbo.com/" Picjumbo
      li
        a href="http://thepatternlibrary.com/" The Pattern Library
      li
        a href="http://www.gratisography.com/" Gratisography
      li
        a href="http://getrefe.tumblr.com/" Getrefe
      li
        a href="http://www.imcreator.com/free" IMCreator

    h2 Stock photography
    ul
      li
        a href="https://www.dollarphotoclub.com/" Dollar Photo Club
      li
        a href="http://www.shutterstock.com/" Shutterstock
      li
        a href="http://www.istockphoto.com/" iStockphoto
      li
        a href="http://us.fotolia.com/" Fotolia
      li
        a href="http://www.gettyimages.co.uk/" Getty Images



script src="https://www.google.com/jsapi"

javascript:
  /*!
   * Particleground
   *
   * @author Jonathan Nicol - @mrjnicol
   * @version 1.1.0
   * @description Creates a canvas based particle system background
   *
   * Inspired by http://requestlab.fr/ and http://disruptivebydesign.com/
   */
  !function(a,b){"use strict";function c(a){a=a||{};for(var b=1;b<arguments.length;b++){var c=arguments[b];if(c)for(var d in c)c.hasOwnProperty(d)&&("object"==typeof c[d]?deepExtend(a[d],c[d]):a[d]=c[d])}return a}function d(d,g){function h(){if(y){r=b.createElement("canvas"),r.className="pg-canvas",r.style.display="block",d.insertBefore(r,d.firstChild),s=r.getContext("2d"),i();for(var c=Math.round(r.width*r.height/g.density),e=0;c>e;e++){var f=new n;f.setStackPos(e),z.push(f)}a.addEventListener("resize",function(){k()},!1),b.addEventListener("mousemove",function(a){A=a.pageX,B=a.pageY},!1),D&&!C&&a.addEventListener("deviceorientation",function(){F=Math.min(Math.max(-event.beta,-30),30),E=Math.min(Math.max(-event.gamma,-30),30)},!0),j(),q("onInit")}}function i(){r.width=d.offsetWidth,r.height=d.offsetHeight,s.fillStyle=g.dotColor,s.strokeStyle=g.lineColor,s.lineWidth=g.lineWidth}function j(){if(y){u=a.innerWidth,v=a.innerHeight,s.clearRect(0,0,r.width,r.height);for(var b=0;b<z.length;b++)z[b].updatePosition();for(var b=0;b<z.length;b++)z[b].draw();G||(t=requestAnimationFrame(j))}}function k(){i();for(var a=d.offsetWidth,b=d.offsetHeight,c=z.length-1;c>=0;c--)(z[c].position.x>a||z[c].position.y>b)&&z.splice(c,1);var e=Math.round(r.width*r.height/g.density);if(e>z.length)for(;e>z.length;){var f=new n;z.push(f)}else e<z.length&&z.splice(e);for(c=z.length-1;c>=0;c--)z[c].setStackPos(c)}function l(){G=!0}function m(){G=!1,j()}function n(){switch(this.stackPos,this.active=!0,this.layer=Math.ceil(3*Math.random()),this.parallaxOffsetX=0,this.parallaxOffsetY=0,this.position={x:Math.ceil(Math.random()*r.width),y:Math.ceil(Math.random()*r.height)},this.speed={},g.directionX){case"left":this.speed.x=+(-g.maxSpeedX+Math.random()*g.maxSpeedX-g.minSpeedX).toFixed(2);break;case"right":this.speed.x=+(Math.random()*g.maxSpeedX+g.minSpeedX).toFixed(2);break;default:this.speed.x=+(-g.maxSpeedX/2+Math.random()*g.maxSpeedX).toFixed(2),this.speed.x+=this.speed.x>0?g.minSpeedX:-g.minSpeedX}switch(g.directionY){case"up":this.speed.y=+(-g.maxSpeedY+Math.random()*g.maxSpeedY-g.minSpeedY).toFixed(2);break;case"down":this.speed.y=+(Math.random()*g.maxSpeedY+g.minSpeedY).toFixed(2);break;default:this.speed.y=+(-g.maxSpeedY/2+Math.random()*g.maxSpeedY).toFixed(2),this.speed.x+=this.speed.y>0?g.minSpeedY:-g.minSpeedY}}function o(a,b){return b?void(g[a]=b):g[a]}function p(){console.log("destroy"),r.parentNode.removeChild(r),q("onDestroy"),f&&f(d).removeData("plugin_"+e)}function q(a){void 0!==g[a]&&g[a].call(d)}var r,s,t,u,v,w,x,y=!!b.createElement("canvas").getContext,z=[],A=0,B=0,C=!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i),D=!!a.DeviceOrientationEvent,E=0,F=0,G=!1;return g=c({},a[e].defaults,g),n.prototype.draw=function(){s.beginPath(),s.arc(this.position.x+this.parallaxOffsetX,this.position.y+this.parallaxOffsetY,g.particleRadius/2,0,2*Math.PI,!0),s.closePath(),s.fill(),s.beginPath();for(var a=z.length-1;a>this.stackPos;a--){var b=z[a],c=this.position.x-b.position.x,d=this.position.y-b.position.y,e=Math.sqrt(c*c+d*d).toFixed(2);e<g.proximity&&(s.moveTo(this.position.x+this.parallaxOffsetX,this.position.y+this.parallaxOffsetY),g.curvedLines?s.quadraticCurveTo(Math.max(b.position.x,b.position.x),Math.min(b.position.y,b.position.y),b.position.x+b.parallaxOffsetX,b.position.y+b.parallaxOffsetY):s.lineTo(b.position.x+b.parallaxOffsetX,b.position.y+b.parallaxOffsetY))}s.stroke(),s.closePath()},n.prototype.updatePosition=function(){if(g.parallax){if(D&&!C){var a=(u-0)/60;w=(E- -30)*a+0;var b=(v-0)/60;x=(F- -30)*b+0}else w=A,x=B;this.parallaxTargX=(w-u/2)/(g.parallaxMultiplier*this.layer),this.parallaxOffsetX+=(this.parallaxTargX-this.parallaxOffsetX)/10,this.parallaxTargY=(x-v/2)/(g.parallaxMultiplier*this.layer),this.parallaxOffsetY+=(this.parallaxTargY-this.parallaxOffsetY)/10}var c=d.offsetWidth,e=d.offsetHeight;switch(g.directionX){case"left":this.position.x+this.speed.x+this.parallaxOffsetX<0&&(this.position.x=c-this.parallaxOffsetX);break;case"right":this.position.x+this.speed.x+this.parallaxOffsetX>c&&(this.position.x=0-this.parallaxOffsetX);break;default:(this.position.x+this.speed.x+this.parallaxOffsetX>c||this.position.x+this.speed.x+this.parallaxOffsetX<0)&&(this.speed.x=-this.speed.x)}switch(g.directionY){case"up":this.position.y+this.speed.y+this.parallaxOffsetY<0&&(this.position.y=e-this.parallaxOffsetY);break;case"down":this.position.y+this.speed.y+this.parallaxOffsetY>e&&(this.position.y=0-this.parallaxOffsetY);break;default:(this.position.y+this.speed.y+this.parallaxOffsetY>e||this.position.y+this.speed.y+this.parallaxOffsetY<0)&&(this.speed.y=-this.speed.y)}this.position.x+=this.speed.x,this.position.y+=this.speed.y},n.prototype.setStackPos=function(a){this.stackPos=a},h(),{option:o,destroy:p,start:m,pause:l}}var e="particleground",f=a.jQuery;a[e]=function(a,b){return new d(a,b)},a[e].defaults={minSpeedX:.1,maxSpeedX:.7,minSpeedY:.1,maxSpeedY:.7,directionX:"center",directionY:"center",density:1e4,dotColor:"#666666",lineColor:"#666666",particleRadius:7,lineWidth:1,curvedLines:!1,proximity:100,parallax:!0,parallaxMultiplier:5,onInit:function(){},onDestroy:function(){}},f&&(f.fn[e]=function(a){if("string"==typeof arguments[0]){var b,c=arguments[0],g=Array.prototype.slice.call(arguments,1);return this.each(function(){f.data(this,"plugin_"+e)&&"function"==typeof f.data(this,"plugin_"+e)[c]&&(b=f.data(this,"plugin_"+e)[c].apply(this,g))}),void 0!==b?b:this}return"object"!=typeof a&&a?void 0:this.each(function(){f.data(this,"plugin_"+e)||f.data(this,"plugin_"+e,new d(this,a))})})}(window,document),/**
   * requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
   * @see: http://paulirish.com/2011/requestanimationframe-for-smart-animating/
   * @see: http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
   * @license: MIT license
   */
  function(){for(var a=0,b=["ms","moz","webkit","o"],c=0;c<b.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(b){var c=(new Date).getTime(),d=Math.max(0,16-(c-a)),e=window.setTimeout(function(){b(c+d)},d);return a=c+d,e}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)})}();

  particleground(document.getElementById('particles'), {
      dotColor: 'rgba(255, 255, 255, 0.4)',
      lineColor: 'rgba(255, 255, 255, 0.4)',
      maxSpeedX: 0.2,
      maxSpeedY: 0.2,
      parallax: true,
      density: 7000
  });



  google.load('visualization', '1', {'packages':['corechart', 'line']});
  google.setOnLoadCallback(drawChart);


  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Registered Drivers', '1980–2004'],
      ['1980', 10475000],
      ['1985', 12444000],
      ['1990', 12800000],
      ['1995', 13682000],
      ['2000', 14070000],
      ['2003', 14888000],
      ['2004', 16906000]
    ]);

    var options = {
      chart: {
        title: 'Texas Registered Drivers 1980–2004',
        subtitle: ''
      },
      pointSize: 10,
      hAxis: {
        title: '',
        minValue: 0
      },
      vAxis: {
        title: '',
        format: 'short'
      },
      height: 400
    };
    var material = new google.visualization.LineChart(document.getElementById('googlechart'));
    material.draw(data, options);
  }