modelUIDs = [
        "26b01832-cde1-49a8-b5f3-b372e7d3d852", //fea
        "51b118e4-dbe1-47f0-af44-4b43f4e79056", //VoiturePiston
        "a3d6ef8d-5356-4fa6-bede-f45158b3fe95" //01-2_engine
]

async function startViewer(modelName) {
        const conversionServiceURI = "https://csapi.techsoft3d.com";

        var viewer;

        let res = await fetch(conversionServiceURI + '/api/streamingSession');
        var data = await res.json();
        var endpointUriBeginning = 'ws://';

        if(conversionServiceURI.substring(0, 5).includes("https")){
                endpointUriBeginning = 'wss://'
        }

        await fetch(conversionServiceURI + '/api/enableStreamAccess/' + data.sessionid, { method: 'put', headers: { 'items': JSON.stringify(modelUIDs) } });

        viewer = new Communicator.WebViewer({
                containerId: "viewer-container",
                endpointUri: endpointUriBeginning + data.serverurl + ":" + data.port + '?token=' + data.sessionid,
                model: modelName,
                streamingMode: Communicator.StreamingMode.OnDemand,
                boundingPreviewMode: "none",
                enginePath: "https://cdn.jsdelivr.net/gh/techsoft3d/hoops-web-viewer",
                rendererType: 0
        });

        viewer.start();

        return viewer;

}

async function fetchVersionNumber() {
        const conversionServiceURI = "https://csapi.techsoft3d.com";

        let res = await fetch(conversionServiceURI + '/api/hcVersion');
        var data = await res.json();
        versionNumer = data;
        
        return data

}



async function initializeViewer() {
        viewer = await startViewer("fea")

        viewer.setCallbacks({
          sceneReady: function () {
            viewer.getView().setAmbientOcclusionEnabled(true);
            viewer.getView().setAmbientOcclusionRadius(0.02);
            // TODO: Re-enable when this no longer causes the viewer to crash
            //viewer.getModel().setEnableAutomaticUnitScaling(false);
          },
          modelStructureReady: function () {
            enableFeaButton();
            viewer.getModel().requestNodes([1]);
            viewer.getModel().setNodesVisibility([1], true);
            viewer.getView().getNavCube().disable();
            viewer.getView().getAxisTriad().disable();
            viewer
              .getView()
              .setCamera(Communicator.Camera.fromJson(INITIAL_VIEW));
          },
        });
    
        const uiConfig = {
          containerId: "content",
          screenConfiguration: Sample.screenConfiguration,
        };
        const ui = new Communicator.Ui.Desktop.DesktopUi(viewer, uiConfig);
    
        window.onresize = function () {
          viewer.resizeCanvas();
        };
}