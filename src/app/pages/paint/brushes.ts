// @ts-nocheck
export const brushes = [
    {
        group: 'Basics',
        brushes: [
            {
                name: 'Circles',
                options: {
                    lineWidth: 1
                },
                func: (e, scope) => {
                    scope.ctx.strokeStyle = scope.utils.hexToRGB(scope.currentColor, 0.1)
                    scope.ctx.shadowColor = 0
                    scope.ctx.shadowBlur = 0
                    scope.ctx.lineWidth = scope.lineWidth
                    scope.ctx.lineJoin = scope.ctx.lineCap = 'round'
                    scope.ctx.globalCompositeOperation = 'source-over'

                    var i, dx, dy, d, cx, cy, steps, step_delta;
                    dx = scope.currX - scope.prevX;
                    dy = scope.currY - scope.prevY;
                    d = Math.sqrt(dx * dx + dy * dy) * 2;
                    cx = Math.floor(scope.currX / 100) * 100 + 50;
                    cy = Math.floor(scope.currY / 100) * 100 + 50;
                    steps = Math.floor(Math.random() * 10);
                    step_delta = d / steps;
                    for (i = 0; i < steps; i++) {
                        scope.ctx.beginPath();
                        scope.ctx.arc(cx, cy, (steps - i) * step_delta, 0, Math.PI * 2, true);
                        scope.ctx.stroke();
                    }
                    //scope.prevX = scope.currX;
                    //scope.prevY = scope.currY;
                }
            },
            {
                name: 'Grid',
                options: {
                    lineWidth: 2
                },
                func: (e, scope) => {
                    scope.ctx.strokeStyle = scope.utils.hexToRGB(scope.currentColor, 0.01)
                    scope.ctx.shadowColor = 0
                    scope.ctx.shadowBlur = 0
                    scope.ctx.lineWidth = scope.lineWidth
                    scope.ctx.lineJoin = scope.ctx.lineCap = 'round'
                    scope.ctx.globalCompositeOperation = 'darker'

                    let cx = Math.round(scope.currX / 100) * 100,
                        cy = Math.round(scope.currY / 100) * 100,
                        dx = (cx - scope.currX) * 10,
                        dy = (cy - scope.currY) * 10
                    for (let i = 0; i < 50; i++) {
                        scope.ctx.beginPath();
                        scope.ctx.moveTo(cx, cy);
                        scope.ctx.quadraticCurveTo(scope.currX + Math.random() * dx, scope.currY + Math.random() * dy, cx, cy);
                        scope.ctx.stroke();
                    }
                }
            },
            {
                name: 'Pen',
                func: (e, scope) => {
                    scope.ctx.strokeStyle = scope.currentColor
                    scope.ctx.shadowColor = 0
                    scope.ctx.shadowBlur = 0
                    scope.ctx.lineWidth = scope.lineWidth
                    scope.ctx.lineJoin = scope.ctx.lineCap = 'round'

                    scope.ctx.beginPath()
                    scope.ctx.moveTo(scope.prevX, scope.prevY)
                    scope.ctx.lineTo(scope.currX, scope.currY)
                    scope.ctx.stroke()
                    scope.ctx.closePath()
                }
            },
            {
                name: 'Edge smoothing with shadows',
                func: (e, scope) => {
                    scope.ctx.strokeStyle = scope.currentColor
                    scope.ctx.shadowColor = scope.currentColor
                    scope.ctx.shadowBlur = 10
                    scope.ctx.lineWidth = scope.lineWidth
                    scope.ctx.lineJoin = scope.ctx.lineCap = 'round'

                    scope.ctx.moveTo(e.clientX, e.clientY)
                    scope.ctx.lineTo(e.clientX, e.clientY)
                    scope.ctx.stroke()
                }
            },
            {
                name: 'Point-based approach',
                func: (e, scope) => {
                    scope.ctx.strokeStyle = scope.currentColor
                    scope.ctx.shadowColor = 0
                    scope.ctx.shadowBlur = 0
                    scope.ctx.lineWidth = scope.lineWidth
                    scope.ctx.lineJoin = scope.ctx.lineCap = 'round'

                    scope.points.push({ x: scope.currX, y: scope.currY })
                    scope.ctx.beginPath()
                    scope.ctx.moveTo(scope.points[0].x, scope.points[0].y)
                    for (var i = 1; i < scope.points.length; i++) {
                        scope.ctx.lineTo(scope.points[i].x, scope.points[i].y)
                    }
                    scope.ctx.stroke()
                }
            },
            {
                name: 'Point-based with shadow',
                func: (e, scope) => {
                    scope.ctx.strokeStyle = scope.currentColor
                    scope.ctx.shadowColor = scope.currentColor
                    scope.ctx.shadowBlur = 10
                    scope.ctx.lineWidth = scope.lineWidth
                    scope.ctx.lineJoin = scope.ctx.lineCap = 'round'

                    scope.points.push({ x: scope.currX, y: scope.currY })
                    scope.ctx.beginPath()
                    scope.ctx.moveTo(scope.points[0].x, scope.points[0].y)
                    for (var i = 1; i < scope.points.length; i++) {
                        scope.ctx.lineTo(scope.points[i].x, scope.points[i].y)
                    }
                    scope.ctx.stroke()
                },
            },
            {
                name: 'Edge smoothing with radial gradient',
                func: (e, scope) => {
                    scope.ctx.strokeStyle = scope.currentColor
                    scope.ctx.shadowColor = 0
                    scope.ctx.shadowBlur = 0
                    scope.ctx.lineWidth = scope.lineWidth
                    scope.ctx.lineJoin = scope.ctx.lineCap = 'round'

                    let currentPoint = { x: scope.currX, y: scope.currY },
                        dist = scope.utils.distanceBetween(scope.lastPoint, currentPoint),
                        angle = scope.utils.angleBetween(scope.lastPoint, currentPoint)
                    for (var i = 0; i < dist; i += 5) {
                        let x = scope.lastPoint.x + (Math.sin(angle) * i),
                            y = scope.lastPoint.y + (Math.cos(angle) * i),
                            radgrad = scope.ctx.createRadialGradient(x, y, scope.lineWidth / 4, x, y, scope.lineWidth / 2)
                        radgrad.addColorStop(0, scope.currentColor)
                        radgrad.addColorStop(0.5, scope.utils.hexToRGB(scope.currentColor, 0.5))
                        radgrad.addColorStop(1, scope.utils.hexToRGB(scope.currentColor, 0.0))
                        scope.ctx.fillStyle = radgrad
                        scope.ctx.fillRect(x - scope.lineWidth / 2, y - scope.lineWidth / 2, scope.lineWidth, scope.lineWidth)
                    }
                    scope.lastPoint = currentPoint
                }
            }
        ]
    },
    {
        group: 'Pattern-based brushes',
        brushes: [
            {
                name: 'Dots pattern',
                func: (e, scope) => {
                    scope.ctx.strokeStyle = scope.currentColor
                    scope.ctx.shadowColor = 0
                    scope.ctx.shadowBlur = 0
                    scope.ctx.lineWidth = scope.lineWidth
                    scope.ctx.lineJoin = scope.ctx.lineCap = 'round'
                    scope.ctx.strokeStyle = scope.ctx.createPattern(scope.utils.getPattern(scope.currentColor, 'dots'), 'repeat')

                    scope.points.push({ x: scope.currX, y: scope.currY })
                    let p1 = scope.points[0],
                        p2 = scope.points[1]
                    scope.ctx.beginPath()
                    scope.ctx.moveTo(p1.x, p1.y)
                    for (let i = 1, len = scope.points.length; i < len; i++) {
                        let midPoint = scope.utils.midPointBtw(p1, p2)
                        scope.ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y)
                        p1 = scope.points[i]
                        p2 = scope.points[i + 1]
                    }
                    scope.ctx.lineTo(p1.x, p1.y)
                    scope.ctx.stroke()
                }
            },
            {
                name: 'Lines pattern',
                func: (e, scope) => {
                    scope.ctx.strokeStyle = scope.currentColor
                    scope.ctx.shadowColor = 0
                    scope.ctx.shadowBlur = 0
                    scope.ctx.lineWidth = scope.lineWidth
                    scope.ctx.lineJoin = scope.ctx.lineCap = 'round'
                    scope.ctx.strokeStyle = scope.ctx.createPattern(scope.utils.getPattern(scope.currentColor, 'lines'), 'repeat')

                    scope.points.push({ x: scope.currX, y: scope.currY })
                    let p1 = scope.points[0],
                        p2 = scope.points[1]
                    scope.ctx.beginPath()
                    scope.ctx.moveTo(p1.x, p1.y)
                    for (let i = 1, len = scope.points.length; i < len; i++) {
                        let midPoint = scope.utils.midPointBtw(p1, p2)
                        scope.ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y)
                        p1 = scope.points[i]
                        p2 = scope.points[i + 1]
                    }
                    scope.ctx.lineTo(p1.x, p1.y)
                    scope.ctx.stroke()
                }
            },
            {
                name: 'Rainbow pattern',
                func: (e, scope) => {
                    scope.ctx.strokeStyle = scope.currentColor
                    scope.ctx.shadowColor = 0
                    scope.ctx.shadowBlur = 0
                    scope.ctx.lineWidth = scope.lineWidth
                    scope.ctx.lineJoin = scope.ctx.lineCap = 'round'
                    scope.ctx.strokeStyle = scope.ctx.createPattern(scope.utils.getPattern(scope.currentColor), 'repeat')

                    scope.points.push({ x: scope.currX, y: scope.currY })
                    let p1 = scope.points[0],
                        p2 = scope.points[1]
                    scope.ctx.beginPath()
                    scope.ctx.moveTo(p1.x, p1.y)
                    for (let i = 1, len = scope.points.length; i < len; i++) {
                        let midPoint = scope.utils.midPointBtw(p1, p2)
                        scope.ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y)
                        p1 = scope.points[i]
                        p2 = scope.points[i + 1]
                    }
                    scope.ctx.lineTo(p1.x, p1.y)
                    scope.ctx.stroke()
                }
            }
        ]
    },
    {
        group: 'Stamp-like',
        brushes: [
            {
                name: 'Colored pixels',
                func: (e, scope) => {
                    scope.ctx.strokeStyle = scope.currentColor
                    scope.ctx.shadowColor = 0
                    scope.ctx.shadowBlur = 0
                    scope.ctx.lineWidth = scope.lineWidth
                    scope.ctx.lineJoin = scope.ctx.lineCap = 'round'

                    for (var i = -10; i < 10; i += 4) {
                        for (var j = -10; j < 10; j += 4) {
                            if (Math.random() > 0.5) {
                                scope.ctx.fillStyle = ['red', 'orange', 'yellow', 'green',
                                    'light-blue', 'blue', 'purple'][scope.utils.getRandomInt(0, 6)];
                                scope.ctx.fillRect(e.clientX + i, e.clientY + j, 4, 4);
                            }
                        }
                    }
                    scope.lastPoint = { x: e.clientX, y: e.clientY };
                },
            },
            {
                name: 'Trail effect',
                func: (e, scope) => {
                    scope.ctx.strokeStyle = scope.utils.invertColor(scope.currentColor)
                    scope.ctx.fillStyle = scope.currentColor;
                    scope.ctx.shadowColor = 0
                    scope.ctx.shadowBlur = 0
                    scope.ctx.lineWidth = 1
                    scope.ctx.lineJoin = scope.ctx.lineCap = 'round'

                    let currentPoint = { x: e.clientX, y: e.clientY },
                        dist = scope.utils.distanceBetween(scope.lastPoint, currentPoint),
                        angle = scope.utils.angleBetween(scope.lastPoint, currentPoint)
                    for (let i = 0; i < dist; i += 5) {
                        let x = scope.lastPoint.x + (Math.sin(angle) * i) - 25,
                            y = scope.lastPoint.y + (Math.cos(angle) * i) - 25
                        scope.ctx.beginPath()
                        scope.ctx.arc(x + 10, y + 10, 20, false, Math.PI * 2, false)
                        scope.ctx.closePath()
                        scope.ctx.fill()
                        scope.ctx.stroke()
                    }
                    scope.lastPoint = currentPoint
                },
            }
        ]
    },
    {
        group: 'Brush, Fur, Pen',
        brushes: [
            {
                name: 'Brush',
                func: (e, scope) => {
                    scope.ctx.strokeStyle = scope.currentColor
                    scope.ctx.shadowColor = 0
                    scope.ctx.shadowBlur = 0
                    scope.ctx.lineWidth = scope.lineWidth
                    scope.ctx.lineJoin = scope.ctx.lineCap = 'round'

                    let currentPoint = { x: e.clientX, y: e.clientY },
                        dist = scope.utils.distanceBetween(scope.lastPoint, currentPoint),
                        angle = scope.utils.angleBetween(scope.lastPoint, currentPoint)
                    for (var i = 0; i < dist; i++) {
                        let x = scope.lastPoint.x + (Math.sin(angle) * i) - 25,
                            y = scope.lastPoint.y + (Math.cos(angle) * i) - 25
                        scope.ctx.drawImage(scope.img, x, y)
                    }
                    scope.lastPoint = currentPoint
                }
            },
            {
                name: 'Fur (rotating strokes)',
                func: (e, scope) => {
                    scope.ctx.strokeStyle = scope.currentColor
                    scope.ctx.shadowColor = 0
                    scope.ctx.shadowBlur = 0
                    scope.ctx.lineWidth = scope.lineWidth
                    scope.ctx.lineJoin = scope.ctx.lineCap = 'round'

                    let currentPoint = { x: e.clientX, y: e.clientY },
                        dist = scope.utils.distanceBetween(scope.lastPoint, currentPoint),
                        angle = scope.utils.angleBetween(scope.lastPoint, currentPoint)
                    for (let i = 0; i < dist; i++) {
                        let x = scope.lastPoint.x + (Math.sin(angle) * i),
                            y = scope.lastPoint.y + (Math.cos(angle) * i)
                        scope.ctx.save()
                        scope.ctx.translate(x, y)
                        scope.ctx.scale(0.5, 0.5)
                        scope.ctx.rotate(Math.PI * 180 / scope.utils.getRandomInt(0, 180))
                        scope.ctx.drawImage(scope.img, 0, 0)
                        scope.ctx.restore()
                    }
                    scope.lastPoint = currentPoint
                }
            }
        ]
    },
    {
        group: 'Spray',
        brushes: [
            {
                name: 'Neighbor points',
                func: (e, scope) => {
                    scope.ctx.strokeStyle = scope.utils.hexToRGB(scope.currentColor, 0.3)
                    scope.ctx.shadowColor = 0
                    scope.ctx.shadowBlur = 0
                    scope.ctx.lineWidth = scope.lineWidth
                    scope.ctx.lineJoin = scope.ctx.lineCap = 'round'

                    scope.points.push({ x: scope.currX, y: scope.currY })
                    scope.ctx.beginPath()
                    scope.ctx.moveTo(scope.points[scope.points.length - 2].x, scope.points[scope.points.length - 2].y)
                    scope.ctx.lineTo(scope.points[scope.points.length - 1].x, scope.points[scope.points.length - 1].y)
                    scope.ctx.stroke()

                    for (var i = 0, len = scope.points.length; i < len; i++) {
                        let dx = scope.points[i].x - scope.points[scope.points.length - 1].x,
                            dy = scope.points[i].y - scope.points[scope.points.length - 1].y,
                            d = dx * dx + dy * dy

                        if (d < 1000) {
                            scope.ctx.beginPath()
                            scope.ctx.moveTo(scope.points[scope.points.length - 1].x + (dx * 0.2), scope.points[scope.points.length - 1].y + (dy * 0.2))
                            scope.ctx.lineTo(scope.points[i].x - (dx * 0.2), scope.points[i].y - (dy * 0.2))
                            scope.ctx.stroke()
                        }
                    }
                }
            },
            {
                name: 'Fur via neighbor points',
                func: (e, scope) => {
                    scope.ctx.strokeStyle = scope.utils.hexToRGB(scope.currentColor, 0.3);
                    scope.ctx.shadowColor = 0
                    scope.ctx.shadowBlur = 0
                    scope.ctx.lineWidth = scope.lineWidth
                    scope.ctx.lineJoin = scope.ctx.lineCap = 'round'

                    scope.points.push({ x: scope.currX, y: scope.currY })
                    scope.ctx.beginPath()
                    scope.ctx.moveTo(scope.points[scope.points.length - 2].x, scope.points[scope.points.length - 2].y)
                    scope.ctx.lineTo(scope.points[scope.points.length - 1].x, scope.points[scope.points.length - 1].y)
                    scope.ctx.lineWidth = scope.lineWidth
                    scope.ctx.stroke()

                    for (var i = 0, len = scope.points.length; i < len; i++) {
                        let dx = scope.points[i].x - scope.points[scope.points.length - 1].x,
                            dy = scope.points[i].y - scope.points[scope.points.length - 1].y,
                            d = dx * dx + dy * dy

                        if (d < 2000 && Math.random() > d / 2000) {
                            scope.ctx.beginPath()
                            scope.ctx.moveTo(scope.points[scope.points.length - 1].x + (dx * 0.5), scope.points[scope.points.length - 1].y + (dy * 0.5))
                            scope.ctx.lineTo(scope.points[scope.points.length - 1].x - (dx * 0.5), scope.points[scope.points.length - 1].y - (dy * 0.5))
                            scope.ctx.stroke()
                        }
                    }
                }
            }
        ]
    },
]