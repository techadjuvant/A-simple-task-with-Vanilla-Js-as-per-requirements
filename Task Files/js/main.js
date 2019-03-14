	// Only reordarble made with jQuery+jQuery UI
      $( function() {
        $( "#sortable-tabs" ).sortable();
        $( "#sortable-tabs" ).disableSelection();
      } );


      // Highlight the active tab on left pane
        var tabsContainer = document.getElementById("sortable-tabs");
        var sTabs = tabsContainer.getElementsByClassName("single-page-tab");
        for (var i = 0; i < sTabs.length; i++) {
          sTabs[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("activeTab");
            current[0].className = current[0].className.replace(" activeTab", "");
            this.className += " activeTab";
          });
        }


        // Right Pane Active/Hide mode
        function openPage(evt, pageName) {
            var i, pagecontent, tablinks;
            pagecontent = document.getElementsByClassName("right-pan-normal-mode");
            for (i = 0; i < pagecontent.length; i++) {
                pagecontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("nav-tab");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            document.getElementById(pageName).style.display = "block";
            evt.currentTarget.className += " active";
        }

        
        // Delete Tab from left Pane with animation after confirmation
        function deleteTab(check, tabName) {
            var x = document.getElementById(check).checked;
            if( x===true ){
                var result = confirm("Are you sure?");
                if (result) {
                    document.getElementById(tabName).classList.add('removed');
                }
                                      
            }
            
        };


        // Filter box for searching pages
        function filterFunction() {
            var input, filter, ul, li, a, i;
            input = document.getElementById("filterInput");
            filter = input.value.toUpperCase();
            ul = document.getElementById("sortable-tabs");
            li = ul.getElementsByClassName("single-page-tab");
            for (i = 0; i < li.length; i++) {
                a = li[i].getElementsByTagName("p")[0];
                if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }

            // Display Filtered Results Number 
            var divs = Array.prototype.slice.call(document.querySelectorAll('#sortable-tabs .single-page-tab'));
            var results = divs.reduce(function(a, b){return a + (b.style.display != "none" ? 1 : 0)}, 0);
            document.getElementById("noResults").innerHTML =  results;


            // Display Delete button & Results counted of Filter section
            var inputValue = document.getElementById("filterInput").value;
            if( inputValue == ''){
                document.getElementById("deleteFilterImg").classList.add("hideElement");
                document.getElementById("countResult").classList.add("hideElement");
              } else{
                document.getElementById("deleteFilterImg").classList.remove("hideElement");
                document.getElementById("countResult").classList.remove("hideElement");
              }
           

        }

        // Trigger Delete button of Filter section
        function deleteFilter(){
            document.getElementById("filterInput").value = "";
            var event = document.createEvent("Event");
            event.initEvent("input", false, true); 
            document.getElementById("filterInput").dispatchEvent(event);
        }
