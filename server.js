const express = require("express"),
    app = express(),
    { parse } = require("node-html-parser"),
    kmlToJson = require("./kmlToJson"),
    CacheService = require("./CacheService"),
    fs = require("fs"),
    cors = require("cors"),
    iconv = require("iconv-lite"),
    multer = require("multer"),
    path = require("path"),
    extract = require("extract-zip"),
    Jimp = require("jimp"),
    HttpsProxyAgent = require("https-proxy-agent")

const httpsAgent = new HttpsProxyAgent('http://cseszneki.peter:870717Piller7@fwsg.pillerkft.hu:8080')
const axios = require("axios").create({ httpsAgent });

app.use(express.json());
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(express.static("angular-app"));
app.use(express.static("angular-app/assets"));
app.use(cors());
//app.use("/favicon.ico", express.static("public/images/favicon.ico"));
let cacheService = new CacheService();

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, path.join(__dirname, "uploads"));
    },
    filename: (req, res, cb) => {
        cb(null, res.originalname);
    }
});
const upload = multer({ storage: storage }).single("data");

app.post("/api/upload", upload, (req, res) => {
    let url = "uploads/upload.zip";
    async function main() {
        try {
            await extract(url, { dir: __dirname });
            res.json({ msg: "Deploy complete" });
            console.log("Deploy complete");
        } catch (err) {
            res.json({ err: err });
            console.log(err);
        }
    }
    main();
});

app.get("/", (req, res) => {
    res.sendFile("angular-app/index.html", { root: __dirname });
});

app.get("/map", function (req, res) {
    res.sendFile("map.html", { root: __dirname });
});

app.get("/api", function (req, res) {
    let htmlOutput = `<h2>Routes</h2><ul>`;
    app._router.stack.forEach(route => {
        if (route.route && route.route.path) {
            htmlOutput =
                htmlOutput +
                `<li><a href="${route.route.path}">${route.route.path}</a></li>`;
        }
    });
    htmlOutput = htmlOutput.toString();
    res.set("Content-Type", "text/html");
    res.send(new Buffer.from(htmlOutput));
});

app.get("/api/getMapData/:mapId", (req, res) => {
    let options = {
        mapId: req.params.mapId,
        url:
            "https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=" +
            req.params.mapId,
        file: "data/" + req.params.mapId + ".json",
        middleCallback: data => kmlToJson.kmlToJson(data, options.mapId),
        callback: data => res.json(data)
    };

    cacheService.cacheAndServeFile(options);

    if (typeof options.mapId == "undefined") {
        res.json({ error: "No map ID" });
    }
});

app.get("/api/spotify", (req, res) => {
    let options = {
        mapId: req.params.mapId,
        caching: false,
        method: 'POST',
        url: "https://accounts.spotify.com/api/token?grant_type=client_credentials",
        file: "data/spotify.json",
        headers: {
            'Authorization': 'Basic Y2I0MDU5M2ZkYjQ3NGIyZWJkNTM5NjBkN2RhZTBiZDE6MGM4MzE4M2ExZDFmNGUwNTg5Mjk3ZjdkZjQ4MTk5Y2M='
        },
        middleCallback: null,
        callback: data => parseData(data)
    };

    cacheService.cacheAndServeFile(options)

    let parseData = token => {
        axios({
            method: "GET",
            url: 'https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj',
            headers: {
                'Authorization': 'Bearer ' + token.access_token
            }
        })
            .then(response => {
                res.json(response.data)
            })
            .catch(err => {
                res.json(err)
            });
    }
});


app.get("/api/getMapDataFromFile/:mapFile", (req, res) => {
    let url = req.params.mapFile,
        obj;

    fs.readFile(url, "utf8", function (err, data) {
        if (err) throw err;
        obj = kmlToJson.kmlToJson(data, null);
        res.json(obj);
    });
});

app.get("/api/reddit/:sub", (req, res) => {
    let sub = req.params.sub;
    let options = {
        url:
            "https://www.reddit.com/r/" + sub + "/top.json?sort=top&t=all&limit=50",
        file: "data/reddit_" + sub + ".json",
        middleCallback: data => parseData(data),
        callback: data => res.json(data)
    };

    cacheService.cacheAndServeFile(options);

    let parseData = data => {
        let json = [];
        data.data.children.forEach(elem => {
            let jsonEl = {
                title: elem.data.title,
                img: elem.data.url,
                url: elem.data.permalink,
                //img2: createImage(elem.data.url)
            };
            /*createImage(elem.data.url).then(img64 => {
                jsonEl.img2 = img64
            })*/
            json.push(jsonEl);
        });
        return json;
    };
});

app.get("/api/castleforsale", (req, res) => {
    let options = {
        url: "http://www.castleforsale.hu/",
        file: "data/castleforsale.json",
        middleCallback: data => parseData(data),
        callback: data => res.json(data)
    };

    cacheService.cacheAndServeFile(options);

    let parseData = data => {
        let root = parse(data),
            elems = root.querySelectorAll(".blokk"),
            json = [];

        elems.forEach(elem => {
            let jsonEl = {
                title: elem
                    .querySelector("h2")
                    .text.replace("»»", "")
                    .trim(),
                img:
                    options.url +
                    elem
                        .querySelector("img")
                        .getAttribute("src")
                        .trim(),
                desc: elem.querySelector("p").text.trim(),
                url:
                    options.url +
                    elem
                        .querySelector("a")
                        .getAttribute("href")
                        .trim()
            };
            json.push(jsonEl);
        });
        return json;
    };
});

app.get("/api/indexfuji", (req, res) => {
    let options = {
        url:
            "https://forum.index.hu/Search/showArticleResult?topic_id=9219213&aq_ext=1&aq_text=16mm%20f1.4",
        file: "data/indexfuji.json",
        responseType: "stream",
        cacheTime: 3600000 * 4,
        middleCallback: data => parseData(data),
        callback: data => res.json(data)
    };

    cacheService.cacheAndServeFile(options);

    let parseData = data =>
        new Promise(resolve => {
            data.pipe(iconv.decodeStream("win1250")).collect(function (err, html) {
                let root = parse(html),
                    elems = root.querySelectorAll(".art"),
                    json = [];

                elems.forEach(elem => {
                    let jsonEl = {
                        title: elem.querySelector(".art_t").text.trim(),
                        html: elem.querySelector(".art_t").outerHTML.trim(),
                        date: elem.querySelectorAll(".art_h_l a")[3].text.trim()
                    };
                    json.push(jsonEl);
                });
                resolve(json);
            });
        });
});

app.get("/api/urbface", (req, res) => {
    let url = "data/urbface.json",
        obj;
    fs.readFile(url, "utf8", function (err, data) {
        if (err) throw err;
        obj = data.replace(/(?:\r\n|\r|\n)/g, " ");
        obj = JSON.parse(obj);
        res.json(obj);
    });
});

app.get("/api/urbface/:ID", (req, res) => {
    let options = {
        url: "http://urbface.com/info.html?id=" + req.params.ID,
        file: "data/urbface_" + req.params.ID + ".json",
        res: res,
        id: req.params.ID,
        method: "post",
        postData: { id: req.params.ID },
        middleCallback: null,
        callback: data => res.json(data)
    };

    cacheService.cacheAndServeFile(options);
});

app.get("/api/mega", (req, res) => {
    /*let fileURL = "https://mega.nz/folder/CUFTHCwT#2-e8lR-g9Hx6FuBPrRHHUQ";
    fileURL = mega.file(fileURL);
    let htmlOutput = "",
        json = [];
        console.log(fileURL)
    fileURL.loadAttributes((error, file) => {
        
        let folders = file.children;

        folders.forEach((folder, i) => {
            let jsonItem = {};
            jsonItem.name = folder.name;
            jsonItem.files = [];
            jsonItem.links = [];
            folder.children.forEach(folderItem => {
                if (!folderItem.directory) {
                    folderItem.link(function (err, url) {
                        jsonItem.links.push(url);
                    });
                }
            });
            json.push(jsonItem);
        });
        res.json(json);
    });*/
});

app.route("/*").get(function (req, res) {
    res.sendFile("angular-app/index.html", { root: __dirname });
});

const listener = app.listen(4201, () => {
    console.log("Your app is listening on port " + listener.address().port);
});

if (process.env.PROJECT_DOMAIN) {
    setInterval(() => {
        axios
            .get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`)
            .then(response => { })
            .catch(err => {
                console.log(err);
            });
    }, 280000);
}

function simpleStringify(object) {
    var simpleObject = {};
    for (var prop in object) {
        if (!object.hasOwnProperty(prop)) {
            continue;
        }
        if (typeof object[prop] == "object") {
            continue;
        }
        if (typeof object[prop] == "function") {
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    return JSON.stringify(simpleObject);
}
