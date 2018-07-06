
function searchwiki() {
        var input = document.getElementById("wikisearch").value;
        wikisearch(input);
    }
    
    
    function wikisearch(input) {
      $.getJSON('https://en.wikipedia.org/w/api.php?action=query&generator=search&utf8=1&prop=extracts&exintro=1&exlimit=20&exchars=200&format=json&origin=*&gsrsearch=intitle:' + input, function(data) { //Search success function
        displaysearch(data);
      })
    }

    function displaysearch(data) {
    document.getElementById("results").innerHTML = "";
        for (i=0;i<10;i++) {
                if (data.query.pages[Object.keys(data.query.pages)[i]].extract !== undefined) {
                document.getElementById("results").innerHTML += '<div class="card infodisplay">' + data.query.pages[Object.keys(data.query.pages)[i]].extract + '<a href="https://en.wikipedia.org/?curid=' + data.query.pages[Object.keys(data.query.pages)[i]].pageid + '">Read more</a></div>'
            }  
        }
    }
     
    
    $("#applysearch").click(function() {
      searchwiki();
    });
    
    function getrandomarticle() {
      $.getJSON(
        "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=extracts&exintro=&explaintext=content&grnlimit=1&origin=*",
        function(data) {
          if (data.query.pages[Object.keys(data.query.pages)[0]].extract == "") { //If there is no summary
            document.getElementById("results").innerHTML = '<div class="card infodisplay">No content summary </div>';
          } else {
            document.getElementById("results").innerHTML = '<div class="card infodisplay">' + 
              data.query.pages[Object.keys(data.query.pages)[0]].extract + '<a href="http://en.wikipedia.org/?curid="' + Object.keys(data.query.pages)[0] + '"> Read more</a></div>';
          }
        }
      );
    }
    
    $("#getrnd").click(function() {
      getrandomarticle();
    });
    