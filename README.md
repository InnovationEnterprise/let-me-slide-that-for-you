## SlideMe
Simple js plugin to roll presentations. You can use it as a video presentation slider, image presentation, text presentation or just a video player.


#### Installation
Add to your html
```
<div data-slidemejs="LINK_TO_JSON_FILE"></div>
<script src="//d3gr29hczmiozh.cloudfront.net/slideme.min.js" async></script>
```

##### Develpoment
install
```
sudo npm install
```
build
```
gulp
```

#### Configuration

You can configure you slideme inside you json file (all values are string):

<b>autoplay</b> – false/true - bolean – if none set to false

example:
```
  "autoplay" : true
 ```
<b>preload</b> - metadata/none/auto  - default metadata
example:
```
  "preload" : "metadata"
 ```
<b>title</b> – just your title
example:
 ```
"title" :  “you title”
 ```
 <b>adTagUrl</b> – your dfp vast tag (you can aslo add this as data-adtag to your slideme container)
 example:
 ```
"adTagUrl" : "http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/422581008/test_video&ciu_szs&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator=[timestamp]"
 ```
example:
 ```
  "videosources": {
     "video/mp4" : "https://ieondemand-videos.s3.amazonaws.com/development/10-2015/sueprtest2015.mp4"
  }
 ```
<b>videosources / videosourcesmobile</b> – type : src – you can use various video formats but recommended one is mp4. If you have both it defualts to  videosourcesmobile with added HD button in menu. (if does not exist it will load images only)
 
example:
 ```
  "videosources": {
     "video/mp4" : "https://ieondemand-videos.s3.amazonaws.com/development/10-2015/sueprtest2015.mp4"
  }
 ```
<b>videoslidestype</b> - images/html - if exitst loads images or any html/text from slidecontent If would like to load only video do not add it. HTML type have to have companion video.

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

 <b>slideshare</b> - instead of images or html list you can use it to pass slideshare iframe or any other html.
 ```
"slideshare": "\u003ciframe src='//www.slideshare.net/slideshow/embed_code/key/fWtwkJWq5dERLK' width='425' height='355' frameborder='0' marginwidth='0' marginheight='0' scrolling='no' style='border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;' allowfullscreen\u003e \u003c/iframe\u003e \u003cdiv style='margin-bottom:5px'\u003e \u003cstrong\u003e \u003ca href='//www.slideshare.net/ThoughtWorks/strategy-to-execution-by-jonny-schneider-thoughtworks' title='Strategy to Execution by Jonny Schneider - ThoughtWorks' target='_blank'\u003eStrategy to Execution by Jonny Schneider - ThoughtWorks\u003c/a\u003e \u003c/strong\u003e from \u003cstrong\u003e\u003ca href='//www.slideshare.net/ThoughtWorks' target='_blank'\u003eThoughtWorks\u003c/a\u003e\u003c/strong\u003e \u003c/div\u003e"
```

 <b>youtube</b> - "true" - if exist and set to true with videosource as youtube will wrap yt wideo into slideme.
```
"videosources": "https://www.youtube.com/watch?v=C0DPdy98e4c",
"youtube": "true"
```

#### Extras

You can find here few usefull options

###### SlideMe container options


<b>ad player</b> - add this to slideme container to use it as just video ads player.
 ```
data-inarticle="true"
 ```

<b>no title/interview mode</b> - allows to not to add title into top of video
 ```
data-interview="true"
 ```

<b>wide mode</b> - set this if instead hainvg 16:9 ratio to use full with of container
 ```
 data-wide="true"
 ```



###### title somwhere else

Just add somwhere on the website
 ```
<div id="slideme-h1"></div>
 ```

###### Playlist

Use as in example just do not define type if you want to use it as a url.
Add id="slideme-playlist" somwhere on your website if u would like to change default position.

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

<b>subtitles</b> – you can add subtitles as specified in subtitle iso 
example:
 ```
  "subtitles" : [
    {
      "src" : "/subtitle.vtt",
      "srclang" : "pl",
      "label" : "label"
    }
  ]
 ```
 
###### Load New Player
add a link to your playlist with type set to json or call
 ```
slideMe.reload('jsonurl');
 ```
 
#### usefull helpers

remove slideme
```
 slideMe.destroy();
```
 
display error
```
 slideMe.destroy('error text', container);
```

load assets
```
slideMe.loadAssets("url", "css/script", function(){
  alert('assets loaded');
});
```

### Changelog - v0.1

##### 0.1

- first beta release 