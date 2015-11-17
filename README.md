# SlideMe
Build on top of Video.js simple js plugin to roll presentations. You can use it as a video presentation slider, image presentation, text presentation or just a video player.

#### View online
http://slidemejs.com/

## Installation
Add to your HTML

```
<div data-slidemejs="LINK_TO_JSON_FILE"></div>
<script src="//d3gr29hczmiozh.cloudfront.net/0.1.1/slideme.min.js" async></script>
```

### Configuration

You can configure your SlideMe inside your JSON file (all values are strings):

**autoplay** - boolean – default to false

example:
```
  "autoplay" : true
 ```

**preload** - metadata/none/auto  - default metadata

example:
```
  "preload" : "metadata"
 ```

**title** – Your Title

example:

 ```
"title" :  “my title”
 ```

**adTagUrl** – your DFP vast tag (you can also add this as data-adtag to your SlideMe container)

 example:

 ```
"adTagUrl" : "http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/422581008/test_video&ciu_szs&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator=[timestamp]"
 ```

**videosources / videosourcesmobile** – type : src – you can use various video formats but the recommended one is MP4. If you have both it defaults to  videosourcesmobile with added HD button in menu. (if does not exist it will load images only)

example:

 ```
  "videosources": {
     "video/mp4" : "https://ieondemand-videos.s3.amazonaws.com/development/10-2015/sueprtest2015.mp4"
  }
 ```

**videoslidestype** - images/html - if this exists we load images or any html/text from slidecontent If you would like to load only video do not add it. HTML type have to have companion video.

example:

 ```
"videoslidestype": "images"
videoslides – if you use any videslidetype:

example with images:
  "videoslides": [
    {
      "slidecontent" : "https://s3.amazonaws.com/ieondemand/slides/pdfuploads/000/004/162/original/pdftest20151006-51947-iwqj8h.pdf000.jpg?1444153019",
      "timemin" : "0",
      "timesec" : "0"
    }
  ]
 ```

with html content:

 ```
  {
    "slidecontent" : "<div>some text</div>",
    "timemin" : "0",
    "timesec" : "0"
  }
 ```
without times:

 ```
  {
    "slidecontent" : "<div>some text</div>"
  },
 ```

**slideshare** - instead of images or html list you can use it to pass slideshare iframe or any other html.

example:

```
"slideshare": "\u003ciframe src='//www.slideshare.net/slideshow/embed_code/key/fWtwkJWq5dERLK' width='425' height='355' frameborder='0' marginwidth='0' marginheight='0' scrolling='no' style='border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;' allowfullscreen\u003e \u003c/iframe\u003e \u003cdiv style='margin-bottom:5px'\u003e \u003cstrong\u003e \u003ca href='//www.slideshare.net/ThoughtWorks/strategy-to-execution-by-jonny-schneider-thoughtworks' title='Strategy to Execution by Jonny Schneider - ThoughtWorks' target='_blank'\u003eStrategy to Execution by Jonny Schneider - ThoughtWorks\u003c/a\u003e \u003c/strong\u003e from \u003cstrong\u003e\u003ca href='//www.slideshare.net/ThoughtWorks' target='_blank'\u003eThoughtWorks\u003c/a\u003e\u003c/strong\u003e \u003c/div\u003e"
```

**youtube** - boolean - if exist and set to true with videosource as youtube will wrap your video into SlideMe.

```
"videosources": "https://www.youtube.com/watch?v=C0DPdy98e4c",
"youtube": "true"
```

**syncoff** - boolean - if set disable slide synchronisation

```
 {
   "syncoff" : true
 }
```


## Extras

Here are some useful functions

### SlideMe container options


**ad player** - add this to SlideMe container to use it as just video ads player.

 ```
data-inarticle="true"
 ```

**no title/interview mode** - allows to not to add title into top of video

 ```
data-interview="true"
 ```

**wide mode** - set this if instead having 16:9 ratio to use full width of container

 ```
 data-wide="true"
 ```



### Grab title from somewhere else

Just add somewhere on the website

 ```
<div id="slideme-h1"></div>
 ```

### Playlist

Use as in example just do not define type if you want to use it as a URL
.
Add id="slideme-playlist" somewhere on your website if you would like to change default position.

example:

 ```
  "playlist" : [
    {
      "link" : "http://127.0.0.1:8080/example/json.json",
      "title" : "Get new player",
      "type" : "json"
    },
    {
      "link" : "http://theinnovationenterprise.com/",
      "title" : "Go to external url"
    }
  ]
 ```

**subtitles** – you can add subtitles as specified in subtitle iso
example:

 ```
  "subtitles" : [
    {
      "src" : "/subtitle.vtt",
      "srclang" : "pl",
      "label" : "label",
      "default" : true
    }
  ]
 ```

### Load New Player

Add a link to your playlist with type set to JSON or call

 ```
slideMe.reload('jsonurl');
 ```

## Useful Helpers

Remove SlideMe

```
 slideMe.destroy();
```

Display Error

```
 slideMe.destroy('error text', container);
```

Load Assets

```
slideMe.loadAssets("url", "css/script", function(){
  alert('assets loaded');
});
```

## Development
To install all the development dependencies run;

```
npm install
```

To build SlideMe locally run;

```
gulp
```

If you wish its better to change cdn assets to your local. Just change all slideMe.loadAssets.

## Code of Conduct

In order to have an inclusive and welcoming community around the open source code
we produce we have decided to adhere to this [code of conduct](CONDUCT.md).

Please adhere to this code of conduct in any interactions you have in this
community. It is strictly enforced on all official Innovation Enterprise
repositories, websites, and resources. If you encounter someone violating
these terms, please let a maintainer (@xoxoxo) know
and we will address it as soon as possible.

## Changelog - 0.1.1

### 0.1.1

- Fixed lazy loading of slideMe
- Fixed bug with preloader in interview mode.

### 0.1.0

- First Beta Release
