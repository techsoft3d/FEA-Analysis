function enableFeaButton() {
    $("#feaButton").prop("disabled", false);
}

var feaDisabled = true;
function togglePiston() {
    viewer.getSelectionManager().clear();
    viewer.getModel().requestNodes(VOITURE_PISTONS);
    if (feaDisabled) {
        viewer.getModel().setNodesVisibility(DEFAULT_PISTONS, false);
        viewer.getModel().setNodesVisibility(VOITURE_PISTONS, true);
        viewer.getModel().setNodesTransparency(ENGINE_BLOCK, 0.5);
        $('#gradientLegend').css('visibility', 'visible');
        $('#feaButton').html('Disable FEA');
        feaDisabled = false;
    } else {
        viewer.getModel().setNodesVisibility(DEFAULT_PISTONS, true);
        viewer.getModel().setNodesVisibility(VOITURE_PISTONS, false);
        viewer.getModel().setNodesTransparency(ENGINE_BLOCK, 1);
        $('#gradientLegend').css('visibility', 'hidden');
        $('#feaButton').html('FEA');
        feaDisabled = true;
    }
}

// Notice: node ids may be dependent on HC release year
// current node ids are compatible with HC2018
var ENGINE_BLOCK = [4294967313];
var VOITURE_PISTONS = [
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27
];
var DEFAULT_PISTONS = [
    4294967324,
    4294967325,
    4294967326,
    4294967327,
    4294967328,
    4294967329,
    4294967330,
    4294967331
];
var INITIAL_VIEW = {
    "position": {
        "x": -530,
        "y": 141,
        "z": 602
    },
    "target": {
        "x": 5,
        "y": -53,
        "z": 39
    },
    "up": {
        "x": 0,
        "y": 1,
        "z": 0
    },
    "width": 800,
    "height": 800,
    "projection": 0,
    "nearLimit": 0,
    "cameraFlags": 0
};
