var panoramicTour = {
    options: {
        realLocation: '',
        viewer: '',
        viewer2: '',
        // progress: '',
        // progressElement: '',
        vrMode: false,
        mainContainer: '',
        mainContainer2: '',
        controlBtn: '',

    },
    initDOMElements: function() {
        this.options.mainContainer = document.getElementById('left_canvas');
        this.options.mainContainer2 = document.getElementById('right_canvas');
        this.options.controlBtn = document.getElementById('js-control-btn');
        // var progressElement = document.getElementById('progress');
        this.options.controlBtn.addEventListener('click', this.changeMode.bind(this));
    },
    vrModeSettings: function() {
        this.options.vrMode = true;
    
        this.options.mainContainer.classList.add('half__screen');
        this.options.mainContainer2.classList.add('half__screen');
    
        this.options.viewer.enableControl(PANOLENS.Controls.DEVICEORIENTATION);
        this.options.viewer2.enableControl(PANOLENS.Controls.DEVICEORIENTATION);
    
        this.options.viewer.enableEffect(PANOLENS.Modes.NORMAL, false);
        this.options.viewer2.enableEffect(PANOLENS.Modes.NORMAL, false, true); // third parametr if you want just hide control point in vr mode
    
        this.options.viewer.onWindowResize();
        this.options.viewer2.onWindowResize();
    },
    
    fullScreenModeSettings: function() {
        this.options.vrMode = false;
    
        this.options.mainContainer.classList.remove('half__screen');
        this.options.mainContainer2.classList.remove('half__screen');
        this.options.mainContainer.classList.add('full__screen');
        this.options.mainContainer2.classList.add('hidden');
    
        this.options.viewer.enableControl(PANOLENS.Controls.ORBIT);
        this.options.viewer.enableEffect(PANOLENS.Modes.NORMAL, true);
        this.options.viewer.onWindowResize()
    
    },
    
    initViewerBlock: function() {
        var self = this;
        if (this.options.vrMode) {
            self.options.viewer = new PANOLENS.Viewer({
                container: self.options.mainContainer,
                controlButtons: [], // Buttons array in the control bar. Default to []
                cameraFov: 80,
            })
            self.options.viewer2 = new PANOLENS.Viewer({
                container: self.options.mainContainer2,
                controlButtons: [], // Buttons array in the control bar. Default to ['fullscreen', 'setting', 'video']
                cameraFov: 80,
            });
            self.options.viewer.add(left_eye_first_floor, left_eye_outside, left_eye_stairs_first, left_eye_second_floor, left_eye_stairs_second, left_eye_third_floor, left_eye_stairs_roof, left_eye_roof);
            self.options.viewer2.add(right_eye_first_floor, right_eye_outside, right_eye_stairs_first, right_eye_second_floor, right_eye_stairs_second, right_eye_third_floor, right_eye_stairs_roof, right_eye_roof);
            self.vrModeSettings()
        } else {
            self.options.viewer = new PANOLENS.Viewer({
                container: self.options.mainContainer,
                controlButtons: [], // Buttons array in the control bar. Default to []
                cameraFov: 80,
            })
            self.options.viewer.add(left_eye_first_floor, left_eye_outside, left_eye_stairs_first, left_eye_second_floor, left_eye_stairs_second, left_eye_third_floor, left_eye_stairs_roof, left_eye_roof);
            self.fullScreenModeSettings();
        }
    
    },
    
    initLeftEye: function() {
        // First Floor Left
        left_eye_first_floor = new PANOLENS.ImagePanorama('../img//left eye/left_eye_first_floor.jpg', 5000);
        // Outside
        left_eye_outside = new PANOLENS.ImagePanorama('../img/left eye/left_eye_outside.jpg', 5000);
        // first floor stairs
        left_eye_stairs_first = new PANOLENS.ImagePanorama('../img/left eye/left_eye_stairs_first.jpg', 5000);
        //second floor
        left_eye_second_floor = new PANOLENS.ImagePanorama('../img/left eye/left_eye_second_floor.jpg', 5000);
        // second floor stairs
        left_eye_stairs_second = new PANOLENS.ImagePanorama('../img/left eye/left_eye_stairs_second.jpg', 5000);
        // third floor 
        left_eye_third_floor = new PANOLENS.ImagePanorama('../img/left eye/left_eye_third_floor.jpg', 5000);
        // stairs_roof
        left_eye_stairs_roof = new PANOLENS.ImagePanorama('../img/left eye/left_eye_stairs_roof.jpg', 5000);
        // to roof
        left_eye_roof = new PANOLENS.ImagePanorama('../img/left eye/left_eye_roof.jpg', 5000); // can add callback like third param
    
        // First Floor links
        left_eye_first_floor.link(left_eye_outside, new THREE.Vector3(-4153, 308.28, -2750.55));
        left_eye_first_floor.link(left_eye_stairs_first, new THREE.Vector3(2957.36, 653.98, 3970.56));
        // Outside links
        left_eye_outside.link(left_eye_first_floor, new THREE.Vector3(4925.17, -427.11, -697.45));
        // first floor stairs links
        left_eye_stairs_first.link(left_eye_first_floor, new THREE.Vector3(2699.25, -2403.23, -3442.98));
        left_eye_stairs_first.link(left_eye_second_floor, new THREE.Vector3(4507.97, 1570.49, -1481.30));
        //second floor links
        left_eye_second_floor.link(left_eye_stairs_first, new THREE.Vector3(-3912.42, -1768.61, 2543.31));
        left_eye_second_floor.link(left_eye_stairs_second, new THREE.Vector3(-4785.72, 867.81, -1128.24));
        // second floor stairs links
        left_eye_stairs_second.link(left_eye_second_floor, new THREE.Vector3(2094.73, -1499.95, -4276.61));
        left_eye_stairs_second.link(left_eye_third_floor, new THREE.Vector3(4536.94, 1895.64, -885.60));
        // third floor links
        left_eye_third_floor.link(left_eye_second_floor, new THREE.Vector3(-796.13, -621.81, -4886.24));
        left_eye_third_floor.link(left_eye_stairs_roof, new THREE.Vector3(-4541.98, -827.48, 1904.12));
        // third floor links
        left_eye_stairs_roof.link(left_eye_third_floor, new THREE.Vector3(-3432.11, -3604.12, 426.58));
        left_eye_stairs_roof.link(left_eye_roof, new THREE.Vector3(4128.94, 1003.26, 2616.30));
        // roof
        left_eye_roof.link(left_eye_stairs_roof, new THREE.Vector3(678.29, -1297.35, 4771.17));
    
        this.initViewerBlock();
    },

    initTwoEyes: function() {
        // Outside
        right_eye_outside = new PANOLENS.ImagePanorama('../img/right eye/right_eye_outside.jpg', 5000);
    
        // First Floor right
        right_eye_first_floor = new PANOLENS.ImagePanorama('../img/right eye/right_eye_first_floor.jpg', 5000);
    
        // first floor stairs
        right_eye_stairs_first = new PANOLENS.ImagePanorama('../img/right eye/right_eye_stairs_first.jpg', 5000);
        //second floor
        right_eye_second_floor = new PANOLENS.ImagePanorama('../img/right eye/right_eye_second_floor.jpg', 5000);
        // second floor stairs
        right_eye_stairs_second = new PANOLENS.ImagePanorama('../img/right eye/right_eye_stairs_second.jpg', 5000);
        // third floor 
        right_eye_third_floor = new PANOLENS.ImagePanorama('../img/right eye/right_eye_third_floor.jpg', 5000);
        // stairs_roof
        right_eye_stairs_roof = new PANOLENS.ImagePanorama('../img/right eye/right_eye_stairs_roof.jpg', 5000);
        // to roof
        right_eye_roof = new PANOLENS.ImagePanorama('../img/right eye/right_eye_roof.jpg', 5000);
    
        // First Floor links
        right_eye_first_floor.link(right_eye_outside, new THREE.Vector3(-4153, 308.28, -2750.55));
        right_eye_first_floor.link(right_eye_stairs_first, new THREE.Vector3(2957.36, 653.98, 3970.56));
        // Outside links
        right_eye_outside.link(right_eye_first_floor, new THREE.Vector3(4925.17, -427.11, -697.45));
        // first floor stairs links
        right_eye_stairs_first.link(right_eye_first_floor, new THREE.Vector3(2699.25, -2403.23, -3442.98));
        right_eye_stairs_first.link(right_eye_second_floor, new THREE.Vector3(4507.97, 1570.49, -1481.30));
        //second floor links
        right_eye_second_floor.link(right_eye_stairs_first, new THREE.Vector3(-3912.42, -1768.61, 2543.31));
        right_eye_second_floor.link(right_eye_stairs_second, new THREE.Vector3(-4785.72, 867.81, -1128.24));
        // second floor stairs links
        right_eye_stairs_second.link(right_eye_second_floor, new THREE.Vector3(2094.73, -1499.95, -4276.61));
        right_eye_stairs_second.link(right_eye_third_floor, new THREE.Vector3(4536.94, 1895.64, -885.60));
        // third floor links
        right_eye_third_floor.link(right_eye_second_floor, new THREE.Vector3(-796.13, -621.81, -4886.24));
        right_eye_third_floor.link(right_eye_stairs_roof, new THREE.Vector3(-4541.98, -827.48, 1904.12));
        // third floor links
        right_eye_stairs_roof.link(right_eye_third_floor, new THREE.Vector3(-3432.11, -3604.12, 426.58));
        right_eye_stairs_roof.link(right_eye_roof, new THREE.Vector3(4128.94, 1003.26, 2616.30));
        // roof
        right_eye_roof.link(right_eye_stairs_roof, new THREE.Vector3(678.29, -1297.35, 4771.17));
        this.initLeftEye();
    },
    // init images and links to them
    initView: function() {
    
        if (this.options.vrMode) {
            this.initTwoEyes();
    
        } else {
            this.initLeftEye();
        }
    
    },
    //change loaction and refresh page with new mode
    changeMode: function() {
        
        if (!this.options.vrMode) {
            window.location.href = this.options.realLocation + '?vrmode'
        } else {
            window.location.href = this.options.realLocation + '?fullscreenmode'
        }
    },

    // start function that get start mode and init all functions
    initScreenMode: function() {
        var self = this;
        this.initDOMElements()
        this.options.realLocation = window.location.origin;
        if (window.location.search == '?vrmode') {
            document.getElementById('vrmode__img').classList.add('hidden')
            document.getElementById('js-mobile__touchBLock').style.display = 'block';
            self.options.vrMode = true
            self.initView();
        } else if (window.location.search == '?fullscreenmode') {
            document.getElementById('panomode__img').classList.add('hidden')
            document.getElementById('js-mobile__touchBLock').style.display = 'none';
            self.options.vrMode = false;
            self.initView();
        } else {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                window.location.href = self.options.realLocation + '?vrmode'
            }
            else {
                window.location.href = self.options.realLocation + '?fullscreenmode'
            }
        }
    
    }

}




// function onEnter(event) {
//     console.log('onENTER!!!!!!!')
//     progressElement.style.width = 0;
//     progressElement.classList.remove('finish');

// }



// function onProgress(event) {
//     console.log('ON PROGRESSS!!!!!!!!!!!!!!')
//     document.getElementById('js-preloader').style.display = 'none';
//     progress = event.progress.loaded / event.progress.total * 100;
//     progressElement.style.width = progress + '%';
//     if (progress === 100) {
//         progressElement.classList.add('finish');
//     }

// }





