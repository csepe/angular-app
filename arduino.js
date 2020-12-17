const five = require("johnny-five"),
    app = require('express')(),
    cors = require("cors"),
    http = require('http').Server(app),
    io = require('socket.io')(http, {
        cors: {
            origin: "http://localhost:4200",
            methods: ["GET", "POST"]
        }
    }),
    HttpsProxyAgent = require("https-proxy-agent")
port = process.env.PORT || 3000
let led, rgbLed, button, multi, lcd, board

const httpsAgent = new HttpsProxyAgent('http://cseszneki.peter:870717Piller7@fwsg.pillerkft.hu:8080')
const axios = require("axios").create({ httpsAgent });

app.use(cors())
app.get('/', (req, res) => {
    res.send('Hello World!')
})

io.on('connection', (socket) => {
    Object.keys(controlFunctions).forEach((controlFunction) => {
        socket.on(controlFunction, (msg) => {
            console.log(controlFunction, msg ? msg : '-')
            controlFunctions[controlFunction](msg)
        })
    })
})

http.listen(port, () => console.log('listening on *:' + port))
///////////////////////////////////////////


let controlFunctions = {
    stopNode: () => {
        process.exit(0)
    },
    startLed: () => {
        led.on()
    },
    blinkLed: () => {
        led.blink(500)
    },
    stopLed: () => {
        led.stop().off()
        rgbLed.stop().off()
    },
    rgbLedColor: (color) => {
        rgbLed.color(color)
    },
    rgbLedIntensity: (value) => {
        rgbLed.intensity(value)
    },
    lcdBlOn: () => {
        lcd.backlight()
    },
    lcdBlOff: () => {
        lcd.noBacklight()
    },
    lcdWrite: (value, value2) => {
        lcdTextPrintWrap(value, value2)
    }
}

function lcdTextPrintWrap(text, text2) {
    let row1, row2
    lcd.clear()
    if (!text2) {
        if (text.length < 16) {
            lcd.cursor(0, 0).print(text)
        } else {
            row1 = text.slice(0, 16), row2 = text.substring(16)
            lcd.cursor(0, 0).print(row1)
            lcd.cursor(1, 0).print(row2)
        }
    } else {
        lcd.cursor(0, 0).print(text)
        lcd.cursor(1, 0).print(text2)
    }
    lcd.cursor(1, 20)
}

initBoard()
function initBoard() {
    board = new five.Board({
        port: "COM3",
        repl: false
    })
    board.on('ready', () => {
        let f = controlFunctions
        lcd = new five.LCD({ controller: 'PCF8574T' })
        led = new five.Led(13)
        rgbLed = new five.Led.RGB([3, 5, 6])
        button = new five.Button(2)

        function soundSensor() {
            var mic = new five.Sensor({
                pin: "A0",
                freq: 200
            })
            mic.on('data', (value) => {
                io.emit('sound', value)
            })
        }

        function thermometer() {
            multi = new five.Multi({
                controller: "DHT11_I2C_NANO_BACKPACK",
                pin: 7
            })
            multi.on("change", function () {
                console.log("Thermometer")
                console.log("  celsius           : ", this.thermometer.celsius)
                console.log("  fahrenheit        : ", this.thermometer.fahrenheit)
                console.log("  kelvin            : ", this.thermometer.kelvin)
                console.log("--------------------------------------")
                console.log("Hygrometer")
                console.log("  relative humidity : ", this.hygrometer.relativeHumidity)
                console.log("--------------------------------------")
            })
        }

        const potentiometer = new five.Sensor('A3')
        rgbLed.intensity(50)
        let colors = spectrum(), buttonState = 'color'

        potentiometer.on('change', () => {
            const { value } = potentiometer
            let p = Math.min(Math.max(parseInt((99 - ((1023 - value) / 1023) * 100).toFixed(0)), 0), 99)
            if (value == null) p = 0
            if (buttonState == 'color') {
                rgbLed.color(colors[p])
            } else {
                rgbLed.intensity(p)
            }
        })

        function servo() {
            var servo = new five.Servo({
                pin: 10,
                type: "continuous"
            });
            // Clockwise, top speed.
            servo.sweep(1);
        }

        /*
        board.loop(100, () => {
            let c = colors[h]
            rgbLed.color(c)
            h = h == (colors.length - 1) ? 0 : h + 1
        })
        */

        button.on('down', () => {
            console.log('button')
            //rgbLed.toggle()
            //buttonState = (buttonState == 'color') ? 'intensity' : 'color'
            getCovidData()
        })
        getCovidData()
    })

    board.on('exit', () => {
        led.stop().off()
        rgbLed.stop().off()
    })

    board.on('fail', (event) => {
        console.log("%s sent a 'fail' message: %s", event.class, event.message)
        process.exit(1)
    })
}

function getCovidData() {
    axios.get('https://api.covid19api.com/country/hungary')
        .then(function (res) {
            let lastDay = res.data[res.data.length - 1],
                lastDay2 = res.data[res.data.length - 2],
                covidToday = {
                    daily: lastDay.Confirmed - lastDay2.Confirmed,
                    deaths: lastDay.Deaths - lastDay2.Deaths,
                    date: lastDay.Date
                }
                controlFunctions.lcdWrite('Napi eset: ' + covidToday.daily, 'Elhunyt: ' + covidToday.deaths)
            //console.log(covidToday)
        })
        .catch(function (error) {
            console.log('Err:')
            console.log(error)
            process.exit(1)
        })
}


function spectrum() {
    let colors = []
    function HSVtoRGB(h, s, v) {
        var r, g, b, i, f, p, q, t;
        if (arguments.length === 1) {
            s = h.s, v = h.v, h = h.h;
        }
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }

    function rainbow(p) {
        var rgb = HSVtoRGB(p / 100.0 * 0.85, 1.0, 1.0);
        return { red: rgb.r, green: rgb.g, blue: rgb.b }
        //'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
    }

    for (var i = 0; i < 100; i++) {
        colors.push(rainbow(i))
    }
    return colors
}