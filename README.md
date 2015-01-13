### SlideMe

Simple js plugin to roll presentations.
You can use it as a video presentation slider, image presentation, text presentation or just a video player.

all files are availabe through our cdn http://d3gr29hczmiozh.cloudfront.net/

example - http://d3gr29hczmiozh.cloudfront.net/slideme.min.js

## Configuration

As in example.html define

```
 <div data-slidemejs="">
```
Right after that load slideme.js if you wish you can include your own videojs.js file (right before slideme.js).

Then call slideMeJs()

json version

```
slideMeJs(http://d3gr29hczmiozh.cloudfront.net/jsonexample.json);
```

or none json

```
slideMeJs(yourConfig, false);
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
        "link" : "http://d3gr29hczmiozh.cloudfront.net/jsonexample.json",
        "title" : "Reload json",
        "type" : "json"
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


### Playlist

Add id="slideme-playlist" somwhere on your website if u would like to change default position.

#### Load New Player 

add a link to your playlist with type set to json or call

```
slideMe.reload('jsonurl');
```

### Changelog - v0.04 alpha

v0.04

* change slideMeJs to slideMe
* add slideMe.loadAssets() - usage slideMeLoad('url', 'type', function); - type can be css or js
* load css and js from cdn

v0.03

* add mini api
 * slideMe.reload('youJSONurl') load new player
 * slideMe.destroyPlaylist() that will remove playlist


v0.02

* added option to use playlist as a way to update player via json