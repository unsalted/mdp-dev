/*jshint multistr: true */
$(document).ready(function() {
var jsonData;

    $('.minute').hover(function() {
        $(this).addClass('active');
    }, function() {
        $(this).removeClass('active');
    });



    function getExif(){
        $.getJSON('./assets/json/index.json', function(data) {
            //createResponse(data);
            sortResults('FileModifyDate', true, data);
            //console.log(data[0].SourceFile);
                appendLoop(jsonData);
        });
    }

    function sortResults(prop, asc, d) {
        jsonData = d.sort(function(a, b) {
            if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        });
    }

    function stack(){
        $('.hour > .minute').each(function() {
            var $card = $(this)
            var i = $card.index();
            $card.css({
                "z-index" : i+1,
                "margin-left": (i)*16
            });
        });
    }

    function appendLoop(data){
        for (var i = data.length - 1; i >= 0; i--) {
            var file = data[i].FileName;
            var type = file.substring(0,4).toLowerCase();
            var hour = file.substring(9,15);
            var min = file.substring(15,17);
            var $hourDiv = $('#'+hour+'-'+type);
            var src= './assets/images/'+type+'/'+file;

            $hourDiv.find('.'+min).append('<img class="'+file+'" src="./assets/images/web/blank.gif" data-src="'+src+'">');
        }
        stack();
        $("img").unveil();
    }


  /*  function appendLoop(data){
        var previousFace = data[0].FileName;
        var previousDesk = data[0].FileName;
        for (var i = data.length - 1; i >= 0; i--) {
            var file = data[i].FileName;
            var type = data[i].FileName.substring(0,4).toLowerCase();
            if (type === 'face'){
                imgSort(file, type, previousDesk);
                previousFace = file;
            } else {
                imgSort(file, type, previousFace);
                previousFace = file;
            }
        }; 
    }



    function imgSort(img, type, previous){
        var src;
        var datetime = img.substring(9,15);    //get hour segment of filename
        var elename = '#'+datetime+'-'+type;
        var $ele = $(elename);
        var curr = img.substring(15, 17);
        var prev = previous.substring(15, 17);
        if (type === 'desk'){
            src = "assets/images/desk/";
        } else {
            src = "assets/images/face/";
        }

        console.log(curr);
        console.log(prev);


        if (curr-1 == prev){
            console.log('normal');
            return $ele.append('<img class="'+type+datetime+'" src="./'+ src + img +'">');
        } else if (curr == 59 && prev == 00) {
            console.log('singulrity');
            return $ele.append('<img class="'+type+datetime+'" src="./'+ src + img +'">');
        } else {
            for (var i = prev-curr; i >= 0; i--) {
                return $ele.append('\
                    <div class="blank '+curr+'">\
                        '+curr+'\
                    </div>\
                ');
            }
            console.log('gap');
            return $ele.append('<img class="'+type+datetime+'" src="./'+ src + img +'">');  
        }

    }

*/
    getExif();

});
   