## When to use this component

Dismissable alerts are designed to be used when you want to present users with a piece of textual information - usually with an associated interaction ("click here"), without distracting them for the main content of the page. 

This makes them perfect for situations where a timely annoucement is being made. For example:

* Come to our Graduate Expo on 19 January - Register Now. 
* Complete our short survey to win an iPad
* This page will soon be decommissioned. 
* This page is out of date and will soon be decommissioned. 

Dismissable alerts have the added advantage of being ... wait for it... dismissable. This means that once the user has read the alert, and indicated that indicated that they would like to close it, a cookie is set to make sure that the same alert is not presented to the user again. 

As well as their standard use within a local site, there is also provision in the new templates to display dismissable alerts across the entire university site, or to a collection of sub-domains (eg. Graduate Schools) in several circumstances. 

### Emergencies
In the event an emergency, a restricted red and white version of the dismissable alert can be invoked and displayed across the entire site. The purpose of this is to raise general awareness of critical incidents requiring action. Ideally this alert will link to further information

### Campaign activies
Historically, when running a campaign, web maintianers across the university have been required to update their sites to promote a particular campaign (eg. Dream Large, Change of Preference, Graduate Campaign). Notifying people that a campaign activity is taking place (eg. an Expo) is made easier, and less obtrusive through the use of dismissable alerts as it i) makes it more likely that they will be noticed as we avoid banner blindness and ii) allows the user to dismiss non-relevant alerts once they have been read (reducing ongoing noise and distraction in the templates). 

## When to avoid this component? 

This component should not be used to display vital information that must persist across several domains. 

## Content recommendations

## Planning tools 

## Examples

### Good examples

### Poor examples

## References

## Implementation

// TODO: must have the ability to enable these alerts across a whole domain easily. Implementation shoudl discuss adding these to your root templates, as well as to a single page. 
// TODO: Do we need a way to see a list of all the previous alerts issued uni-wide? An alerts history page? 

### Dependencies

### Options

// Todo Do we need to consider offering different styling options in order to allow people to associate a dismissable alert with a campaign (eg. grad campaign blues). Ideally this could be a background colour, link colour, text colour sort of option. 
// Considering this, there is also the need to have a restricted colour scheme for use in emergency situations (eg. Red with white text)...ideally the emergency version of this alert is non-dismissable. 

### Code examples
