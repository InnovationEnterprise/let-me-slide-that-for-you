### SlideMe

Simple js plugin to roll presentations.
You can use it as a video presntation slider, image presentation, text presentation or just a video player.

all files are availabe through our cdn http://d3gr29hczmiozh.cloudfront.net/

example - http://d3gr29hczmiozh.cloudfront.net/slideme.min.js

## Configuration

As in example.html define

```
 <div data-slidemejs="">
```
Right after that load slideme.js if you wish you can include your own videojs.js file (right before slideme.js).

Include css files video-js.css and slidemecss.css are mandatory if you would like to have ads add ads/slidemeads.css.

Then call slideMeJs()

json version

```
slideMeJs(http://d3gr29hczmiozh.cloudfront.net/jsonexample.json);
```

or none json

```
slideMeJs(testConfig, false);
```

your json file or config should look like this

```
{
  "autoplay" : "false",
  "preload" : "metadata", 
  "videosources": {
      "video/mp4" : "https://ieondemand.com/merged_videos/AshSharma-FPA-London14.mp4"
  },
  "videoslidestype": "images",
  "playlist" : [
      {
        "link" : "http://theinnovationenterprise.com/",
        "title" : "New Title"
      },
      {
        "link" : "http://theinnovationenterprise.com/",
        "title" : "New Title"
      }
  ],
  "videoslides" : [
      {
        "slidecontent" : "https://s3.amazonaws.com/ieondemand/slides/pdfuploads/000/004/142/original/Tom_Hjelm_DigiPub_NY_201320140411-18475-upage4.pdf000.jpg?1397215078",
        "timemin" : "0",
        "timesec" : "0"
      },
      {
        "slidecontent" : "https://s3.amazonaws.com/ieondemand/slides/pdfuploads/000/004/143/original/Tom_Hjelm_DigiPub_NY_201320140411-18475-upage4.pdf001.jpg?1397215078",
        "timemin" : "1",
        "timesec" : "1"
      },
      {
        "slidecontent" : "https://s3.amazonaws.com/ieondemand/slides/pdfuploads/000/004/144/original/Tom_Hjelm_DigiPub_NY_201320140411-18475-upage4.pdf002.jpg?1397215078",
        "timemin" : "2",
        "timesec" : "2"
      }
  ]
}
```

autoplay - false/true
preload - metadata/none/auto - if doesn't exist will set as metadata
videosources/videosourcesmobile - all accepted by videojs (slideme do not support flashfallabck)
playlist - if exist loads playlist

videoslidestype - images/text
videoslides - if exitst loads images or any html/text from slidecontent
If would like to load only video remove both.


#### Changelog - v0.01 alpha
