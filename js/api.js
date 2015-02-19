// slideMe = {


//   destroySlideMe: function() {

//     thisPlayer.dispose();
//     slideMeContainer.remove();
//     slideMe = undefined;

//   },
//   loadAssets: function (assetLink, type, fn) {

//       var getAssets;
//       console.log(type);
//       if (type === 'css') {

//         getAssets = document.createElement('link');
//         getAssets.href = assetLink;
//         getAssets.rel = 'stylesheet';
//         getAssets.type = 'text/css';

//         getHead.appendChild(getAssets);

//       } else {

//         getAssets = document.createElement('script');
//         getAssets.src = assetLink;
//         getAssets.type = 'text/javascript';

//         getHead.appendChild(getAssets);

//         if (fn !== undefined) {

//           getAssets.onload = function() {

//             fn();
            
//           };

//         }

//       }

//     }

// };