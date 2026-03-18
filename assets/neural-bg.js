(function() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var canvas = document.getElementById('neural-net');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');

    var layers = [4, 6, 6, 5, 3];
    var nodes = [];
    var connections = [];
    var signals = [];
    var running = true;
    var raf = null;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        buildNetwork();
    }

    function buildNetwork() {
        nodes = [];
        connections = [];
        var w = canvas.width, h = canvas.height;
        var padX = w * 0.15, padY = h * 0.18;
        var layerSpacing = (w - padX * 2) / (layers.length - 1);

        for (var i = 0; i < layers.length; i++) {
            var count = layers[i];
            var nodeSpacing = (h - padY * 2) / (count - 1 || 1);
            var layerNodes = [];
            for (var j = 0; j < count; j++) {
                layerNodes.push({
                    x: padX + i * layerSpacing + (Math.random() - 0.5) * 8,
                    y: padY + j * nodeSpacing + (Math.random() - 0.5) * 6
                });
            }
            nodes.push(layerNodes);
        }

        for (var i = 0; i < nodes.length - 1; i++) {
            for (var a = 0; a < nodes[i].length; a++) {
                for (var b = 0; b < nodes[i + 1].length; b++) {
                    connections.push({ from: nodes[i][a], to: nodes[i + 1][b] });
                }
            }
        }
    }

    function spawnSignal() {
        if (signals.length > 10) return;
        var ci = Math.floor(Math.random() * connections.length);
        var c = connections[ci];
        signals.push({ from: c.from, to: c.to, t: 0, speed: 0.008 + Math.random() * 0.012 });
    }

    function draw() {
        if (!running) return;
        var w = canvas.width, h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        // connections
        ctx.lineWidth = 1;
        for (var i = 0; i < connections.length; i++) {
            var c = connections[i];
            ctx.strokeStyle = 'rgba(124,92,255,0.04)';
            ctx.beginPath();
            ctx.moveTo(c.from.x, c.from.y);
            ctx.lineTo(c.to.x, c.to.y);
            ctx.stroke();
        }

        // signals
        for (var i = signals.length - 1; i >= 0; i--) {
            var s = signals[i];
            s.t += s.speed;
            if (s.t >= 1) { signals.splice(i, 1); continue; }
            var x = s.from.x + (s.to.x - s.from.x) * s.t;
            var y = s.from.y + (s.to.y - s.from.y) * s.t;
            ctx.save();
            ctx.shadowColor = 'rgba(167,139,250,0.6)';
            ctx.shadowBlur = 6;
            ctx.fillStyle = 'rgba(167,139,250,0.6)';
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // nodes
        for (var i = 0; i < nodes.length; i++) {
            for (var j = 0; j < nodes[i].length; j++) {
                var n = nodes[i][j];
                ctx.save();
                ctx.shadowColor = 'rgba(124,92,255,0.5)';
                ctx.shadowBlur = 8;
                ctx.fillStyle = 'rgba(124,92,255,0.5)';
                ctx.beginPath();
                ctx.arc(n.x, n.y, 2.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        if (Math.random() < 0.08) spawnSignal();
        raf = requestAnimationFrame(draw);
    }

    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            running = false;
            if (raf) cancelAnimationFrame(raf);
        } else {
            running = true;
            draw();
        }
    });

    window.addEventListener('resize', resize);
    resize();
    draw();
})();
