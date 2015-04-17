$(function ($) {
    wookmark = undefined;
    page = 1;
    isLoading = false;
    apiURL = '/page';
    lastRequestTimestamp = 0;
    fadeInDelay = 2000;
    container = '#container';
    $container = $(container);
    $loaderCircle = $('#loaderCircle');
    $window = $(window);
    $document = $(document);
    options = {
        resizeDelay: 50,
        itemWidth: 250,
        offset: 15
    };
    /**
     * When scrolled all the way to the bottom, add more tiles.
     */
    function onScroll(event) {
        // Only check when we're not still waiting for data.
        if (!isLoading) {
            // Check if we're within 100 pixels of the bottom edge of the broser window.
            var closeToBottom = ($window.scrollTop() + $window.height() > $document.height() - 100);
            if (closeToBottom) {
                // Only allow requests every second
                var currentTime = new Date().getTime();
                if (lastRequestTimestamp < currentTime - 1000) {
                    lastRequestTimestamp = currentTime;
                    loadData();
                }
            }
        }
    };
    /**
     * Refreshes the layout.
     */
    function applyLayout($newImages) {
        $container.append($newImages);
        imagesLoaded(container, function () {
            // Destroy the old handler
            if (wookmark === undefined) {
                wookmark = new Wookmark(container, options);
            } else {
                wookmark.initItems();
                wookmark.layout(true);
            }
            // Set opacity for each new image at a random time
            //if ($newImages)
            //    $newImages.each(function () {
            //        var $self = $(this);
            //        window.setTimeout(function () {
            //            $self.css('opacity', 1);
            //        }, Math.random() * fadeInDelay);
            //    });
        });
    }

    /**
     * Loads data from the API.
     */
    function loadData() {
        console.log('loadData');
        isLoading = true;
        $loaderCircle.show();
        $.ajax({
//                type: 'POST',
            url: apiURL,
//                dataType: 'jsonp', // 跨域 Set to jsonp if you use a server on a different domain and change it's setting accordingly
            data: {page: page}, // Page parameter to make sure we load new data
//                complete: onLoadData
            success: onLoadData
        });
        console.log('ajax')
    }

    /**
     * Receives data from the API, creates HTML for images and updates the layout
     */
    function onLoadData(response) {
//            if (response.status == 200) {
        isLoading = false;
        $loaderCircle.hide();
        // Increment page index for future calls.
        page++;
        var template = $('#pin-tpl').html();
        var $newImages = Mustache.render(template, {image: response});
        // Disable requests if we reached the end
        if (response.message == 'No more pictures') {
            $document.off('scroll', onScroll);
        }
        // Apply layout.
        applyLayout($newImages);
//            }
    }

    // Capture scroll event.
    $document.on('scroll', onScroll);
    // Load first data from the API.
    loadData();
});

