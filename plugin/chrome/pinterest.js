!function (a, b, c) {
    var d = a[c.k] = {
        w: a, d: b, a: c, s: {}, f: function () {
            return {
                callback: [], get: function (a, b) {
                    var c = null;
                    return c = "string" === typeof a[b] ? a[b] : a.getAttribute(b)
                }, getData: function (a, b) {
                    return b = d.a.dataAttributePrefix + b, d.f.get(a, b)
                }, getSelection: function () {
                    return ("" + (d.w.getSelection ? d.w.getSelection() : d.d.getSelection ? d.d.getSelection() : d.d.selection.createRange().text)).replace(/(^\s+|\s+$)/g, "")
                }, set: function (a, b, c) {
                    "string" === typeof a[b] ? a[b] = c : a.setAttribute(b, c)
                }, make: function (a) {
                    var b, c, e = !1;
                    for (b in a)if (a[b].hasOwnProperty) {
                        e = d.d.createElement(b);
                        for (c in a[b])a[b][c].hasOwnProperty && "string" === typeof a[b][c] && d.f.set(e, c, a[b][c]);
                        break
                    }
                    return e
                }, kill: function (a) {
                    "string" === typeof a && (a = d.d.getElementById(a)), a && a.parentNode && a.parentNode.removeChild(a)
                }, replace: function (a, b) {
                    a.parentNode.insertBefore(b, a), d.f.kill(a)
                }, getEl: function (a) {
                    var b = null;
                    return b = a.target ? 3 === a.target.nodeType ? a.target.parentNode : a.target : a.srcElement
                }, listen: function (a, b, c) {
                    a && ("undefined" !== typeof d.w.addEventListener ? a.addEventListener(b, c, !1) : "undefined" !== typeof d.w.attachEvent && a.attachEvent("on" + b, c))
                }, call: function (a, b) {
                    var c, e, f = "?";
                    c = d.f.callback.length, e = d.a.k + ".f.callback[" + c + "]", d.f.callback[c] = function (a) {
                        b(a, c), d.f.kill(e)
                    }, a.match(/\?/) && (f = "&"), d.d.b.appendChild(d.f.make({
                        SCRIPT: {
                            id: e,
                            type: "text/javascript",
                            charset: "utf-8",
                            src: a + f + "callback=" + e
                        }
                    }))
                }, debug: function (a, b) {
                    (d.v.config.debug || b) && d.w.console && d.w.console.log && d.w.console.log(a)
                }, presentation: function () {
                    var a, b, e;
                    a = d.f.make({STYLE: {type: "text/css"}}), b = d.a.cdn["https:"], e = d.a.rules.join("\n"), e = e.replace(/\._/g, "." + c.k + "_"), e = e.replace(/;/g, "!important;"), e = e.replace(/_cdn/g, b), e = e.replace(/_rez/g, d.v.resolution), a.styleSheet ? a.styleSheet.cssText = e : a.appendChild(d.d.createTextNode(e)), d.d.h ? d.d.h.appendChild(a) : d.d.b.appendChild(a)
                }, getStyle: function (a, b, c) {
                    var e = null;
                    return d.w.getComputedStyle ? e = d.w.getComputedStyle(a).getPropertyValue(b) : a.currentStyle && (e = a.currentStyle[b]), e && c && (e = parseInt(e) || 0), e
                }, getPos: function (a) {
                    var b, c, e, f, g, h = 0, i = 0;
                    if (a.offsetParent) {
                        do h += a.offsetLeft, i += a.offsetTop; while (a = a.offsetParent);
                        if (!d.v.hazIE) {
                            var b = d.d.getElementsByTagName("HTML")[0], c = d.f.getStyle(b, "margin-top", !0) || 0, e = d.f.getStyle(b, "padding-top", !0) || 0, f = d.f.getStyle(b, "margin-left", !0) || 0, g = d.f.getStyle(b, "padding-left", !0) || 0;
                            h += f + g, i += c + e
                        }
                        return {left: h, top: i}
                    }
                }, hideFloatingButton: function () {
                    d.s.floatingButton && d.f.kill(d.s.floatingButton)
                }, getButtonConfig: function (a) {
                    var b = {
                        height: d.f.getData(a, "height") || d.v.config.height,
                        color: d.f.getData(a, "color") || d.v.config.color,
                        shape: d.f.getData(a, "shape") || d.v.config.shape,
                        assets: d.f.getData(a, "lang") || d.v.config.lang,
                        zero: d.f.getData(a, "zero") || null,
                        pad: d.f.getData(a, "count-pad") || null,
                        config: d.f.getData(a, "config") || "none"
                    }, c = d.f.getData(a, "id");
                    return c && (b.id = c), "round" === b.shape ? ("16" !== b.height && "32" !== b.height && (b.height = "16"), b.color = "red") : "rect" === b.shape ? ("20" !== b.height && "28" !== b.height && (b.height = "20"), "gray" !== b.color && "red" !== b.color && "white" !== b.color && (b.color = "gray")) : (b.shape = "rect", b.height = "20", b.color = "gray"), "rect" === b.shape ? d.a.hazAssets[b.assets] || (b.assets = d.v.config.assets) : b.assets = "en", b
                }, showFloatingButton: function (a) {
                    d.f.debug("show floating Pin It button"), d.f.hideFloatingButton();
                    var b = d.f.getButtonConfig(a);
                    if (a.height > d.a.minImgSize && a.width > d.a.minImgSize && !a.src.match(/^data/)) {
                        var c = d.a.k + "_pin_it_button_" + b.height + " " + d.a.k + "_pin_it_button_" + b.assets + "_" + b.height + "_" + b.color + " " + d.a.k + "_pin_it_button_floating_" + b.height;
                        "round" === b.shape && (c = d.a.k + "_pin_it_button_en_" + b.height + "_red_round " + d.a.k + "_pin_it_button_floating_en_" + b.height + "_red_round");
                        var e, f = d.f.getPos(a);
                        b.id ? (e = d.v.endpoint.repin.replace(/%s/, b.id), d.s.floatingButton = d.f.make({
                            A: {
                                className: c,
                                title: "Pin it!",
                                "data-pin-log": "button_pinit_floating_repin",
                                "data-pin-href": e
                            }
                        })) : (e = d.v.endpoint.create + "guid=" + d.v.guid, e = e + "&url=" + encodeURIComponent(d.f.getData(a, "url") || d.d.URL), e = e + "&media=" + encodeURIComponent(d.f.getData(a, "media") || a.src), e = e + "&description=" + encodeURIComponent(d.f.getSelection() || d.f.getData(a, "description") || a.title || a.alt || d.d.title), d.s.floatingButton = d.f.make({
                            A: {
                                className: c,
                                title: "Pin it!",
                                "data-pin-log": "button_pinit_floating",
                                "data-pin-href": e
                            }
                        })), d.d.b.appendChild(d.s.floatingButton), d.s.floatingButton.style.top = f.top + d.a.floatingButtonOffsetTop + "px", d.s.floatingButton.style.left = f.left + d.a.floatingButtonOffsetLeft + "px", d.s.floatingButton.style.zIndex = "8675309", d.s.floatingButton.style.display = "block"
                    }
                }, over: function (a) {
                    var b, c;
                    b = a || d.w.event, c = d.f.getEl(b), c && ("IMG" !== c.tagName || !c.src || d.f.getData(c, "no-hover") || d.f.get(c, "nopin") || d.f.getData(c, "nopin") || !d.v.config.hover ? d.v.hazFloatingButton === !0 && c !== d.s.floatingButton && (d.v.hazFloatingButton = !1, d.f.hideFloatingButton()) : d.v.hazFloatingButton === !1 ? (d.v.hazFloatingButton = !0, d.f.showFloatingButton(c)) : (d.f.hideFloatingButton(), d.f.showFloatingButton(c)))
                }, click: function (a) {
                    a = a || d.w.event;
                    var b, c, e;
                    if (b = d.f.getEl(a), b && (c = d.f.getData(b, "log")))if ("embed_pin_play" === c) {
                        var f = b.parentNode.getElementsByTagName("IMG")[0];
                        "II GIF" !== b.innerHTML ? (b.innerHTML = "II GIF", d.f.set(b, "data-pin-pause", f.src), f.src = f.src.replace(/(237x|345x|600x)/, "originals")) : (b.innerHTML = "&#9654; GIF", f.src = d.f.getData(b, "pause"))
                    } else if (e = d.f.getData(b, "href"))switch (d.f.log("&type=" + c + "&href=" + encodeURIComponent(e)), b.className.match(/hazClick/) || (b.className = b.className + " " + d.a.k + "_hazClick"), c) {
                        case"button_pinit":
                            var g = d.f.parse(e, {url: !0, media: !0, description: !0});
                            g.description || d.f.log("&type=config_warning&warning_msg=no_description&href=" + encodeURIComponent(d.d.URL)), g.url && g.url.match(/^http/i) && g.media && g.media.match(/^http/i) ? d.w.open(e, "pin" + (new Date).getTime(), d.a.pop) : (d.f.log("&type=config_error&error_msg=invalid_url&href=" + encodeURIComponent(d.d.URL)), d.f.fireBookmark());
                            break;
                        case"button_pinit_bookmarklet":
                            d.f.fireBookmark();
                            break;
                        case"button_pinit_floating":
                        case"button_pinit_floating_repin":
                            d.w.open(e, "pin" + (new Date).getTime(), d.a.pop), d.f.hideFloatingButton(), d.v.hazFloatingButton = !1;
                            break;
                        case"button_pinit_repin":
                        case"embed_pin":
                        case"embed_pin_repin":
                        case"embed_board_thumb":
                        case"embed_user_thumb":
                            d.w.open(e, "pin" + (new Date).getTime(), d.a.pop);
                            break;
                        case"button_follow":
                            a.preventDefault(), d.w.open(e, "pin" + (new Date).getTime(), d.a.popHuge);
                            break;
                        case"embed_pin_pinner":
                        case"embed_pin_board":
                        case"embed_pin_img":
                        case"embed_board_hd":
                        case"embed_user_hd":
                        case"embed_board_ft":
                        case"embed_user_ft":
                        case"button_follow_auto":
                            d.w.open(e, "_blank")
                    } else e = d.f.get(b, "href"), e && d.f.log("&type=" + c + "&href=" + encodeURIComponent(e))
                }, filter: function (a) {
                    var b, c;
                    b = "", c = "";
                    try {
                        b = decodeURIComponent(a)
                    } catch (d) {
                    }
                    return c = b.replace(/</g, "&lt;"), c = c.replace(/>/g, "&gt;")
                }, behavior: function () {
                    d.f.listen(d.d.b, "click", d.f.click), d.v.config.hover && (d.v.countButton = d.v.countButton + 1, d.d.b.setAttribute("data-pin-hover", !0), d.f.listen(d.d.b, "mouseover", d.f.over));
                    var a = function () {
                        for (var b = d.d.getElementsByTagName("SCRIPT"), c = 0, e = b.length; c < e; c += 1)b[c] && b[c].src && b[c].src.match(/^https?:\/\/log\.pinterest\.com/) && d.f.kill(b[c]);
                        d.w.setTimeout(function () {
                            a()
                        }, 2e3)
                    };
                    a()
                }, getPinCount: function (a) {
                    var b = "?url=" + a + "&ref=" + encodeURIComponent(d.v.here) + "&source=" + d.a.countSource;
                    d.f.call(d.a.endpoint.count + b, d.f.ping.count)
                }, prettyPinCount: function (a) {
                    return a > 999 && (a = a < 1e6 ? parseInt(a / 1e3, 10) + "K+" : a < 1e9 ? parseInt(a / 1e6, 10) + "M+" : "++"), a
                }, grid: function (a, b, c) {
                    c || (c = "embed_grid"), a.style.display = "block";
                    var e = {
                        height: d.a.tile.scale.height,
                        width: d.a.tile.scale.width
                    }, f = d.f.getData(a, "scale-height");
                    f && f >= d.a.tile.scale.minHeight && (e.height = parseInt(f, 10));
                    var g = d.f.getData(a, "scale-width");
                    g && g >= d.a.tile.scale.minWidth && (e.width = parseInt(g, 10));
                    var h = d.f.getData(a, "board-width") || a.offsetWidth;
                    h > a.offsetWidth && (h = a.offsetWidth);
                    var i = Math.floor(h / (e.width + d.a.tile.style.margin));
                    if (i > d.a.tile.maxColumns && (i = d.a.tile.maxColumns), i < d.a.tile.minColumns)return !1;
                    var j = d.f.make({SPAN: {className: d.a.k + "_embed_grid_bd"}});
                    j.style.height = e.height + "px", d.v.renderedWidth = i * (e.width + d.a.tile.style.margin) - d.a.tile.style.margin, j.style.width = d.v.renderedWidth + "px";
                    for (var k = d.f.make({SPAN: {className: d.a.k + "_embed_grid_ct"}}), l = 0, m = [], n = 0, o = b.length; n < o; n += 1) {
                        var p = d.f.make({SPAN: {innerHTML: b[n].description}}), q = d.f.make({
                            A: {
                                className: d.a.k + "_embed_grid_th",
                                title: p.innerHTML,
                                "data-pin-href": d.v.endpoint.repin.replace(/%s/, b[n].id),
                                "data-pin-id": b[n].id,
                                "data-pin-log": c + "_thumb"
                            }
                        }), r = b[n].images[d.a.pinWidget.imgKey], s = {
                            height: r.height * (e.width / r.width),
                            width: e.width
                        }, t = d.f.make({
                            IMG: {
                                src: r.url,
                                "data-pin-nopin": "true",
                                height: s.height,
                                width: s.width,
                                className: d.a.k + "_embed_grid_img",
                                alt: b[n].description
                            }
                        });
                        t.style.height = s.height + "px", t.style.width = s.width + "px", t.style.minHeight = s.height + "px", t.style.minWidth = s.width + "px", t.style.marginTop = 0 - s.height / d.a.tile.style.margin + "px", s.height > e.height && (s.height = e.height), q.appendChild(t), q.style.height = s.height + "px", q.style.width = s.width + "px", m[l] || (m[l] = 0), q.style.top = m[l] + "px", q.style.left = l * (e.width + d.a.tile.style.margin) + "px", m[l] = m[l] + s.height + d.a.tile.style.margin, q.appendChild(t), k.appendChild(q), l = (l + 1) % i
                    }
                    for (var u = 1e4, n = 0; n < m.length; n += 1)m[n] < u && (u = m[n]);
                    return k.style.height = u + "px", j.appendChild(k), d.v.userAgent.match(/Mac OS X/) && (j.className = j.className + " " + d.a.k + "_embed_grid_scrolling_okay"), j
                }, makeHeader: function (a, b, c, e) {
                    var f = d.v.endpoint.pinterest + b.href.split(".com")[1], g = d.f.make({SPAN: {className: d.a.k + "_embed_grid_hd"}}), h = d.f.make({
                        A: {
                            className: d.a.k + "_avatar",
                            "data-pin-log": c,
                            href: f,
                            target: "_blank"
                        }
                    }), i = d.f.make({
                        IMG: {
                            alt: d.f.filter(a.data.user.full_name),
                            title: d.f.filter(a.data.user.full_name),
                            src: a.data.user.image_small_url.replace(/_30.jpg/, "_60.jpg")
                        }
                    });
                    if (h.appendChild(i), g.appendChild(h), e) {
                        var j = d.f.make({
                            A: {
                                className: d.a.k + "_embed_grid_first",
                                innerHTML: d.f.filter(a.data.user.full_name),
                                target: "_blank",
                                "data-pin-href": f,
                                "data-pin-log": c
                            }
                        });
                        j.style.width = d.v.renderedWidth - 45 + "px", g.appendChild(j);
                        var k = d.f.make({
                            A: {
                                className: d.a.k + "_embed_grid_second",
                                innerHTML: d.f.filter(a.data.board.name),
                                "data-pin-href": f,
                                "data-pin-log": c
                            }
                        });
                        k.style.width = d.v.renderedWidth - 45 + "px", g.appendChild(k)
                    } else {
                        var l = d.f.make({
                            A: {
                                className: d.a.k + "_embed_grid_mid",
                                innerHTML: d.f.filter(a.data.user.full_name),
                                "data-pin-log": c,
                                "data-pin-href": f
                            }
                        });
                        l.style.width = d.v.renderedWidth - 45 + "px", g.appendChild(l)
                    }
                    return g
                }, makeFooter: function (a, b, c) {
                    var e, f, g, h;
                    h = d.v.endpoint.pinterest + a.href.split(".com")[1], e = d.f.make({
                        A: {
                            className: d.a.k + "_embed_grid_ft",
                            "data-pin-log": b,
                            "data-pin-href": h
                        }
                    }), f = d.f.make({
                        SPAN: {
                            className: d.a.k + "_embed_grid_ft_logo",
                            "data-pin-log": b,
                            "data-pin-href": h
                        }
                    });
                    var i = d.v.strings;
                    return c && d.a.strings[c] && (i = d.a.strings[c]), d.v.renderedWidth > d.a.tile.minWidthToShowAuxText ? (g = d.f.make({
                        SPAN: {
                            innerHTML: i.seeOn,
                            "data-pin-log": b,
                            "data-pin-href": h
                        }
                    }), i.seeOnTextAfterLogo ? (e.appendChild(f), e.appendChild(g)) : (e.appendChild(g), e.appendChild(f))) : e.appendChild(f), e
                }, cssHook: function (a, b) {
                    var c = d.f.getData(a, "css-hook");
                    c && (b.className = b.className + " " + c)
                }, fireBookmark: function () {
                    d.d.b.appendChild(d.f.make({
                        SCRIPT: {
                            type: "text/javascript",
                            charset: "utf-8",
                            pinMethod: "button",
                            src: d.a.endpoint.bookmark + "?r=" + 99999999 * Math.random()
                        }
                    }))
                }, ping: {
                    log: function () {
                    }, count: function (a, b) {
                        var c = d.d.getElementById(d.a.k + "_pin_count_" + b);
                        if (c) {
                            d.f.debug("API replied with count: " + a.count);
                            var e = c.parentNode, f = d.f.getData(e, "config");
                            0 === a.count && ("above" === f ? (d.f.debug("Rendering zero count above."), c.className = d.a.k + "_pin_it_button_count", c.appendChild(d.d.createTextNode("0"))) : d.f.getData(e, "zero") ? (d.f.debug("Zero pin count rendered to the side."), c.className = d.a.k + "_pin_it_button_count", c.appendChild(d.d.createTextNode("0"))) : d.f.debug("Zero pin count NOT rendered to the side.")), a.count > 0 && (d.f.debug("Got " + a.count + " pins for the requested URL."), "above" === f || "beside" === f ? (d.f.debug("Rendering pin count " + f), c.className = d.a.k + "_pin_it_button_count", c.appendChild(d.d.createTextNode(d.f.prettyPinCount(a.count)))) : d.f.debug("No valid pin count position specified; not rendering.")), d.f.cssHook(e, c)
                        } else d.f.debug("Pin It button container not found.")
                    }, pin: function (a, b) {
                        var c = d.d.getElementById(d.a.k + "_" + b);
                        if (c && a.data && a.data[0]) {
                            d.f.debug("API replied with pin data");
                            var e = a.data[0], f = {};
                            if (e.images && (f = e.images[d.a.pinWidget.imgKey]), e && e.id && e.description && f.url && f.width && f.height) {
                                d.f.debug("Found enough data to embed a pin");
                                var g = d.v.strings, h = d.f.getData(c, "lang") || d.v.config.lang;
                                d.a.strings[h] && (g = d.a.strings[h]);
                                var i = d.f.make({
                                    SPAN: {
                                        className: d.a.k + "_embed_pin",
                                        "data-pin-id": e.id
                                    }
                                }), j = d.f.getData(c, "style");
                                "plain" !== j && (i.className = i.className + " " + d.a.k + "_fancy");
                                var k = d.f.make({
                                    A: {
                                        className: d.a.k + "_embed_pin_link",
                                        "data-pin-log": "embed_pin",
                                        "data-pin-href": d.v.endpoint.repin.replace(/%s/, e.id)
                                    }
                                });
                                if (width = d.f.getData(c, "width"), "large" === width) {
                                    var l = d.d.URL.split("/")[2].split(".").pop() || "";
                                    h.match(d.a.pinWidget.lang) && l.match(d.a.pinWidget.domain) ? (f.url = f.url.replace(/237x/, d.a.pinWidget.large.width + "x"), f.height = ~~(f.height * d.a.pinWidget.large.ratio), f.width = d.a.pinWidget.large.width, i.className = i.className + " " + d.a.k + "_large") : (f.url = f.url.replace(/237x/, d.a.pinWidget.medium.width + "x"), f.height = ~~(f.height * d.a.pinWidget.medium.ratio), f.width = d.a.pinWidget.medium.width, i.className = i.className + " " + d.a.k + "_medium")
                                }
                                e.embed && "gif" !== e.embed.type && e.embed.src ? (embedSrc = e.embed.src.replace(/autoplay=/i, "nerfAutoPlay="), player = d.f.make({
                                    IFRAME: {
                                        className: d.a.k + "_embed_pin_link_iframe",
                                        src: embedSrc
                                    }
                                }), player.width = f.width, player.height = f.height, player.frameBorder = "0", i.appendChild(player)) : (img = d.f.make({
                                    IMG: {
                                        className: d.a.k + "_embed_pin_link_img",
                                        alt: e.description,
                                        "data-pin-nopin": "true",
                                        src: f.url,
                                        width: f.width,
                                        height: f.height,
                                        "data-pin-log": "embed_pin_img",
                                        "data-pin-href": d.v.endpoint.pinterest + "/pin/" + e.id + "/"
                                    }
                                }), img.style.width = f.width + "px", img.style.height = f.height + "px", k.appendChild(img), rpc = d.a.k + "_repin", "ja" === h && (rpc += "_ja"), repin = d.f.make({
                                    I: {
                                        className: rpc,
                                        "data-pin-id": e.id,
                                        "data-pin-log": "embed_pin_repin",
                                        "data-pin-href": d.v.endpoint.repin.replace(/%s/, e.id)
                                    }
                                }), k.appendChild(repin), e.embed && e.embed.type && "gif" === e.embed.type && (play = d.f.make({
                                    I: {
                                        className: d.a.k + "_play " + d.a.k + "_paused",
                                        innerHTML: "&#9654; GIF",
                                        "data-pin-log": "embed_pin_play"
                                    }
                                }), k.appendChild(play)), i.appendChild(k));
                                var m = d.f.make({
                                    SPAN: {
                                        className: d.a.k + "_embed_pin_desc",
                                        innerHTML: d.f.filter(e.description)
                                    }
                                });
                                if (e.attribution && e.attribution.url && e.attribution.author_name && e.attribution.provider_icon_url) {
                                    d.f.debug("Building attribution line");
                                    var n = d.f.make({SPAN: {className: d.a.k + "_embed_pin_attrib"}});
                                    n.appendChild(d.f.make({
                                        IMG: {
                                            className: d.a.k + "_embed_pin_attrib_icon",
                                            src: e.attribution.provider_icon_url
                                        }
                                    })), n.appendChild(d.f.make({
                                        SPAN: {
                                            className: d.a.k + "_embed_pin_attrib",
                                            innerHTML: g.attribTo + ' <a href="' + e.attribution.url + '" target="_blank">' + d.f.filter(e.attribution.author_name) + "</a>"
                                        }
                                    })), m.appendChild(n)
                                }
                                if (e.repin_count || e.like_count) {
                                    var o = d.f.make({SPAN: {className: d.a.k + "_embed_pin_stats"}});
                                    if (e.repin_count) {
                                        var p = d.f.make({
                                            SPAN: {
                                                className: d.a.k + "_embed_pin_stats_repin_count",
                                                innerHTML: "" + e.repin_count
                                            }
                                        });
                                        o.appendChild(p)
                                    }
                                    if (e.like_count) {
                                        var q = d.f.make({
                                            SPAN: {
                                                className: d.a.k + "_embed_pin_stats_like_count",
                                                innerHTML: "" + e.like_count
                                            }
                                        });
                                        o.appendChild(q)
                                    }
                                    m.appendChild(o)
                                }
                                if (i.appendChild(m), e.pinner && e.pinner.profile_url && e.pinner.image_small_url && e.pinner.full_name) {
                                    d.f.debug("Building pinner line"), e.pinner.profile_url = e.pinner.profile_url.replace("//" + d.a.defaults.domain + ".pinterest.com", d.v.endpoint.pinterest);
                                    var r = d.f.make({SPAN: {className: d.a.k + "_embed_pin_text"}}), s = d.f.make({
                                        A: {
                                            "data-pin-log": "embed_pin_pinner",
                                            href: e.pinner.profile_url,
                                            target: "_blank"
                                        }
                                    });
                                    s.appendChild(d.f.make({
                                        IMG: {
                                            className: d.a.k + "_embed_pin_text_avatar",
                                            alt: d.f.filter(e.pinner.full_name),
                                            title: d.f.filter(e.pinner.full_name),
                                            src: e.pinner.image_small_url
                                        }
                                    })), r.appendChild(s), r.appendChild(d.f.make({
                                        SPAN: {
                                            className: d.a.k + "_embed_pin_text_container",
                                            innerHTML: '<span data-pin-log="embed_pin_pinner" data-pin-href="' + e.pinner.profile_url + '" class="' + d.a.k + '_embed_pin_text_container_pinner">' + d.f.filter(e.pinner.full_name) + '</span><span data-pin-log="embed_pin_board" data-pin-href="' + d.v.endpoint.pinterest + e.board.url + '" class="' + d.a.k + '_embed_pin_text_container_board">' + d.f.filter(e.board.name) + "</span>"
                                        }
                                    })), i.appendChild(r)
                                }
                                d.f.cssHook(c, i), d.f.replace(c, i)
                            } else d.f.debug("Not enough data to embed a pin; aborting")
                        }
                    }, user: function (a, b) {
                        var c = d.d.getElementById(d.a.k + "_" + b);
                        if (c && a.data && a.data.pins && a.data.pins.length) {
                            var e = d.f.getData(c, "lang") || d.v.config.lang;
                            d.f.debug("API replied with a user");
                            var f = d.f.make({SPAN: {className: d.a.k + "_embed_grid"}}), g = d.f.getData(c, "style");
                            "plain" !== g && (f.className = f.className + " " + d.a.k + "_fancy");
                            var h = d.f.grid(c, a.data.pins, "embed_user");
                            if (h) {
                                var i = d.f.makeHeader(a, c, "embed_user_hd");
                                f.appendChild(i), f.appendChild(h), f.appendChild(d.f.makeFooter(c, "embed_user_ft", e)), d.f.cssHook(c, f), d.f.replace(c, f)
                            }
                        }
                    }, board: function (a, b) {
                        var c = d.d.getElementById(d.a.k + "_" + b);
                        if (c && a.data && a.data.pins && a.data.pins.length) {
                            d.f.debug("API replied with a group of pins");
                            var e = d.f.getData(c, "lang") || d.v.config.lang, f = d.f.make({SPAN: {className: d.a.k + "_embed_grid"}}), g = d.f.getData(c, "style");
                            "plain" !== g && (f.className = f.className + " " + d.a.k + "_fancy");
                            var h = d.f.grid(c, a.data.pins, "embed_board");
                            if (h) {
                                var i = d.f.makeHeader(a, c, "embed_board_hd", !0);
                                f.appendChild(i), f.appendChild(h), f.appendChild(d.f.makeFooter(c, "embed_board_ft", e)), d.f.cssHook(c, f), d.f.replace(c, f)
                            }
                        }
                    }
                }, parse: function (a, b) {
                    var c, d, e, f, g, h;
                    if (h = {}, c = a.split("#")[0].split("?"), c[1])for (d = c[1].split("&"), f = 0, g = d.length; f < g; f += 1)e = d[f].split("="), 2 === e.length && b[e[0]] && (h[e[0]] = e[1]);
                    return h
                }, fixUrl: function (a) {
                    var b = "";
                    try {
                        b = decodeURIComponent(a)
                    } catch (c) {
                    }
                    return b === a && (a = encodeURIComponent(a)), a.match(/^http/i) || (a.match(/^%2F%2F/i) || (a = "%2F%2F" + a), a = "http%3A" + a, d.f.debug("fixed URL: " + a)), a
                }, render: {
                    buttonBookmark: function (a) {
                        d.f.debug("build bookmarklet button");
                        var b = d.f.getButtonConfig(a), c = d.a.k + "_pin_it_button_" + b.height + " " + d.a.k + "_pin_it_button_" + b.assets + "_" + b.height + "_" + b.color + " " + d.a.k + "_pin_it_button_inline_" + b.height;
                        "round" === b.shape && (c = d.a.k + "_pin_it_button_en_" + b.height + "_red_round " + d.a.k + "_pin_it_button_inline_en_" + b.height + "_red_round");
                        var e = d.f.make({
                            A: {
                                "data-pin-href": a.href,
                                "data-pin-log": "button_pinit_bookmarklet",
                                className: c
                            }
                        });
                        if ((d.f.getData(a, "zero") || d.v.config.zero) && d.f.set(e, d.a.dataAttributePrefix + "zero", !0), d.a.config.pinItCountPosition[b.config] === !0 && "rect" === b.shape) {
                            d.f.set(e, d.a.dataAttributePrefix + "config", b.config), e.className = e.className + " " + d.a.k + "_pin_it_" + b.config + "_" + b.height;
                            var f = d.f.make({
                                SPAN: {
                                    className: d.a.k + "_hidden",
                                    id: d.a.k + "_pin_count_" + d.f.callback.length,
                                    innerHTML: "<i></i>"
                                }
                            });
                            e.appendChild(f), d.f.getPinCount(d.d.URL)
                        } else e.className = e.className + " " + d.a.k + "_pin_it_none";
                        d.f.replace(a, e), d.v.countButton = d.v.countButton + 1
                    }, buttonPin: function (a) {
                        d.f.debug("build Pin It button");
                        var b = d.f.getButtonConfig(a), c = d.a.k + "_pin_it_button_" + b.height + " " + d.a.k + "_pin_it_button_" + b.assets + "_" + b.height + "_" + b.color + " " + d.a.k + "_pin_it_button_inline_" + b.height;
                        "round" === b.shape && (c = d.a.k + "_pin_it_button_en_" + b.height + "_red_round " + d.a.k + "_pin_it_button_inline_en_" + b.height + "_red_round");
                        var e, f;
                        f = d.f.parse(a.href, {
                            url: !0,
                            media: !0,
                            description: !0
                        }), f.media ? f.media = d.f.fixUrl(f.media) : (f.media = "", d.f.debug("no media found; click will pop bookmark")), f.url ? f.url = d.f.fixUrl(f.url) : (f.url = encodeURIComponent(d.d.URL), d.f.debug("no url found; click will pin this page")), f.description || (f.description = encodeURIComponent(d.d.title || "")), d.v.buttonId = d.v.buttonId + 1, e = d.v.endpoint.create + "guid=" + d.v.guid + "-" + d.v.buttonId + "&url=" + f.url + "&media=" + f.media + "&description=" + f.description;
                        var g = d.f.make({A: {className: c, "data-pin-href": e, "data-pin-log": "button_pinit"}});
                        (d.f.getData(a, "zero") || d.v.config.zero) && d.f.set(g, d.a.dataAttributePrefix + "zero", !0);
                        var h = d.f.getData(a, "config");
                        if (d.a.config.pinItCountPosition[h] === !0 ? (d.f.set(g, d.a.dataAttributePrefix + "config", h), g.className = g.className + " " + d.a.k + "_pin_it_" + b.config + "_" + b.height, b.pad && (g.className = g.className + " " + d.a.k + "_pin_it_" + b.config + "_" + b.height + "_pad")) : g.className = g.className + " " + d.a.k + "_pin_it_none", b.id && f.media && (d.f.set(g, "data-pin-log", "button_pinit_repin"), d.f.set(g, "data-pin-id", b.id), d.f.set(g, "data-pin-href", d.v.endpoint.repin.replace(/%s/, b.id) + "?media=" + f.media)), f.url) {
                            if ("rect" === b.shape) {
                                var i = d.f.make({
                                    SPAN: {
                                        className: d.a.k + "_hidden",
                                        id: d.a.k + "_pin_count_" + d.f.callback.length,
                                        innerHTML: "<i></i>"
                                    }
                                });
                                g.appendChild(i), d.f.getPinCount(f.url)
                            }
                            d.f.replace(a, g), d.v.countButton = d.v.countButton + 1
                        }
                    }, buttonFollow: function (a) {
                        d.f.debug("build follow button");
                        var b = "_follow_me_button", c = d.f.getData(a, "height") || d.v.config.height || 0;
                        "28" === c && (b += "_28");
                        var e = d.f.make({
                            A: {
                                href: a.href,
                                className: d.a.k + b,
                                innerHTML: a.innerHTML,
                                "data-pin-href": a.href + "?guid=" + d.v.guid + "-" + d.v.buttonId
                            }
                        });
                        a.href.match(/\/follow\//) ? e.setAttribute("data-pin-log", "button_follow_auto") : (e.setAttribute("data-pin-log", "button_follow"), a.href.match(/\/$/) || (a.href = a.href + "/"), a.href.match(/pins\/follow\/$/) || (a.href = a.href + "pins/follow/"), e.setAttribute("data-pin-href", a.href + "?guid=" + d.v.guid + "-" + d.v.buttonId)), e.appendChild(d.f.make({B: {}})), e.appendChild(d.f.make({I: {}})), d.f.replace(a, e), d.v.buttonId = d.v.buttonId + 1, d.v.countFollow = d.v.countFollow + 1
                    }, embedPin: function (a) {
                        d.f.debug("build embedded pin");
                        var b = a.href.split("/")[4];
                        b && parseInt(b, 10) > 0 && d.f.getPinsIn("pin", "", {pin_ids: b}), d.v.countPin = d.v.countPin + 1
                    }, embedUser: function (a) {
                        d.f.debug("build embedded profile");
                        var b = a.href.split("/")[3];
                        b && d.f.getPinsIn("user", b + "/pins/"), d.v.countProfile = d.v.countProfile + 1
                    }, embedBoard: function (a) {
                        d.f.debug("build embedded board");
                        var b = a.href.split("/")[3], c = a.href.split("/")[4];
                        b && c && d.f.getPinsIn("board", b + "/" + c + "/pins/"), d.v.countBoard = d.v.countBoard + 1
                    }
                }, getPinsIn: function (a, b, c) {
                    c || (c = {});
                    var e, f = "", g = "?";
                    c.sub = d.v.config.domain;
                    for (e in c)c[e].hasOwnProperty && (f = f + g + e + "=" + c[e], g = "&");
                    d.f.call(d.a.endpoint[a] + b + f, d.f.ping[a])
                }, build: function (a) {
                    "object" === typeof a && null !== a && a.parentNode || (a = d.d);
                    var b, c, e, f, g, h = a.getElementsByTagName("A"), i = {
                        vertical: "above",
                        horizontal: "beside"
                    }, j = [];
                    for (c = 0, b = h.length; c < b; c += 1)j.push(h[c]);
                    for (c = 0, b = j.length; c < b; c += 1)j[c].href && j[c].href.match(d.a.myDomain) && (e = d.f.getData(j[c], "do"), !e && j[c].href.match(/pin\/create\/button/) && (e = "buttonPin", g = "none", f = d.f.get(j[c], "count-layout"), f && i[f] && (g = i[f]), d.f.set(j[c], "data-pin-config", g)), "function" === typeof d.f.render[e] && (j[c].id = d.a.k + "_" + d.f.callback.length, d.f.render[e](j[c])))
                }, config: function () {
                    var a, b, c, e = d.d.getElementsByTagName("SCRIPT");
                    for (a = e.length - 1; a > -1; a -= 1)if (d.a.me && e[a] && e[a].src && e[a].src.match(d.a.me)) {
                        for (b = 0; b < d.a.configParam.length; b += 1)c = d.f.get(e[a], d.a.dataAttributePrefix + d.a.configParam[b]), c && (d.v.config[d.a.configParam[b]] = c);
                        d.f.kill(e[a])
                    }
                    "string" === typeof d.v.config.build && (d.w[d.v.config.build] = function (a) {
                        d.f.build(a)
                    }), d.w.setTimeout(function () {
                        var a = "&type=pidget&sub=" + d.v.config.domain + "&button_count=" + d.v.countButton + "&follow_count=" + d.v.countFollow + "&pin_count=" + d.v.countPin + "&profile_count=" + d.v.countProfile + "&board_count=" + d.v.countBoard;
                        d.f.log(a)
                    }, 1e3)
                }, log: function (a) {
                    var b = "?guid=" + d.v.guid;
                    a && (b += a), b = b + "&via=" + encodeURIComponent(d.v.here), d.f.call(d.a.endpoint.log + b, d.f.ping.log)
                }, langToDomain: function (a) {
                    var b, c, e, f, g, h, j, k;
                    a || (a = "en"), a = a.toLowerCase(), e = a.split("-"), b = e[0], 2 === e.length && (c = e[1]), h = d.a.defaults.domain, j = d.a.defaults.lang, stringMatch = d.a.defaults.strings, assetMatch = d.a.defaults.assets, k = !1;
                    for (f in d.a.domains)if (!k)for (g = d.a.domains[f], i = 0, n = g.lang.length; i < n; i += 1)if ((g.lang[i] === b || g.lang[i] === b + "-" + c) && (h = f, j = b, g.lang[i] === b + "-" + c)) {
                        j = b + "-" + c, k = !0;
                        break
                    }
                    return g = d.a.domains[h], g.assets && (assetMatch = g.assets), g.strings && d.a.strings[g.strings] && (stringMatch = g.strings), h = h.split(":")[0], {
                        lang: j,
                        domain: h,
                        strings: stringMatch,
                        assets: assetMatch
                    }
                }, init: function () {
                    if (d.d.b = d.d.getElementsByTagName("BODY")[0], d.d.b) {
                        d.d.h = d.d.getElementsByTagName("HEAD")[0], d.v = {
                            resolution: 1,
                            here: d.d.URL.split("#")[0],
                            hazFloatingButton: !1,
                            config: {color: "gray", assets: "en", height: "20", shape: "rect"},
                            strings: d.a.strings.en,
                            guid: "",
                            buttonId: 0,
                            userAgent: d.w.navigator.userAgent,
                            countButton: 0,
                            countFollow: 0,
                            countPin: 0,
                            countBoard: 0,
                            countProfile: 0
                        }, null !== d.v.userAgent.match(/MSIE/) && (d.v.hazIE = !0);
                        for (var a = 0; a < 12; a += 1)d.v.guid = d.v.guid + "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ_abcdefghijkmnopqrstuvwxyz".substr(Math.floor(60 * Math.random()), 1);
                        d.w.devicePixelRatio && d.w.devicePixelRatio >= 2 && (d.v.resolution = 2), d.f.config();
                        var b = d.a.defaults.lang;
                        if (d.v.config.lang && "object" === typeof d.a.strings[d.v.config.lang])b = d.v.config.lang; else {
                            var b = d.d.getElementsByTagName("HTML")[0].getAttribute("lang");
                            if (!b) {
                                var c = d.d.getElementsByTagName("META");
                                for (a = 0, n = c.length; a < n; a += 1) {
                                    var e = d.f.get(c[a], "http-equiv");
                                    if (e && (e = e.toLowerCase(), "content-language" === e)) {
                                        var f = d.f.get(c[a], "content");
                                        if (f) {
                                            b = f.split("-")[0];
                                            break
                                        }
                                    }
                                }
                            }
                        }
                        d.v.config.lang && (b = d.v.config.lang);
                        var g = d.f.langToDomain(b);
                        d.v.config.assets = g.assets, d.v.config.lang = g.lang, d.v.config.domain = g.domain, d.v.endpoint = {
                            pinterest: "//" + g.domain + ".pinterest.com",
                            repin: "//" + g.domain + ".pinterest.com/pin/%s/repin/x/",
                            create: "//" + g.domain + ".pinterest.com/pin/create/button/?"
                        }, d.f.build(), d.f.presentation(), d.f.behavior()
                    }
                }
            }
        }()
    };
    d.f.init()
}(window, document, {
    k: "PIN_" + (new Date).getTime(),
    myDomain: /^https?:\/\/(([a-z]{1,3})\.)?pinterest\.com\//,
    me: /pinit\.js$/,
    floatingButtonOffsetTop: 10,
    floatingButtonOffsetLeft: 10,
    endpoint: {
        bookmark: "https://assets.pinterest.com/js/pinmarklet.js",
        count: "https://widgets.pinterest.com/v1/urls/count.json",
        pin: "https://widgets.pinterest.com/v3/pidgets/pins/info/",
        board: "https://widgets.pinterest.com/v3/pidgets/boards/",
        user: "https://widgets.pinterest.com/v3/pidgets/users/",
        log: "https://log.pinterest.com/"
    },
    config: {pinItCountPosition: {none: !0, above: !0, beside: !0}},
    pinWidget: {
        domain: /(jp)/,
        lang: /(ja)/,
        imgKey: "237x",
        medium: {width: 345, ratio: 1.46},
        large: {width: 600, ratio: 2.54}
    },
    minImgSize: 119,
    countSource: 6,
    dataAttributePrefix: "data-pin-",
    configParam: ["build", "debug", "style", "hover", "zero", "color", "height", "lang", "shape"],
    pop: "status=no,resizable=yes,scrollbars=yes,personalbar=no,directories=no,location=no,toolbar=no,menubar=no,width=750,height=320,left=0,top=0",
    popLarge: "status=no,resizable=yes,scrollbars=yes,personalbar=no,directories=no,location=no,toolbar=no,menubar=no,width=900,height=500,left=0,top=0",
    popHuge: "status=no,resizable=yes,scrollbars=yes,personalbar=no,directories=no,location=no,toolbar=no,menubar=no,width=1040,height=640,left=0,top=0",
    cdn: {"https:": "https://s-passets.pinimg.com"},
    tile: {
        scale: {minWidth: 60, minHeight: 60, width: 92, height: 175},
        minWidthToShowAuxText: 150,
        minContentWidth: 120,
        minColumns: 1,
        maxColumns: 8,
        style: {margin: 2, padding: 10}
    },
    hazAssets: {en: !0, ja: !0},
    defaults: {domain: "www", strings: "en", lang: "en", assets: "en"},
    domains: {
        www: {lang: ["en"], strings: "en", assets: "en"},
        br: {lang: ["pt-br"], strings: "pt-br"},
        cz: {lang: ["cs"], strings: "cs"},
        de: {lang: ["de"], strings: "de"},
        dk: {lang: ["da"], strings: "da"},
        es: {lang: ["es"], strings: "es"},
        fi: {lang: ["fi"], strings: "fi"},
        fr: {lang: ["fr"], strings: "fr"},
        uk: {lang: ["en-uk", "en-gb", "en-ie"], strings: "en"},
        gr: {lang: ["el"], strings: "el"},
        hu: {lang: ["hu"], strings: "hu"},
        id: {lang: ["id", "in"], strings: "id"},
        "in": {lang: ["hi"], strings: "hi"},
        it: {lang: ["it"], strings: "it"},
        jp: {lang: ["ja"], strings: "ja", assets: "ja"},
        kr: {lang: ["ko", "kr"], strings: "ko"},
        "www:my": {lang: ["ms"], strings: "ms"},
        nl: {lang: ["nl"], strings: "nl"},
        no: {lang: ["nb"], strings: "nb"},
        "www:ph": {lang: ["tl"], strings: "tl"},
        pl: {lang: ["pl"], strings: "pl"},
        pt: {lang: ["pt"], strings: "pt"},
        ro: {lang: ["ro"], strings: "ro"},
        ru: {lang: ["ru"], strings: "ru"},
        sk: {lang: ["sk"], strings: "sk"},
        se: {lang: ["sv", "sv-se"], strings: "sv"},
        "www:th": {lang: ["th"], strings: "th"},
        tr: {lang: ["tr"], strings: "tr"},
        "www:ua": {lang: ["ua"], strings: "ua"},
        "www:vn": {lang: ["vi"], strings: "vi"}
    },
    strings: {
        cs: {seeOn: "Zobrazit na", attribTo: "od"},
        da: {seeOn: "Se p&#229;", attribTo: "af"},
        de: {seeOn: "Ansehen auf", attribTo: "von"},
        el: {
            seeOn: "&delta;&epsilon;&#943;&tau;&epsilon; &tau;&omicron; &sigma;&tau;&omicron;",
            attribTo: "&alpha;&pi;&omicron;&delta;&#943;&delta;&epsilon;&tau;&alpha;&iota; &sigma;&tau;&omicron;"
        },
        en: {seeOn: "See On", attribTo: "by"},
        "en-gb": {seeOn: "See On", attribTo: "by"},
        "en-uk": {seeOn: "See On", attribTo: "by"},
        es: {seeOn: "Ver En", attribTo: "por"},
        fi: {seeOn: "Katso palvelussa", attribTo: "tekij&#228;"},
        fr: {seeOn: "Voir sur", attribTo: "par"},
        hi: {
            seeOn: "&#2346;&#2352; &#2342;&#2375;&#2326;&#2375;&#2306;",
            attribTo: "&#2325;&#2379; &#2358;&#2381;&#2352;&#2375;&#2351; &#2342;&#2375;&#2344;&#2366;"
        },
        hu: {seeOn: "L&aacute;sd itt", attribTo: "Hozz&aacute;rendelve a k&ouml;vetkez&#337;h&ouml;z:"},
        id: {seeOn: "Lihat di", attribTo: "oleh"},
        it: {seeOn: "Visualizza in", attribTo: "da"},
        ko: {seeOn: "&#45796;&#51020;&#50640;&#49436; &#48372;&#44592;", attribTo: "&#51060; &#54592;&#54632;"},
        ja: {seeOn: "&#12391;&#35211;&#12427;", seeOnTextAfterLogo: !0, attribTo: ""},
        ms: {seeOn: "lihat di", attribTo: "attribut ke"},
        nb: {seeOn: "Vis p&#229;", attribTo: "av"},
        nl: {seeOn: "Bekijken op", attribTo: "door"},
        pl: {seeOn: "Zobacz na", attribTo: "przez"},
        pt: {seeOn: "Ver em", attribTo: "por"},
        "pt-br": {seeOn: "Ver em", attribTo: "por"},
        ro: {seeOn: "vezi pe", attribTo: "de la"},
        ru: {
            seeOn: "&#1055;&#1086;&#1089;&#1084;&#1086;&#1090;&#1088;&#1077;&#1090;&#1100; &#1074;",
            attribTo: "&#1087;&#1086;&#1083;&#1100;&#1079;&#1086;&#1074;&#1072;&#1090;&#1077;&#1083;&#1077;&#1084;"
        },
        tl: {seeOn: "tingnan sa", attribTo: ""},
        th: {
            seeOn: "&#3604;&#3641;&#3651;&#3609;",
            attribTo: "&#3648;&#3586;&#3637;&#3618;&#3609;&#3650;&#3604;&#3618;"
        },
        sk: {seeOn: "Zobrazi&#357; na", attribTo: "od"},
        sv: {seeOn: "Visa p&#229;", attribTo: "av"},
        tr: {seeOn: "&#220;zerinde g&#246;r", attribTo: "taraf&#305;ndan"},
        ua: {
            seeOn: "&#1076;&#1080;&#1074;&#1110;&#1090;&#1100;&#1089;&#1103; &#1085;&#1072;",
            attribTo: "&#1086;&#1087;&#1080;&#1089;"
        },
        vi: {seeOn: "xem tr&ecirc;n", attribTo: "&#273;&#432;a v&agrave;o"}
    },
    rules: ["a._pin_it_button_20 { cursor: pointer; background-repeat: none; background-size: 40px 60px; height: 20px; padding: 0; vertical-align: baseline; text-decoration: none; width: 40px; background-position: 0 -20px }", "a._pin_it_button_20:hover { background-position: 0 0px }", "a._pin_it_button_20:active, a._pin_it_button_20._hazClick { background-position: 0 -40px }", "a._pin_it_button_inline_20 { cursor: pointer; position: relative; display: inline-block; }", "a._pin_it_button_floating_20 { cursor: pointer; position: absolute; }", "a._pin_it_button_en_20_red { background-image: url(_cdn/images/pidgets/pinit_bg_en_rect_red_20__rez.png); }", "a._pin_it_button_en_20_white { background-image: url(_cdn/images/pidgets/pinit_bg_en_rect_white_20__rez.png); }", "a._pin_it_button_en_20_gray { background-image: url(_cdn/images/pidgets/pinit_bg_en_rect_gray_20__rez.png); }", "a._pin_it_button_ja_20_red { background-image: url(_cdn/images/pidgets/pinit_bg_ja_rect_red_20__rez.png); }", "a._pin_it_button_ja_20_white { background-image: url(_cdn/images/pidgets/pinit_bg_ja_rect_white_20__rez.png); }", "a._pin_it_button_ja_20_gray { background-image: url(_cdn/images/pidgets/pinit_bg_ja_rect_gray_20__rez.png); }", "a._pin_it_above_20 span._pin_it_button_count { background: transparent url(_cdn/images/pidgets/count_north_white_rect_20__rez.png) 0 0 no-repeat; background-size: 40px 29px; position: absolute; bottom: 21px; left: 0px; height: 29px; width: 40px; font: 12px Arial, Helvetica, sans-serif; line-height: 24px; text-indent: 0;}", "a._pin_it_button_20 span._pin_it_button_count { position: absolute; color: #777; text-align: center; text-indent: 0; }", "a._pin_it_beside_20 span._pin_it_button_count, a._pin_it_beside_20 span._pin_it_button_count i { background-color: transparent; background-repeat: no-repeat; background-image: url(_cdn/images/pidgets/count_east_white_rect_20__rez.png); }", "a._pin_it_beside_20 span._pin_it_button_count { padding: 0 3px 0 10px; background-size: 45px 20px; background-position: 0 0; position: absolute; top: 0; left: 41px; height: 20px; font: 10px Arial, Helvetica, sans-serif; line-height: 20px; }", "a._pin_it_beside_20 span._pin_it_button_count i { background-position: 100% 0; position: absolute; top: 0; right: -2px; height: 20px; width: 2px; }", "a._pin_it_button_20._pin_it_above { margin-top: 20px; }", "a._pin_it_above_20_pad { margin-top: 30px; }", "a._pin_it_beside_20_pad { margin-right: 45px; }", "a._pin_it_button_28 { cursor: pointer; background-repeat: none; background-size: 56px 84px; height: 28px; padding: 0; vertical-align: baseline; text-decoration: none; width: 56px; background-position: 0 -28px }", "a._pin_it_button_28:hover { background-position: 0 0px }", "a._pin_it_button_28:active, a._pin_it_button_28._hazClick { background-position: 0 -56px }", "a._pin_it_button_inline_28 { cursor: pointer; position: relative; display: inline-block; }", "a._pin_it_button_floating_28 { cursor: pointer; position: absolute; }", "a._pin_it_above_28_pad { margin-top: 38px;}", "a._pin_it_beside_28_pad { margin-right: 50px;}", "a._pin_it_button_en_28_red { background-image: url(_cdn/images/pidgets/pinit_bg_en_rect_red_28__rez.png); }", "a._pin_it_button_en_28_white { background-image: url(_cdn/images/pidgets/pinit_bg_en_rect_white_28__rez.png); }", "a._pin_it_button_en_28_gray { background-image: url(_cdn/images/pidgets/pinit_bg_en_rect_gray_28__rez.png); }", "a._pin_it_button_ja_28_red { background-image: url(_cdn/images/pidgets/pinit_bg_ja_rect_red_28__rez.png); }", "a._pin_it_button_ja_28_white { background-image: url(_cdn/images/pidgets/pinit_bg_ja_rect_white_28__rez.png); }", "a._pin_it_button_ja_28_gray { background-image: url(_cdn/images/pidgets/pinit_bg_ja_rect_gray_28__rez.png); }", "a._pin_it_button_en_16_red_round, a._pin_it_button_en_32_red_round { background-repeat: none; margin: 0; padding: 0; vertical-align: baseline; text-decoration: none; }", "a._pin_it_button_en_16_red_round { height: 16px; width: 16px; background-size: 16px 16px; background-image: url(_cdn/images/pidgets/pinit_bg_en_round_red_16__rez.png);}", "a._pin_it_button_en_32_red_round { height: 32px; width: 32px; background-size: 32px 32px; background-image: url(_cdn/images/pidgets/pinit_bg_en_round_red_32__rez.png);}", "a._pin_it_button_inline_en_16_red_round, a._pin_it_button_inline_en_32_red_round { position: relative; display: inline-block; }", "a._pin_it_button_floating_en_16_red_round, a._pin_it_button_floating_en_32_red_round  { position: absolute; }", "a._pin_it_button_28 span._pin_it_button_count { position: absolute; color: #777; text-align: center; text-indent: 0; }", "a._pin_it_above_28 span._pin_it_button_count { background: transparent url(_cdn/images/pidgets/count_north_white_rect_28__rez.png) 0 0 no-repeat; background-size: 56px 37px; position: absolute; bottom: 29px; left: 0px; height: 37px; width: 56px; font: 15px Arial, Helvetica, sans-serif; line-height: 28px; text-indent: 0;}", "a._pin_it_beside_28 span._pin_it_button_count, a._pin_it_beside_28 span._pin_it_button_count i { background-color: transparent; background-repeat: no-repeat; background-image: url(_cdn/images/pidgets/count_east_white_rect_28__rez.png); }", "a._pin_it_beside_28 span._pin_it_button_count { padding: 0 3px 0 10px; background-size: 63px 28px; background-position: 0 0; position: absolute; top: 0; left: 57px; height: 28px; font: 12px Arial, Helvetica, sans-serif; line-height: 28px; }", "a._pin_it_beside_28 span._pin_it_button_count i { background-position: 100% 0; position: absolute; top: 0; right: -2px; height: 28px; width: 2px; }", "a._pin_it_button_28._pin_it_above { margin-top: 28px; }", "a._follow_me_button, a._follow_me_button i { background-size: 200px 60px; background: transparent url(_cdn/images/pidgets/bfs_rez.png) 0 0 no-repeat }", 'a._follow_me_button { cursor: pointer; color: #444; display: inline-block; font: bold normal normal 11px/20px "Helvetica Neue",helvetica,arial,san-serif; height: 20px; margin: 0; padding: 0; position: relative; text-decoration: none; text-indent: 19px; vertical-align: baseline;}', "a._follow_me_button:hover { background-position: 0 -20px}", "a._follow_me_button:active  { background-position: 0 -40px}", "a._follow_me_button b { position: absolute; top: 3px; left: 3px; height: 14px; width: 14px; background-size: 14px 14px; background-image: url(_cdn/images/pidgets/log_rez.png); }", "a._follow_me_button i { position: absolute; top: 0; right: -4px; height: 20px; width: 4px; background-position: 100% 0px; }", "a._follow_me_button:hover i { background-position: 100% -20px;  }", "a._follow_me_button:active i { background-position: 100% -40px; }", "a._follow_me_button_28, a._follow_me_button_28 i { background-size: 400px 84px; background: transparent url(_cdn/images/pidgets/bft_rez.png) 0 0 no-repeat }", 'a._follow_me_button_28 { cursor: pointer; color: #444; display: inline-block; font: bold normal normal 13px/28px "Helvetica Neue",helvetica,arial,san-serif; height: 28px; margin: 0; padding: 0; position: relative; text-decoration: none; text-indent: 33px; vertical-align: baseline;}', "a._follow_me_button_28:hover { background-position: 0 -28px}", "a._follow_me_button_28:active  { background-position: 0 -56px}", "a._follow_me_button_28 b { position: absolute; top: 5px; left: 10px; height: 18px; width: 18px; background-size: 18px 18px; background-image: url(_cdn/images/pidgets/smt_rez.png); }", "a._follow_me_button_28 i { position: absolute; top: 0; right: -10px; height: 28px; width: 10px; background-position: 100% 0px; }", "a._follow_me_button_28:hover i { background-position: 100% -28px;  }", "a._follow_me_button_28:active i { background-position: 100% -56px; }", "span._embed_pin { -webkit-font-smoothing: antialiased; cursor: pointer; display: inline-block; text-align: center; overflow: hidden; vertical-align: top; width: 237px }", "span._embed_pin._medium { width: 345px; }", "span._embed_pin._large { width: 600px; }", "span._embed_pin img { border: 0; padding: 0; box-shadow: none; }", "span._embed_pin._fancy { background: #fff; box-shadow: 0 1px 3px rgba(0, 0, 0, .33); border-radius: 3px; }", "span._embed_pin a._embed_pin_link { display: block;  margin: 0 auto; padding: 0; position: relative;  line-height: 0}", "span._embed_pin img._embed_pin_link_img { border: 0; margin: 0; padding: 0; border-bottom: 1px solid rgba(0, 0, 0, .09);}", "span._embed_pin a._embed_pin_link i._repin { left: 12px; top: 12px; position: absolute; height: 20px; width: 40px; background-size: 40px 60px;  background: transparent url(_cdn/images/pidgets/pinit_bg_en_rect_red_20__rez.png) }", "span._embed_pin a._embed_pin_link i._repin_ja { left: 12px; top: 12px; position: absolute; height: 20px; width: 40px; background-size: 40px 60px; background: transparent url(_cdn/images/pidgets/pinit_bg_ja_rect_red_20__rez.png) }", "span._embed_pin a._embed_pin_link i._repin:hover, span._embed_pin a._embed_pin_link i._repin_ja:hover { background-position: 0 -20px; }", "span._embed_pin a._embed_pin_link i._repin._hazClick, span._embed_pin a._embed_pin_link i._repin_ja._hazClick { background-position: 0 -40px; }", 'span._embed_pin a._embed_pin_link i._play { display: block; width: 50px; white-space: pre; font-family: "Helvetica Neue",helvetica,arial,san-serif; font-weight: bold; font-style: normal; font-size: 9px; line-height: 12px; margin: 0; position: absolute; bottom: 12px; left: 12px; text-decoration: none; background: rgba(0, 0, 0, .4); color: rgba(255, 255, 255, 1); border-radius: 13px; padding: 5px 0; box-shadow: 0 0 2px rgba(0, 0, 0, .2); border: 2px solid rgba(255, 255, 255, .68);}', "span._embed_pin a._embed_pin_link i._play:hover { background: rgba(0, 0, 0, .8); color: #fff; }", 'span._embed_pin span._embed_pin_desc { color: #363636; white-space: normal; border-bottom: 1px solid rgba(0, 0, 0, .09);; display: block; font-family: "Helvetica Neue", arial, sans-serif; font-size: 13px; line-height: 17px; padding: 12px; text-align: left; }', 'span._embed_pin span._embed_pin_attrib { color: #a8a8a8; font-family: "Helvetica Neue", sans-serif; font-size: 11px; line-height: 18px; margin-top: 12px; font-weight: bold; display: block;}', "span._embed_pin span._embed_pin_attrib img._embed_pin_attrib_icon { height: 16px; width: 16px; vertical-align: middle; padding: 0; margin: 0 5px 0 0; float: left;}", "span._embed_pin span._embed_pin_attrib a { color: #a8a8a8; text-decoration: none;}", "span._embed_pin span._embed_pin_stats { display: block; }", 'span._embed_pin span._embed_pin_stats span._embed_pin_stats_repin_count, span._embed_pin span._embed_pin_stats span._embed_pin_stats_like_count { display: inline-block; padding-left: 17px; padding-right: 10px; color: #a8a8a8; font-family: "Helvetica Neue", sans-serif; font-size: 11px; line-height: 12px; margin-top: 12px; font-weight: bold; }', "span._embed_pin span._embed_pin_stats span._embed_pin_stats_repin_count { background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAAAAABq7uO+AAAASklEQVQI10WNMQrAMBRCvf/Z3pQcImPplsIPdqhNXOSJqLxVtnWQsuUO9IM3cHlV8dSSDZQHAOPH2YA2FU+qtH7MRhaVh/xt/PQCEW6N4EV+CPEAAAAASUVORK5CYII=) 0 0 no-repeat; }", "span._embed_pin span._embed_pin_stats span._embed_pin_stats_like_count { background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAAAAAClR+AmAAAAUElEQVR4AT2HMQpFIQwEc/+zbXhFLBW8QUihIAT2E8Q/xe6M0Jv2zK7NKUcBzAlAjzjqtdZl4c8S2nOjMPS6BoWMr/wLVnAbYJs3mGMkXzx+OeRqUf5HHRoAAAAASUVORK5CYII=) 0 2px no-repeat; }", 'span._embed_pin span._embed_pin_text { padding: 12px; position: relative; text-decoration: none; display: block; font-weight: bold; color: #b7b7b7; font-family: "Helvetica Neue", arial, sans-serif; font-size: 11px; line-height: 14px; height: 30px; text-align: left; }', "span._embed_pin span._embed_pin_text img._embed_pin_text_avatar { border-radius: 15px; border: none; overflow: hidden; height: 30px; width: 30px; vertical-align: middle; margin: 0 8px 12px 0; float: left;}", "span._embed_pin span._embed_pin_text span._embed_pin_text_container_pinner, span._embed_pin a._embed_pin_text span._embed_pin_text_container_board { display: block; width: 175px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}", "span._embed_pin span._embed_pin_text span._embed_pin_text_container_pinner { color: #777;}", "span._embed_grid { display: inline-block; margin: 0; padding:10px 0; position: relative; text-align: center}", "span._embed_grid._fancy { background: #fff; box-shadow: 0 1px 3px rgba(0, 0, 0, .33); border-radius: 3px; }", "span._embed_grid span._embed_grid_hd { display: block; margin: 0 10px; padding: 0; height: 45px; position: relative;}", "span._embed_grid span._embed_grid_hd a._avatar { position: absolute; top: 0; left: 0; height: 36px; width: 36px; }", "span._embed_grid span._embed_grid_hd a._avatar img { position: relative; height: 36px; width: 36px; min-height: 36px; min-width: 36px; margin: 0; padding: 0; border-radius: 3px; border: none;}", "span._embed_grid span._embed_grid_hd a { text-decoration: none; border: none; background: transparent; cursor: pointer; white-space: nowrap; position: absolute; left: 44px; text-align: left; overflow: hidden; text-overflow: ellipsis; }", "span._embed_grid span._embed_grid_hd a:hover { text-decoration: none; background: inherit; }", "span._embed_grid span._embed_grid_hd a:active { text-decoration: none; background: inherit; }", "span._embed_grid span._embed_grid_hd a._embed_grid_first { top: 2px; font-family: helvetica, sans-serif; font-weight: bold; color:#333; font-size: 14px; line-height: 16px; }", "span._embed_grid span._embed_grid_hd a._embed_grid_second { bottom: 11px; font-family: helvetica, sans-serif; color:#8e8e8e; font-size: 12px; line-height: 14px; }", "span._embed_grid span._embed_grid_hd a._embed_grid_mid { top: 12px; font-family: helvetica, sans-serif; font-weight: bold; color:#333; font-size: 14px; line-height: 16px; }", "span._embed_grid span._embed_grid_bd { display:block; margin: 0 10px; border-radius: 2px; position: relative; overflow: hidden }", "span._embed_grid span._embed_grid_scrolling_okay { overflow: auto; }", "span._embed_grid span._embed_grid_bd span._embed_grid_ct { display:block; position: relative; overflow: hidden; }", "span._embed_grid span._embed_grid_bd a._embed_grid_th { cursor: pointer; display: inline-block; position: absolute; overflow: hidden; }", 'span._embed_grid span._embed_grid_bd a._embed_grid_th::before { position: absolute; content:""; z-index: 2; top: 0; left: 0; right: 0; bottom: 0; box-shadow: inset 0 0 2px #888; }', "span._embed_grid span._embed_grid_bd a._embed_grid_th img._embed_grid_img { border: none; margin-left: 0; margin-right: 0; margin-bottom: 0; padding: 0;position: absolute; top: 50%; left: 0; }", "a._embed_grid_ft { cursor: pointer; text-shadow: 0 1px #fff; display: block; text-align: center; border: 1px solid #ccc; margin: 10px 10px 0; height: 31px; line-height: 30px;border-radius: 2px; text-decoration: none; font-family: Helvetica; font-weight: bold; font-size: 13px; color: #746d6a; background: #f4f4f4 url(_cdn/images/pidgets/board_button_link.png) 0 0 repeat-x}", "a._embed_grid_ft:hover { text-decoration: none; background: #fefefe url(_cdn/images/pidgets/board_button_hover.png) 0 0 repeat-x}", "a._embed_grid_ft:active { text-decoration: none; background: #e4e4e4 url(_cdn/images/pidgets/board_button_active.png) 0 0 repeat-x}", "a._embed_grid_ft span._embed_grid_ft_logo { vertical-align: top; display: inline-block; margin-left: 2px; height: 30px; width: 66px; background: transparent url(_cdn/images/pidgets/board_button_logo.png) 50% 48% no-repeat; }", "._hidden { display:none; }"]
});
Pintu