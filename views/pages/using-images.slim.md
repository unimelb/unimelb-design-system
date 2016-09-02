---
title: How to use images in the design system
hidden: true
---

article
  .contrast-helper style="background-image: url(/assets/choose-header-images/header.jpg);"
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
    p.lead Choosing & using images on websites can be quite difficult. This guide makes you aware of things you should consider when choosing imagery.

    p Images can be a great way of helping readers understand what you are trying to communicate. Good imagery informs, captures attention and even persuades visitors. The wrong image, however, can confuse, misguide, annoy or even repel. You may never get the chance to correct the negative impact of the wrong image.

    p Before you look for an image at all though, you should start with the most first important question...

    h2.title Do I need an image at all?

    p Using an image for the sake of using an image is usually a bad idea. There should always be a clear purpose for every element you include as each either supports or detracts from the purpose of the page. If it doesn't need to be there, get rid of it! Sometimes (read: often) you are given an image and told you have to use it. Even in this case - indeed, especially in this case - you should challenge this requirement.

    p Deciding whether you need an image requires being aware of what the user is trying to accomplish on your page. Is the page a guide about how to connect to the wireless network? Or is it an in-depth article about the latest discovery in the field of neuroscience? In these cases, an image will likely be very useful in helping either establish an emotive connection or a more instantaneous understanding of what is being discussed. If, however, the page is a course listing, highly functional contact page or contains entry requirements, you probably don't need an image. By adding one unnecessarily, you are standing between the user and the task they are trying to achieve (eg. find a course or find contact details respectively).

    p There is often a blurry line when choosing to use an image. If you're torn, it is always good to ask yourself if an image would be helpful or not? Lets have a closer look at the purpose of images.

    h2.title What's the purpose of the image?

    p It is useful to distinguish between the two different types of images often used on web pages: the content image and the background image.

    p <strong>Content images</strong> explain, inform or generally adds value to your content. The <strong>background image</strong> on the other hand, sets the scene, complements your content and even changes the mood of the user.

    p So what's the difference between them with regards to how they are displayed in the design system?

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
    p Background images usually have text on top of them and can be cropped according to the device size. This means that not all parts of the image are visible at all times
    ul
      li Complements your content
      li Sets a mood
      li Sets a color scheme
      li Hints what the topic is about (without attempting to show something crucial for the content as they could be covered or cropped)
    p
      a href="#background-images" Read how to use background images


  #content-images.fullwidth.mid-align style="background-image: url(/assets/choose-header-images/science.jpg);"
    section
      h2.title Content images
      p The science of choosing and using content imagery is actually easier than one might think.

  section.with-figure
    p Picking images for content is definitely easier than selecting background images. You don't have to worry about sizes or cropping as they are always shown in full proportion. However here are some guidelines to be aware of:

    hr.spacer

    h2 #1 Add information
    p If an image does not add any information to the page it shouldn't be used in the first place. Still, some images provide more information than others:

    p Imagine you're writing an article about cancer research. Which of these two images provide more information?

    figure.full-width role="group"
      img src="/assets/choose-header-images/ci_01_01.jpg" alt="Laboratory Equipment (fig. 1)"
      figcaption Laboratory Equipment (fig. 1)

    figure.full-width role="group"
      img src="/assets/choose-header-images/ci_01_02.jpg" alt="Electron micrograph (fig. 2)"
      figcaption
        |Electron micrographs like this are used by
        br
        |scientists to compare surface structures
        br
        |of normal cells with cancer cells. (fig. 2)

    p Okay, that was easy. Although the laboratory shows a bit of movement, it is rather generic and could be used in any other article relating to laboratories. The micrograph on the other hand needs a caption to explain what the user is looking at, but adds a lot of value by visualising a topic the reader may have trouble comprehending.

    p
      em Hint: If you can't think of a caption that relates directly to your content, the image might not be a good choice.

    hr.spacer

    h2 #2 Convey the right feeling
    p Look critically at image details to ensure the image communicates the right mood to the audience. Get a second opinion about how an image might affected them.

    p As an experiment, pretend you were given the following three images to complement an article about celebrating 25 years of internet in Australia. Which one would you choose?

    figure.full-width role="group"
      img src="/assets/choose-header-images/ci_03_01.jpg" alt="Data highway (fig. 1)"
      figcaption The data highway (fig. 1)

    figure.full-width role="group"
      img src="/assets/choose-header-images/ci_03_02.jpg" alt="Kids celebrating"
      figcaption Two children celebrating the web (fig. 2)

    figure.full-width role="group"
      img src="/assets/choose-header-images/ci_03_03.jpg" alt="Browsing the web (fig. 3)"
      figcaption Using the web in an everyday situation (fig. 3)

    p This one is tricky. Of course the "data highway" is not appropriate in any way. Yes it's colourful, but it doesn't add anything meaningful. However, the decision between the children and the tablet is a bit harder. The everyday browsing may look adequate at first but there are two arguments not to choose it:
    ol
      li It is a very generic stock photo. We see them all over the internet and we've stopped being emotional about them all together. It nearly feels like an advertisement for a tablet.
      li The visible screen could potentially show unwanted content. This may lead to more work such as montaging a different screen into the tablet.
    p The children on the other hand are celebrating, pointing towards the laptop and there is no screen content visible. Furthermore it is the only image that shows human emotions to which we respond positively. It also compliments a possible headline that contains the word celebration in some form. Therefore photo number 2 would be the recommended photo to use in this case.

    ul.accordion
      li
        span.accordion__title Bonus image (click me)
        .accordion__hidden
          p Or you could scrap all of the above, do some research, and find an actual photo of the terminal connected to the computer that established the first internet connection 25 years ago :-)
          figure.full-width role="group"
            img src="/assets/choose-header-images/ci_03_04.jpg" alt="Old Computer Terminal (fig. 4)"
            figcaption A terminal connected to Australia's first internet-connected computer 25 years ago (fig. 3)

    hr.spacer

    h2 #3 Be consistent
    p If you are going to have many different images close together on a page (for example, using a visual listing component in the design system), it is important that they use consistent colours and photographic style:

    figure.full-width role="group"
      img src="/assets/choose-header-images/ci_02_01.jpg" alt="Multiple nature images with different colours (fig. 1)"
      figcaption Multiple images without colour correction (fig. 1)

    figure.full-width role="group"
      img src="/assets/choose-header-images/ci_02_02.jpg" alt="Multiple nature images with adjusted colours (fig. 2)"
      figcaption The same images after adjustment of colours and contrast (fig. 2)

    p While all images are related to the topic nature, they feel disconnected in the first row. Colour corrections and contrast adjustments bring them closer together and provide a more coherent experience. This requires a bit of photoshop skill, but is worth the effort.

    hr.spacer

    h2 #4 Charts and infographics
    p Charts and infographics are a good way of displaying statistics or illustrating processes. Just be aware that if there is no html-based text (or at least not much of it), the image containing the chart will be displayed on small screens as well and therefore resized. This may make it impossible to read for a large portion of your visitors.

    figure.full-width role="group"
      img src="/assets/choose-header-images/ci_04_01.jpg" alt="Texas Registered Drivers 1980–2004 (fig. 1)"
      figcaption Texas Registered Drivers 1980–2004 (fig. 1)

    p This chart is heavily formatted and therefore hard to figure out. It also contains too much text which will make it difficult or impossible to read on smaller screens.

    hr.spacer

    figure.full-width role="group"
      h3 Texas Registered Drivers 1980–2004
      img src="/assets/choose-header-images/ci_04_02.jpg" alt="Texas Registered Drivers 1980–2004 (fig. 2)"
      figcaption
        |The number of registered drivers in Texas rose from
        br
        |initially 10 million to 17 million drivers between 1980 and 2004 (fig. 2)

    p The same chart works much better as all uneccessary formatting and redundant information has been left out. The header and caption are written in HTML which means they will be accessible to both google and screen readers. Using the caption as a sneaky way to summarise the table also adds value to this piece of information. You can understand what this chart is saying without viewing it.

    hr.spacer

    figure.full-width role="group"
      h3 Texas Registered Drivers 1980–2004
      div#googlechart
      figcaption
        |The number of registered drivers in Texas rose from
        br
        |initially 10 million to 17 million drivers between 1980 and 2004 (fig. 2)

    p Ideally all charts put on our websites would be more like this. This chart is created using Javascript, HTML and SVG graphics. It doesn't use traditional images at all. This requires a bit of coding knowledge, but it can be done and is easily the most preferred version. It is easy to read both because the graphic is created using vectors (and is crisp on any display, including retina displays), but also because detail about the plot can be gained by interacting with the chart. It is also responsive so that it displays well across a range of device sizes. We are aiming to provide these charts in the Design System at some point, however they will require a smart CMS interface.

  #background-images.fullwidth.mid-align style="background-image: url(/assets/choose-header-images/rocket.jpg);"
    section
      h2.title Background images
      p Start with a bang and engage with your readers right from the start

  section.with-figure
    p The right background image can easily boost any message you are trying to convey to your audience. Selecting the right image however can be quite involved. Before you start searching for that perfect image, you’ll need to make a few considerations to ensure you’re picking the best image possible.
    p Here are some of the best practices for choosing your perfect background image.

    hr.spacer

    h2 #1 Don't forget the text
    p A background image almost never appears without text on top. Always make sure that the text is easily readable because it is always more important than the image. If the image contains information that should not be cropped or overlaid by text, then it is a content image and should not be used in this context.

    figure.full-width role="group"
      img src="/assets/choose-header-images/bi_01_01.jpg" alt="Bright background image with text on top (fig. 1)"
      figcaption Bright background image making text too hard to read(fig. 1)

    figure.full-width role="group"
      img src="/assets/choose-header-images/bi_01_02.jpg" alt="Bright background image with dark layer between image and text (fig. 2)"
      figcaption The same image with a black layer between image and text making the text readable (fig. 2)

    figure.full-width role="group"
      img src="/assets/choose-header-images/bi_01_03.jpg" alt="Portrait of Glyn Davis overlaid with text (fig. 3)"
      figcaption Never use portrait photography. (fig. 3)

    figure.full-width role="group"
      img src="/assets/choose-header-images/bi_01_04.jpg" alt="Group of students (fig. 4)"
      figcaption Always remember that images will be cropped according to the current screen size and ratio. (fig. 4)

    hr.spacer

    h2 #2 Reinforce without explaining
    p Choose a background image that will compliment or even help explain your message. Use your background image to reinforce the overall message, not as an attempt to communicate everything all at once. Don’t pick an image that draws more attention than the primary objective (read the content) of the page.

    figure.full-width role="group"
      img src="/assets/choose-header-images/bi_02_01.jpg" alt="Study findings about the universe (fig. 1)"
      figcaption This background image shows actual study findings (fig. 1)

    figure.full-width role="group"
      img src="/assets/choose-header-images/bi_02_02.jpg" alt="Space (fig. 2)"
      figcaption A different image sets the topic as space, universe, etc while not distracting the reader (fig. 2)

    hr.spacer

    h2 #3 Only use gigantically sized images
    p Because of the vast amount of different screen sizes the image has to be highly scalable. From small phone displays to massive 27" Retina screens and everything in between. In a perfect world, you wouldn't have to take care of any further optimisations but we're not there yet. Depending on your CMS or technology, your image may be resized automatically but if you're not sure ask your webmaster if the webserver deals with it or not.
    p Generally we recommend the minimum width of a background image is <strong>2000 pixels</strong>.

    hr.spacer

    h2 #4 Think about the colours
    p Through associations with natural, cultural and artistic uses of colour, we subconsciously relate different colours with particular characteristics. Controlling the use of colour in your background images (which take up a huge chunk of space on the website), is a good way to reinforce your message.

    figure.full-width role="group"
      img src="/assets/choose-header-images/bi_03_01.jpg" alt="Picture of old lab and scientists (fig. 1)"
      figcaption Black and white makes us feel like something is older (fig. 1)

    figure.full-width role="group"
      img src="/assets/choose-header-images/bi_03_02.jpg" alt="Picture of old lab and scientists (fig. 2)"
      figcaption Red filter (fig. 2)

    figure.full-width role="group"
      img src="/assets/choose-header-images/bi_03_03.jpg" alt="Picture of old lab and scientists (fig. 3)"
      figcaption Purple filter (fig. 3)

    figure.full-width role="group"
      img src="/assets/choose-header-images/bi_03_04.jpg" alt="Picture of old lab and scientists (fig. 4)"
      figcaption Blue filter (fig. 4)



    hr.spacer

    h2 #5 Don't get attached
    p Getting too attached to a particular image is never a good idea. Try playing with different angles on a topic to find images that might fit better. You will be surprised how many different images you sometimes find by letting go of the one image you were given or you picked yourself. Sometimes you might go with your first choice, but often you find something that fits even better. Get creative, but not attached!

    hr.spacer

    h2 #6 If you can't find an image, don't use one
    p That is by far the most important rule. Remember the first paragraph of this article?
    blockquote
      .blockquote__text Images can be a great way of helping readers understand what you are trying to communicate
    p And do you remember the third sentence as well?
    blockquote
      .blockquote__text The wrong image, however, can confuse, misguide, annoy or even repel. You may never get the chance to correct the negative impact of the wrong image.
    p This is really important to keep in mind at all times. No image is sometimes better than some random image that does not help your message at all. Not have an image will definitely help your page load faster.


  .fullwidth.mid-align style="background-image: url(/assets/choose-header-images/supplies.jpg);"
    section
      h2.title Image resources
      p Knowing where to find all the good images


  section.with-figure
    p There’s a number of places online where you can find potential images for your page. As with most resources, there are paid and free versions so make sure you choose an appropriate license for your purposes.
    p Make sure all images comply with <a href="http://marketing.unimelb.edu.au/imagebank/guidelines.html">the university image guidelines</a>.
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

hr
section
  p.center
    a.button-hero href="/audio-video-guidelines" Next: Audio & Video guidelines

script src="https://www.google.com/jsapi"
script src="/assets/choose-header-images/images.js"
