modelUIDs = [
        "6fe5adad-d6e7-4b01-b2ec-64876b7fc26b", //fea
        "4b9151f1-6f88-4635-a28b-28ebce9a94bd", //VoiturePiston
        "d9279efa-2620-442b-98e5-e04061e4fd99" //01-2_engine
]

async function startViewer(modelName) {
        var viewer;
        let sessioninfo = await caasClient.getStreamingSession();
        await caasClient.enableStreamAccess(sessioninfo.sessionid, modelUIDs);
                
        viewer = new Communicator.WebViewer({
                containerId: "viewer-container",
                endpointUri: sessioninfo.endpointUri,
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
        let data = await caasClient.getHCVersion();
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