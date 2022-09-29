// Load Leaflet map

function initDemoMap() {

    // Old baselayers
    /*
    var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, ' +
        'NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    });
    var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    var Esri_DarkGreyCanvas = L.tileLayer(
        "https://{s}.sm.mapstack.stamen.com/" +
        "(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/" +
        "{z}/{x}/{y}.png",
        {
            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, ' +
            'NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
        }
    );

    */

    // New baselayers
    var Esri_DarkGreyCanvas = L.esri.basemapLayer('DarkGray')
    var Esri_WorldImagery = L.esri.basemapLayer('Imagery')
    var baseLayers = {
        "Grey Canvas": Esri_DarkGreyCanvas,
        "Satellite": Esri_WorldImagery,
    };

    // set map bounds
    //var corner1 = L.latLng(-89.98155760646617, -180.0),
    //corner2 = L.latLng(89.99346179538875, 180.0),
    var corner1 = L.latLng(30, -20),
        corner2 = L.latLng(45, 0),
        bounds = L.latLngBounds(corner1, corner2);

    var map = L.map('map', {
        layers: [Esri_DarkGreyCanvas],
        center: bounds.getCenter(),
        zoom: 7,
        minZoom: 3,
        maxZoom: 15,
        maxBounds: bounds,
        maxBoundsViscosity: 1
    });

    // layer control panal
    var layerControl = L.control.layers(baseLayers, null, { collapsed: false });
    layerControl.addTo(map);
    //map.setView([0, 0], 1);

    // idw-map
    var idw = L.idwLayer(temperature, {
        description: "temp",
        opacity: 0.3,
        cellSize: 5,
        exp: 3,
        grad: {
            0.0: 'black',
            0.1: '#0412da',
            0.2: '#2a62ff',
            0.3: '#8fddfe',
            0.4: '#88defc',
            0.5: '#e4fead',
            0.6: '#fceb00',
            0.7: '#ff9f07',
            0.8: '#f53b08',
            0.9: '#d60004'
        }
    })

    var idw2 = L.idwLayer(salinity, {
        description: "sali",
        opacity: 0.3,
        cellSize: 5,
        exp: 3,
        grad: {
            0.0: 'black',
            0.1: '#0412da',
            0.2: '#2a62ff',
            0.3: '#8fddfe',
            0.4: '#88defc',
            0.5: '#e4fead',
            0.6: '#fceb00',
            0.7: '#ff9f07',
            0.8: '#f53b08',
            0.9: '#d60004',
            1: '#7d0002'
        }
    })

    //idw.addTo(map);
    layerControl.addOverlay(idw, 'Temperature').addTo(map)
    layerControl.addOverlay(idw2, 'Salinity').addTo(map)
    //L.control.layers(overlays,null,{collapsed:false}).addTo(map);

    var legend = L.control({ position: 'bottomright' });
    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'legenda-temp'),
            colors = ['white', '#0412da', '#2a62ff', '#8fddfe', '#88defc', '#e4fead', '#fceb00', '#ff9f07', '#f53b08', '#d60004', '#7d0002'],
            grades = [0, 14.4, 14.7, 15, 15.3, 15.6, 15.9, 16.2, 16.5, 16.8, 17.4];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<div style="background:' + colors[i] + ' !important; float: left; width: 20px; heigth: 5px; margin-right: 5px;"> &nbsp; </div>' +
                '<span style="color: DarkGray;">' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '</span><br>' : '+');
        }

        return div;
    };

    legend.addTo(map);

    var legendSalinidade = L.control({ position: 'bottomright' });
    legendSalinidade.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'legenda-salinidade'),
            colors = ['white', '#0003ce', '#0412da', '#2a62ff', '#8fddfe', '#88defc', '#e4fead', '#fceb00', '#ff9f07', '#f53b08', '#d60004', '#7d0002'],
            grades = [0, 34.4, 34.6, 34.8, 35, 35.3, 35.5, 35.7, 35.9, 36.1, 36.3, 36.6];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<div style="background:' + colors[i] + ' !important; float: left; width: 20px; heigth: 5px; margin-right: 5px;"> &nbsp; </div>' +
                '<span style="color: DarkGray;">' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '</span><br>' : '+');
        }

        return div;
    };

    legendSalinidade.addTo(map);

    var dataSelect = L.control({ position: 'bottomcenter' });
    dataSelect.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'select-div');

        div.innerHTML = '<section id="main"><div class="slider clearfix">\n' +
            '    <input type="hidden" id="date-range-selector" name="DispenseROPTrigger" value="2" />\n' +
            '    <label data-value="2">Segunda-feira<br/>15/03/2021</label>\n' +
            '    <label data-value="3">Terça-feira<br/>16/03/2021</label>\n' +
            '    <label data-value="4">Quarta-feira<br/>17/03/2021</label>\n' +
            '    <label data-value="5">Quinta-feira<br/>18/03/2021</label>\n' +
            '    <label data-value="6">Sexta-feira<br/>19/03/2021</label>\n' +
            '    <label data-value="7">Sábado<br/>20/03/2021</label>\n' +
            '  </div></section>';

        return div;
    };

    dataSelect.addTo(map);

    return {
        map: map,
        layerControl: layerControl,
        idw: idw,
        idw2: idw2
    };

}

temperature = temperature15;
salinity = salinity15;

// leaflet-velocity layer
var mapStuff = initDemoMap();
var map = mapStuff.map;
var layerControl = mapStuff.layerControl;
var idw = mapStuff.idw;
var idw2 = mapStuff.idw2;

// load data (u, v grids) from somewhere (e.g. https://github.com/danwild/wind-js-server)
$.getJSON('data/netcdf/wind.json', function (data) {

    velocityLayer = L.velocityLayer({
        displayValues: true,
        displayOptions: {
            velocityType: 'Wind',
            displayPosition: 'bottomleft',
            displayEmptyString: 'No wind data'
        },
        data: data,
        maxVelocity: 10,
        // minVelocity:-0.1
    });

    layerControl.addOverlay(velocityLayer, 'Ocean currents');

    $('.legenda-temp').hide();
    $('.legenda-salinidade').hide();

});

function updateData(value) {
    if (value == 1) {
        temperature = temperature15;
        salinity = salinity15;
        wind = 'data/netcdf/wind.json';
    } else {
        if (value == 2) {
            temperature = temperature16;
            salinity = salinity16;
            wind = 'data/netcdf/wind16.json';
        } else {
            temperature = temperature17;
            salinity = salinity17;
            wind = 'data/netcdf/wind17.json';
        }
    }

    layerControl.removeLayer(idw);
    layerControl.removeLayer(idw2);
    layerControl.removeLayer(velocityLayer);

    map.eachLayer(function (layer) {
        if (layer.options.description == 'temp') {
            map.removeLayer(layer);
        }
        if (layer.options.description == 'sali') {
            map.removeLayer(layer);
        }
    });

    $('.info').hide();
    $('.legenda-salinidade').hide();

    idw = L.idwLayer(temperature, {
        description: "temp",
        opacity: 0.3,
        cellSize: 10,
        exp: 3,
        fast: false,
        grad: {
            0.0: 'black',
            0.1: '#0412da',
            0.2: '#2a62ff',
            0.3: '#8fddfe',
            0.4: '#88defc',
            0.5: '#e4fead',
            0.6: '#fceb00',
            0.7: '#ff9f07',
            0.8: '#f53b08',
            0.9: '#d60004'
        }
    });

    idw2 = L.idwLayer(salinity, {
        description: "sali",
        opacity: 0.3,
        cellSize: 10,
        exp: 3,
        fast: false,
        grad: {
            0.0: 'black',
            0.1: '#0412da',
            0.2: '#2a62ff',
            0.3: '#8fddfe',
            0.4: '#88defc',
            0.5: '#e4fead',
            0.6: '#fceb00',
            0.7: '#ff9f07',
            0.8: '#f53b08',
            0.9: '#d60004',
            1: '#7d0002'
        }
    });

    layerControl.addOverlay(idw, 'Temperature').addTo(map);
    layerControl.addOverlay(idw2, 'Salinity').addTo(map);

    $.getJSON(wind, function (data) {

        velocityLayer = L.velocityLayer({
            displayValues: true,
            displayOptions: {
                velocityType: 'Wind',
                displayPosition: 'bottomleft',
                displayEmptyString: 'No wind data'
            },
            data: data,
            maxVelocity: 10,
            // minVelocity:-0.1
        });

        layerControl.addOverlay(velocityLayer, 'Marine currents');

    });
}



function newFunction() {
    $('.select-div').css('font-size', '200px');
}

