## Excel-Builder-Vanilla (forked from `Excel-Builder.js`)

Excel Builder (abbreviated as 'EB' for the sake of typing) is a relatively simple way of creating Office 2007 Excel files in JavaScript (readable by office 2000/XP/2003 if the support pack has been installed).

Starting work on an updated version with more "modern" api's and nodejs support, but this will take time (and therefor money). So, donations are appreciated, and opening up bounties on issues ( bounties received ) will help a lot. So will the couple of advertisements I put on the site.

### Download

```ts
npm install excel-builder-vanilla
```

### Features Supported

Number and date formatting
Font sizes and colors
Borders
Multiple worksheets (with customizable names)
Table views
Setting page layout
Setting page headers and footers
Formula support
Insertion of pictures

### TODO (in order of priority)

Better code documentation, and add actual site documentation
General code cleanup
Should be able to create a custom theme
Tables are done, but Pivot tables need to be done
Charts

### Why on earth would you build an excel file in JavaScript?!?!

Excellent question!

There are a couple of reasons. First, consider that quite often the data one wants in an excel file is the same data that is on the screen. If it's already there, why have the server fetch the same information and then burn through some CPU/IO/RAM time to build an excel file from it, and then serve it back to the user? Seems a bit.. ridiculous doesn't it?

Second, consider that the user may already have all of the transformations they want done to the data on the screen - sorting, columns, colors, etc. This may take a while for the user to do - possibly rendering a caching mechanism useless. Or perhaps timing them out. You already have to collect their preferences in JavaScript - why bother creating a way to send the server those preferences, and then work through applying said preferences?

Third, take a look at what an Office Excel file really is. It's a zip file full of XML files. The zip format is a very standardized format with a library that was written by some brainiac for JavaScript readily available. JavaScript eats XML files for breakfast - browsers already have the native ability to work with XML. With the eclipse of IE6 (and IE7 coming shortly), the JavaScript engines that may show up to grab a copy of that report are becoming increasingly powerful. More and more you should be pushing as much processing as you can onto the client and off of your server.

Heck, if you've been in the development business for more than 5 years, you probably have realized that some of your 'powerful' first webservers are vastly outpaced by today's laptop. I know that my first webserver was slower than my phone is now!

### OK - So how do I "download" a file that the browser creates?

Here's the tricky part. There are a couple different ways of doing this, so pick the one that is least painful.

Use the Downloadify project - this is what I'll be using in my demos
Use the newer browser's API's to create a Blob and save it. Google always helps here..
Chrome has a non-standard attribute called 'download' on anchor tags. Assign a data-uri representing the file you want downloaded to the href and then specify the file name in the 'download' attribute. When the user clicks on the link, it will download the file just like normal.
Create a very simple and inexpensive web service to 'echo' back anything you send it. It still takes the pain away from creating the entire file in the backend with all the data fetching, translations and etc. However it also will work for all browses. You could also look into a simple Google App Engine setup.
Combining some of these approaches seems like a noteworthy goal.. perhaps a script in the future to do so?

### License

MIT
