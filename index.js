var $ = function Utility(selector, context) {
    var searchResult;
    if (typeof (selector) == "string") {
        context = context || document;

        searchResult = context.querySelectorAll(selector);
    }
    else if (typeof (selector) != "function") {
        searchResult = selector;
    }
    else {
        addEventListener("load", function EventListener() {
            selector();
        })
        return;
    }

    searchResult.css = function ApplyCSS(name, value) {
        var length = searchResult.length;
        for (var i = length; i--;) {
            if (typeof (name) == "string") {
                searchResult[i].style[name] = value;
            }
            else {
                var props = name;
                for (var index in props) {
                    searchResult[i].style[index] = props[index];
                }
            }
        }
        return searchResult;
    }

    searchResult.html = function ApplyHTML(value) {
        if (arguments.length == 0) {
            if (searchResult.length == 1)
                return searchResult[0].innerHTML;

            if (searchResult.length > 1)
                return searchResult.map(x => x.innerHTML);

            return null;
        }

        var length = searchResult.length;
        for (var i = length; i--;) {
            searchResult[i].innerHTML = value;
        }
        return searchResult;
    }

    searchResult.on = function AddEvent(event, handler) {
        var length = searchResult.length;
        for (var i = length; i--;) {
            searchResult[i]["on" + event] = handler;
        }
        return searchResult;
    }

    searchResult.append = function AppendHTML(html) {
        var length = searchResult.length;
        for (var i = length; i--;) {
            searchResult[i].innerHTML += html;
        }
        return searchResult;
    }

    searchResult.each = function Each(handler) {
        var length = searchResult.length;
        for (var i = length; i--;) {
            handler(searchResult[i], i, searchResult);
        }
        return searchResult;
    }
    
    return searchResult;
};

$.clone = function (object) {
    return JSON.parse(JSON.stringify(object));
}

var data = [
    {
        battletag: "SecondSail#2603",
        deck1: "SecondSail/1.png",
        deck2: "SecondSail/2.png",
        deck3: "SecondSail/3.png",
        deck4: "SecondSail/4.png",
    },
    {
        battletag: "OriGiNaL#2571",
        deck1: "OriGiNaL/1.png",
        deck2: "OriGiNaL/2.png",
        deck3: "OriGiNaL/3.png",
        deck4: "OriGiNaL/4.png",
    },
    {
        battletag: "Hentaiware#2374",
        deck1: "Hentaiware/1.png",
        deck2: "Hentaiware/2.png",
        deck3: "Hentaiware/3.png",
        deck4: "Hentaiware/4.png",
    },
    {
        battletag: "AppleSin#2242",
        deck1: "AppleSin/1.png",
        deck2: "AppleSin/2.png",
        deck3: "AppleSin/3.png",
        deck4: "AppleSin/4.png",
    },
    {
        battletag: "Vorchun#21737",
        deck1: "Vorchun/1.png",
        deck2: "Vorchun/2.png",
        deck3: "Vorchun/3.png",
        deck4: "Vorchun/4.png",
    },
    {
        battletag: "Mulder#22828",
        deck1: "Mulder/1.png",
        deck2: "Mulder/2.png",
        deck3: "Mulder/3.png",
        deck4: "Mulder/4.png",
    },
]

$(function Init() {
    var tabPattern = $("#template-tab").html();
    var tabContentPattern = $("#template-content").html();

    var tabContainer = $(".tabs");
    var contentContainer = $(".tabs-content");

    data.forEach(function (data, index) {
        index += 1;

        var formattedTab = tabPattern
            .replace("{index}", index)
            .replace("{battletag}", data.battletag);

        var formattedContent = tabContentPattern
            .replace("{index}", index)
            .replace("{deck1}", data.deck1)
            .replace("{deck2}", data.deck2)
            .replace("{deck3}", data.deck3)
            .replace("{deck4}", data.deck4);

        if (index == 1) {
            formattedContent = formattedContent.replace("mui-tabs__pane", "mui-tabs__pane mui--is-active");
            //formattedTab = formattedTab.replace('class=""', 'class= "mui--is-active"');
        }

        tabContainer.append(formattedTab);
        contentContainer.append(formattedContent);
    });

    setTimeout(function () {
        $(".tabs li a").each(function (tab) {
            tab.dispatchEvent(new CustomEvent("click"));
        });
    }, 333);
});
