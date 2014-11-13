---
title: Inpage Navigation
---
<div class="jumpnav"></div>
The inpage Navigation provides a convenient way for the user to see all sections at a glance and jump between them. This can be useful for long, text-heavy pages.

Please note, this feature is only available on larger desktop screen resolutions!

To include this feature on your page, simply add an empty div with class <code>jumpnav</code> somewhere in the page structure.

```html
<div class="jumpnav"></div>
```

Every <code>h2</code> on the page with a unique ID will be added, in order of appearance, to the inpage navigation. The heading text will be used as nav item, eg. "Testjump 1" in the example below

<h2 id="jump1">Testjump 1</h2>
Mercedem aut nummos unde unde extricat, amaras. Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Quam diu etiam furor iste tuus nos eludet? Curabitur blandit tempus ardua ridiculus sed magna. Cras mattis iudicium purus sit amet fermentum.
Mercedem aut nummos unde unde extricat, amaras. Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Quam diu etiam furor iste tuus nos eludet? Curabitur blandit tempus ardua ridiculus sed magna. Cras mattis iudicium purus sit amet fermentum.

Phasellus laoreet lorem vel dolor tempus vehicula. Morbi odio eros, volutpat ut pharetra vitae, lobortis sed nibh. Nihil hic munitissimus habendi senatus locus, nihil horum? Vivamus sagittis lacus vel augue laoreet rutrum faucibus. Cum sociis natoque penatibus et magnis dis parturient.

Plura mihi bona sunt, inclinet, amari petere vellent. Pellentesque habitant morbi tristique senectus et netus. Nihil hic munitissimus habendi senatus locus, nihil horum? Sed haec quis possit intrepidus aestimare tellus.

Tu quoque, Brute, fili mi, nihil timor populi, nihil! Quis aute iure reprehenderit in voluptate velit esse. Petierunt uti sibi concilium totius Galliae in diem certam indicere. Quae vero auctorem tractata ab fiducia dicuntur.

Phasellus laoreet lorem vel dolor tempus vehicula. Tu quoque, Brute, fili mi, nihil timor populi, nihil! Quo usque tandem abutere, Catilina, patientia nostra? Tityre, tu patulae recubans sub tegmine fagi  dolor. Inmensae subtilitatis, obscuris et malesuada fames. Morbi fringilla convallis sapien, id pulvinar odio volutpat.

<h2 id="jump2">Testjump 2</h2>
Mercedem aut nummos unde unde extricat, amaras. Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Quam diu etiam furor iste tuus nos eludet? Curabitur blandit tempus ardua ridiculus sed magna. Cras mattis iudicium purus sit amet fermentum.

Cras mattis iudicium purus sit amet fermentum. Magna pars studiorum, prodita quaerimus. Tityre, tu patulae recubans sub tegmine fagi  dolor. Ab illo tempore, ab est sed immemorabili. A communi observantia non est recedendum.

At nos hinc posthac, sitientis piros Afros. Quam temere in vitiis, legem sancimus haerentia. Cum sociis natoque penatibus et magnis dis parturient. Magna pars studiorum, prodita quaerimus. Idque Caesaris facere voluntate liceret: sese habere. Quam diu etiam furor iste tuus nos eludet?

Plura mihi bona sunt, inclinet, amari petere vellent. Gallia est omnis divisa in partes tres, quarum. Hi omnes lingua, institutis, legibus inter se differunt. Morbi odio eros, volutpat ut pharetra vitae, lobortis sed nibh.

Unam incolunt Belgae, aliam Aquitani, tertiam. Plura mihi bona sunt, inclinet, amari petere vellent. A communi observantia non est recedendum. Me non paenitet nullum festiviorem excogitasse ad hoc. Cum ceteris in veneratione tui montes, nascetur mus.

<h2 id="index">Index Navigation</h2>
A-Z indices can be done via a simple class change:

```html
<div class="indexnav"></div>
```

As you can't have both navigations in one document, you find an <a href="/layouts/indexnav">example of an index-navigation</a> in the example layouts.