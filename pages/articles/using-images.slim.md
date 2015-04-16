---
title: How to use images in the design system
---

article
  .contrast-helper style="background-image: url('/assets/images/choose-header-images/header.jpg')}');"
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
    p.lead Using and choosing images can be quite difficult. This guide helps you through all considerations you have to take into account for choosing the right image.

    p Images can be a good way to help the user understanding what you want to communicate. Good imagery informs, captures attention or even persuades our visitors. The wrong image, however, can confuse, misguide, annoy or even repel the user. You may not even get the chance to correct this negative impact.
    p Selecting the right image can be crucial for the success of a page so you should start with the very first important question of all.

    h2.title Do I need an image at all?
    p Just using an image for the sake of using an image is never helpful. There should always be a clear purpose. Sometimes you are given an image that you have to use, but even in this case you should ask this question.

    p You should always be aware what the user is trying to accomplish on your page. Is it a guide about how to connect to the wireless network or is it an in-depth article about the latest discovery in the field of neuroscience? I am quite certain that images would help the user a lot in these cases. However, if it is a course listing, a contact page or entry requirements you probably don't need an image.
    p It is a blurry line when to use an image, but it is always good to ask yourself if an image would be helpful or not. So lets have a closer look on the purpose of images.

    h2.title What's the purpose of the image?
    p We distinguish between two types of images: The content image and the background image. The content images explains, informs or generally adds value to your content. The background image on the other hand sets the scene, complements your content and could even change the mood of the user.
    p So what's the difference between those two?

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

  .fullwidth style="background-image: url('/assets/images/choose-header-images/science.jpg')}');"
    section
      p.center The science of choosing and using images is actually easier than one might think

  section

    h2#content-images Content images
    p Picking images for content is definitely easier than selecting background images. You don't have to worry about sizes or that some parts might not be seen by the audience as they are always shown in full proportion. However here are some dos and dont'ts for the selection and usage of content images:

    p
      em # 'dos and donts' with examples go here

    h2#background-images Background images
    ul
      li
        em # Readability of text on top
      li
        em # Use your background image to reinforce the overall message, not as an attempt to communicate all at once!
      li
        em # Responsiveness
      li
        em # Colours
      li
        em # Don’t pick an image that draws more attention than the primary objective of the page.
      li
        em # Faces are not necessarily relevant (http://blog.eyequant.com/2014/01/15/the-3-most-surprising-insights-from-a-200-website-eye-tracking-study/)
      li
        em # Think of more options than only the obvious. Get creative but don't get too attached to one image.



    h2.title Image resources
    p
      em # A list of resources

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