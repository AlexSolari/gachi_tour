var __ = function Utility(selector, context) {
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

__.clone = function (object) {
    return JSON.parse(JSON.stringify(object));
}

var data = [
    {
        battletag: "CoconutBro#2690",
        deck1: "CoconutBro/1.png",
        deck2: "CoconutBro/2.png",
        deck3: "CoconutBro/3.png",
    },
    {
        battletag: "OriGiNaL#2571",
        deck1: "OriGiNaL/1.png",
        deck2: "OriGiNaL/2.png",
        deck3: "OriGiNaL/3.png",
    },
    {
        battletag: "DupeplGanter#2737",
        deck1: "DupeplGanter/1.png",
        deck2: "DupeplGanter/2.png",
        deck3: "DupeplGanter/3.png",
    },
    {
        battletag: "Vorchun#21737",
        deck1: "Vorchun/1.png",
        deck2: "Vorchun/2.png",
        deck3: "Vorchun/3.png",
    },
    {
        battletag: "Mulder#22828",
        deck1: "Mulder/1.png",
        deck2: "Mulder/2.png",
        deck3: "Mulder/3.png",
    },
    {
        battletag: "xeniqsx#2596",
        deck1: "xeniqsx/1.png",
        deck2: "xeniqsx/2.png",
        deck3: "xeniqsx/3.png",
    },
    {
        battletag: "Sp4rkyDa4rk#2269",
        deck1: "Sp4rkyD4rk/1.png",
        deck2: "Sp4rkyD4rk/2.png",
        deck3: "Sp4rkyD4rk/3.png",
    },
]

__(function Init() {
    var tabPattern = __("#template-tab").html();
    var tabContentPattern = __("#template-content").html();

    var tabContainer = __(".tabs");
    var contentContainer = __(".tabs-content");

    data.forEach(function (data, index) {
        index += 1;

        var formattedTab = tabPattern
            .replace("{index}", index)
            .replace("{battletag}", data.battletag);

        var formattedContent = tabContentPattern
            .replace("{index}", index)
            .replace("{deck1}", data.deck1)
            .replace("{deck2}", data.deck2)
            .replace("{deck3}", data.deck3);

        if (index == 1) {
            formattedContent = formattedContent.replace("mui-tabs__pane", "mui-tabs__pane mui--is-active");
            //formattedTab = formattedTab.replace('class=""', 'class= "mui--is-active"');
        }

        tabContainer.append(formattedTab);
        contentContainer.append(formattedContent);
    });

    setTimeout(function () {
        __(".tabs li a").each(function (tab) {
            tab.dispatchEvent(new CustomEvent("click"));
        });
    }, 333);
});
