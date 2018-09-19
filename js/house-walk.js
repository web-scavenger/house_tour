var panoramicTour = {
    options: {
        changeView: '',
        imageCount: 0,
    }
}

var left_eye_first_floor, right_eye_first_floor,
    left_eye_outside, right_eye_outside,
    left_eye_stairs_first, right_eye_stairs_first,
    left_eye_second_floor, right_eye_second_floor,
    left_eye_stairs_second, right_eye_stairs_second,
    left_eye_third_floor, right_eye_third_floor,
    left_eye_stairs_roof, right_eye_stairs_roof,
    left_eye_roof, right_eye_roof,
    viewer, viewer2, progress, progressElement;
var viewerArr = [];
var vrMode = false;
var mainContainer = document.getElementById('left_canvas');
var mainContainer2 = document.getElementById('right_canvas');
var controlBtn = document.getElementById('js-control-btn');
var progressElement = document.getElementById('progress');

function onEnter(event) {

    progressElement.style.width = 0;
    progressElement.classList.remove('finish');

}

controlBtn.addEventListener('click', changeMode);


function onProgress(event) {

    document.getElementById('js-preloader').style.display = 'none';
    progress = event.progress.loaded / event.progress.total * 100;
    progressElement.style.width = progress + '%';
    if (progress === 100) {
        progressElement.classList.add('finish');
    }

}

function vrModeSettings() {
    vrMode = true;
    initView()

    mainContainer.classList.add('half__screen');
    mainContainer2.classList.add('half__screen');
    
    // PANOLENS.Viewer.prototype.enableControl(1, viewer, viewer2 );
    // viewer2.raycasterPoint = viewer.raycasterPoint;
    
    viewer2.raycasterPoint = viewer.raycasterPoint;
    // viewer2.getCamera().rotation.set(viewer.getCamera().rotation);
    viewer2.update();
    viewer.enableControl(PANOLENS.Controls.DEVICEORIENTATION);
    viewer2.enableControl(PANOLENS.Controls.DEVICEORIENTATION);
    
    viewer.enableEffect(PANOLENS.Modes.NORMAL, false);
    viewer2.enableEffect(PANOLENS.Modes.NORMAL, false);
    // viewer2.raycasterPoint = viewer.raycasterPoint
    // PANOLENS.Viewer.prototype.enableControl(1, viewer, viewer2 );
    viewer.onWindowResize();
    viewer2.onWindowResize();
    
    // viewer.getCamera().rotation._x = 0;
    
    // viewer2.raycaster.setFromCamera(viewer.raycasterPoint, viewer2.getCamera())
    // console.log('rayCATS: ')
    // console.log(viewer.raycasterPoint)
    // console.log('rayCATS: ')
    // console.log(viewer2.raycasterPoint);
    // console.log('rotation:')
    // console.log(viewer.getCamera().rotation)
    // console.log('rotation:')
    // console.log(viewer2.getCamera().rotation)

}

function fullScreenModeSettings() {

    vrMode = false;
    
    initView()
    mainContainer.classList.remove('half__screen');
    mainContainer2.classList.remove('half__screen');
    mainContainer.classList.add('full__screen');
    mainContainer2.classList.add('hidden');

    viewer.enableControl(PANOLENS.Controls.ORBIT);
    viewer2.enableControl(PANOLENS.Controls.ORBIT);
    viewer.enableEffect(PANOLENS.Modes.NORMAL, true);
    viewer2.enableEffect(PANOLENS.Modes.NORMAL, true);
    viewer.onWindowResize()
    // PANOLENS.Viewer.prototype.enableControl(1, viewer, viewer2 );
}

function initView() {

    
    // First Floor Left
    left_eye_first_floor = new PANOLENS.ImagePanorama('../img//left eye/left_eye_first_floor.jpg', 5000, 1);


    // Outside
    left_eye_outside = new PANOLENS.ImagePanorama('../img/left eye/left_eye_outside.jpg', 5000, 2);
    right_eye_outside = new PANOLENS.ImagePanorama('../img/right eye/right_eye_outside.jpg', 5000, 3);

    // First Floor right
    right_eye_first_floor = new PANOLENS.ImagePanorama('../img/right eye/right_eye_first_floor.jpg', 5000, 4);

    // first floor stairs
    left_eye_stairs_first = new PANOLENS.ImagePanorama('../img/left eye/left_eye_stairs_first.jpg', 5000, 5);
    right_eye_stairs_first = new PANOLENS.ImagePanorama('../img/right eye/right_eye_stairs_first.jpg', 5000, 6);
    //second floor
    left_eye_second_floor = new PANOLENS.ImagePanorama('../img/left eye/left_eye_second_floor.jpg', 5000, 7);
    right_eye_second_floor = new PANOLENS.ImagePanorama('../img/right eye/right_eye_second_floor.jpg', 5000, 8);
    // second floor stairs
    left_eye_stairs_second = new PANOLENS.ImagePanorama('../img/left eye/left_eye_stairs_second.jpg', 5000, 9);
    right_eye_stairs_second = new PANOLENS.ImagePanorama('../img/right eye/right_eye_stairs_second.jpg', 5000, 10);
    // third floor 
    left_eye_third_floor = new PANOLENS.ImagePanorama('../img/left eye/left_eye_third_floor.jpg', 5000, 11);
    right_eye_third_floor = new PANOLENS.ImagePanorama('../img/right eye/right_eye_third_floor.jpg', 5000, 12);
    // stairs_roof
    left_eye_stairs_roof = new PANOLENS.ImagePanorama('../img/left eye/left_eye_stairs_roof.jpg', 5000, 13);
    right_eye_stairs_roof = new PANOLENS.ImagePanorama('../img/right eye/right_eye_stairs_roof.jpg', 5000, 14);
    // to roof
    left_eye_roof = new PANOLENS.ImagePanorama('../img/left eye/left_eye_roof.jpg', 5000, 15);
    right_eye_roof = new PANOLENS.ImagePanorama('../img/right eye/right_eye_roof.jpg', 5000, 16);

    // First Floor links
    left_eye_first_floor.link(left_eye_outside, new THREE.Vector3(-4153, 308.28, -2750.55));
    right_eye_first_floor.link(right_eye_outside, new THREE.Vector3(-4153, 308.28, -2750.55));
    left_eye_first_floor.link(left_eye_stairs_first, new THREE.Vector3(2957.36, 653.98, 3970.56));
    right_eye_first_floor.link(right_eye_stairs_first, new THREE.Vector3(2957.36, 653.98, 3970.56));

    // Outside links
    left_eye_outside.link(left_eye_first_floor, new THREE.Vector3(4925.17, -427.11, -697.45));
    right_eye_outside.link(right_eye_first_floor, new THREE.Vector3(4925.17, -427.11, -697.45));

    // first floor stairs links
    left_eye_stairs_first.link(left_eye_first_floor, new THREE.Vector3(2699.25, -2403.23, -3442.98));
    right_eye_stairs_first.link(right_eye_first_floor, new THREE.Vector3(2699.25, -2403.23, -3442.98));
    left_eye_stairs_first.link(left_eye_second_floor, new THREE.Vector3(4507.97, 1570.49, -1481.30));
    right_eye_stairs_first.link(right_eye_second_floor, new THREE.Vector3(4507.97, 1570.49, -1481.30));

    //second floor links
    left_eye_second_floor.link(left_eye_stairs_first, new THREE.Vector3(-3912.42, -1768.61, 2543.31));
    right_eye_second_floor.link(right_eye_stairs_first, new THREE.Vector3(-3912.42, -1768.61, 2543.31));
    left_eye_second_floor.link(left_eye_stairs_second, new THREE.Vector3(-4785.72, 867.81, -1128.24));
    right_eye_second_floor.link(right_eye_stairs_second, new THREE.Vector3(-4785.72, 867.81, -1128.24));

    // second floor stairs links
    left_eye_stairs_second.link(left_eye_second_floor, new THREE.Vector3(2094.73, -1499.95, -4276.61));
    right_eye_stairs_second.link(right_eye_second_floor, new THREE.Vector3(2094.73, -1499.95, -4276.61));
    left_eye_stairs_second.link(left_eye_third_floor, new THREE.Vector3(4536.94, 1895.64, -885.60));
    right_eye_stairs_second.link(right_eye_third_floor, new THREE.Vector3(4536.94, 1895.64, -885.60));

    // third floor links
    left_eye_third_floor.link(left_eye_second_floor, new THREE.Vector3(-796.13, -621.81, -4886.24));
    right_eye_third_floor.link(right_eye_second_floor, new THREE.Vector3(-796.13, -621.81, -4886.24));
    left_eye_third_floor.link(left_eye_stairs_roof, new THREE.Vector3(-4541.98, -827.48, 1904.12));
    right_eye_third_floor.link(right_eye_stairs_roof, new THREE.Vector3(-4541.98, -827.48, 1904.12));

    // third floor links
    left_eye_stairs_roof.link(left_eye_third_floor, new THREE.Vector3(-3432.11, -3604.12, 426.58));
    right_eye_stairs_roof.link(right_eye_third_floor, new THREE.Vector3(-3432.11, -3604.12, 426.58));
    left_eye_stairs_roof.link(left_eye_roof, new THREE.Vector3(4128.94, 1003.26, 2616.30));
    right_eye_stairs_roof.link(right_eye_roof, new THREE.Vector3(4128.94, 1003.26, 2616.30));

    // roof
    left_eye_roof.link(left_eye_stairs_roof, new THREE.Vector3(678.29, -1297.35, 4771.17));
    right_eye_roof.link(right_eye_stairs_roof, new THREE.Vector3(678.29, -1297.35, 4771.17));



    viewer = new PANOLENS.Viewer({
        container: mainContainer,
        // controlBar: false, 			// Vsibility of bottom control bar
        controlButtons: [], // Buttons array in the control bar. Default to []
        // horizontalView: true,
        // autoHideControlBar: true,
        cameraFov: 80,
        output: 'overlay'
    })
    viewer2 = new PANOLENS.Viewer({
        container: mainContainer2,
        controlButtons: [], // Buttons array in the control bar. Default to ['fullscreen', 'setting', 'video']
        // horizontalView: true,
        // autoHideControlBar: true,
        cameraFov: 80,
        output: 'overlay'
    });

    viewer.add(left_eye_first_floor, left_eye_outside, left_eye_stairs_first, left_eye_second_floor, left_eye_stairs_second, left_eye_third_floor, left_eye_stairs_roof, left_eye_roof);
    viewer2.add(right_eye_first_floor, right_eye_outside, right_eye_stairs_first, right_eye_second_floor, right_eye_stairs_second, right_eye_third_floor, right_eye_stairs_roof, right_eye_roof);
    // viewerArr.push(viewer);
    // viewerArr.push(viewer);
        
}
// initView();
initScreenMode();

//
function changeMode() {
    if (!vrMode) {
        vrModeSettings()
        document.getElementById('js-mobile__touchBLock').style.display = 'block';

    } else {
        fullScreenModeSettings()
        document.getElementById('js-mobile__touchBLock').style.display = 'none';
    }
}



function initScreenMode() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.getElementById('js-mobile__touchBLock').style.display = 'block';
        vrModeSettings()

    }
    else {
        fullScreenModeSettings()
    }
}

