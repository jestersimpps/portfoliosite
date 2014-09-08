  
   var physic = {
       ApplyUnitaryVerletIntegration: function (item, ellapsedTime, gravity, pixelsPerMeter) {
            item.x = 2 * item.x - item.old_x; 
            item.y = 2 * item.y - item.old_y + gravity * ellapsedTime * ellapsedTime * pixelsPerMeter;
        },

        ApplyUnitaryDistanceRelaxation: function (item, from, targettedLength) {
            var dx = item.x - from.x;
            var dy = item.y - from.y;
            var dstFrom = Math.sqrt(dx * dx + dy * dy);

            if (dstFrom > targettedLength && dstFrom != 0 ) {
                item.x -= (dstFrom - targettedLength) * (dx / dstFrom) * 0.5;
                item.y -= (dstFrom - targettedLength) * (dy / dstFrom) * 0.5;
            }
        }
    };

    var mousedrop = {

    data: {
        fps: +60,
        intervalId: null,
        gravity: +20.5,
        pixelsPerMeter: +150
    },

    context: {
        canvas: null,
        drawingContext: null,
        size: { w: +0, h: +0 },
        center: { x: +0, y: +0 },
        mouse: { x: +0, y: +0 },
        mouseimage: null,
        stopped: false
    },


    DrawOverride: function () { throw "Not implemented"; },

    ThinkOverride: function () { throw "Not implemented"; },

    Step: function () {
        mousedrop.ThinkOverride();
        if (Math.abs(mousedrop.rope.coeff)>0.0001 || isNaN(mousedrop.rope.coeff)){
            mousedrop.DrawOverride();

        }else{
            mousedrop.Stop();
        }
    },

    StartOverride: function () { throw "Not implemented"; },

    Start: function () {
        mousedrop.StartOverride();

        mousedrop.data.intervalId = setInterval(mousedrop.Step, +1000 / mousedrop.data.fps);
    },

    Stop: function () {
        clearInterval(mousedrop.data.intervalId);
    },

    Initialize: function (canvasid, picture) {

        mousedrop.context.canvas = document.getElementById(canvasid);

        mousedrop.context.canvas.width = 300;
        mousedrop.context.canvas.height = windowheight;
        mousedrop.context.size.w = 300;
        mousedrop.context.size.h = windowheight;
        mousedrop.context.drawingContext = mousedrop.context.canvas.getContext("2d");
        mousedrop.context.center.x = mousedrop.context.size.w * 0.5;
        mousedrop.context.center.y = mousedrop.context.size.h * +0;
        mousedrop.context.mouseimage = new Image();
        mousedrop.context.mouseimage.src = picture; //'img/mousefall.jpg';

            mousedrop.context.mouseimage.onload = function(){
            mousedrop.Start();
            };
            
    }
}

mousedrop.rope = {
    items: [],
    nbItems: 53,
    length: +windowheight/2,
    relaxationIterations: +12,
    coeff:+1,
    state: false,
    oldCoeff: null
};

mousedrop.DrawOverride = function () {

    mousedrop.context.drawingContext.clearRect(0, 0, mousedrop.context.size.w, mousedrop.context.size.h);  
    mousedrop.context.drawingContext.beginPath();

    for (var index in mousedrop.rope.items) {
        var item = mousedrop.rope.items[index];


        if (index == 0) {
            mousedrop.context.drawingContext.moveTo(item.x + mousedrop.context.center.x, item.y + mousedrop.context.center.y);
            
        } else if (item.isRope == true){
                mousedrop.context.drawingContext.lineTo(item.x + mousedrop.context.center.x, item.y + mousedrop.context.center.y);   
               
        }else if (item.isRope == false){

                var item0 = mousedrop.rope.items[index-18];
                mousedrop.rope.coeff = ((item.x + mousedrop.context.center.x)- (item0.x + mousedrop.context.center.x))/((item.y + mousedrop.context.center.y)-(item0.y + mousedrop.context.center.y));
                mousedrop.context.drawingContext.save();
                mousedrop.context.drawingContext.translate((item.x + mousedrop.context.center.x), (item.y + mousedrop.context.center.y));
                mousedrop.context.drawingContext.rotate(mousedrop.rope.coeff);           
                mousedrop.context.drawingContext.drawImage(mousedrop.context.mouseimage,-103,-10); 
                mousedrop.context.drawingContext.restore();
                
        }
    }
    var grad= mousedrop.context.drawingContext.createLinearGradient((mousedrop.context.size.w * 0.5)-10, 0, (mousedrop.context.size.w * 0.5)+20,0);
    grad.addColorStop(0, "#666666");
    grad.addColorStop(1, "#111111");

    mousedrop.context.drawingContext.strokeStyle = grad;
    mousedrop.context.drawingContext.lineWidth = 7;
    mousedrop.context.drawingContext.stroke();
    mousedrop.context.drawingContext.closePath();

};

mousedrop.ThinkOverride = function () {
    var itemLength = mousedrop.rope.length / mousedrop.rope.nbItems;
    var ellapsedTime = +1 / mousedrop.data.fps;

    // Apply verlet integration
    for (var index in mousedrop.rope.items) {
        var item = mousedrop.rope.items[index];

        var old_x = item.x;
        var old_y = item.y;

        if (!item.isPinned ) {
            physic.ApplyUnitaryVerletIntegration(item, ellapsedTime, mousedrop.data.gravity, mousedrop.data.pixelsPerMeter);
        }
        item.old_x = old_x;
        item.old_y = old_y;
    }

    // Apply relaxation
    for (var iterations = 0; iterations < mousedrop.rope.relaxationIterations; iterations++) {

        for (var index in mousedrop.rope.items) {
            var item = mousedrop.rope.items[index];

            if (!item.isPinned ) {
                if (index > +0) {
                    var previous = mousedrop.rope.items[+index - 1];
                    physic.ApplyUnitaryDistanceRelaxation(item, previous, item.segmentLength);
                }
            }
        }

        for (var index in mousedrop.rope.items) {
            var item = mousedrop.rope.items[mousedrop.rope.nbItems - 1 - index];

            if (!item.isPinned ) {
                if (index > 0) {
                    var next = mousedrop.rope.items[mousedrop.rope.nbItems - index];
                    physic.ApplyUnitaryDistanceRelaxation(item, next, item.segmentLength);
                }
            }
        }
    }

};

mousedrop.StartOverride = function () {

    mousedrop.rope.items = [];
    var i;
    for (i = 0; i < mousedrop.rope.nbItems; i++) {
        var x =  mousedrop.rope.length / mousedrop.rope.nbItems;
        mousedrop.rope.items[i] = {
            x: x+0.1,
            y: +0,
            segmentLength: x,
            isRope: true,
            old_x: x,
            old_y: +0,
            isPinned: false
        };
    }
    i = mousedrop.rope.nbItems-1;
    var x = mousedrop.rope.length / mousedrop.rope.nbItems;
        mousedrop.rope.items[i] = {
            x: x+0.1,
            y: +0,
            segmentLength: x,
            isRope: false,
            old_x: x,
            old_y: +0,
            isPinned: false

        };

    mousedrop.rope.items[0].isPinned = true;
};

window.onload = function () {
   // mousedrop.Initialize();
};
