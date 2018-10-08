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
        loadedPic: 0,
        loadedCount: 0,
        leftImageLoadedCount: 0,
        rightImageLoadedCount: 0,
        imgData: {},
        leftEyeArray: [],
        rightEyeArray: [],
        progressLoad: 0
    },
    initDOMElements: function () {
        this.options.mainContainer = document.getElementById('left_canvas');
        this.options.mainContainer2 = document.getElementById('right_canvas');
        this.options.controlBtn = document.getElementById('js-control-btn');

        this.options.controlBtn.addEventListener('click', this.changeMode.bind(this));
    },
    vrModeSettings: function () {
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

    fullScreenModeSettings: function () {
        this.options.vrMode = false;

        this.options.mainContainer.classList.remove('half__screen');
        this.options.mainContainer2.classList.remove('half__screen');
        this.options.mainContainer.classList.add('full__screen');
        this.options.mainContainer2.classList.add('hidden');

        this.options.viewer.enableControl(PANOLENS.Controls.ORBIT);
        this.options.viewer.enableEffect(PANOLENS.Modes.NORMAL, true);
        this.options.viewer.onWindowResize()

    },

    initViewerBlock: function () {
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
            self.options.leftEyeArray.forEach(function (element) {
                self.options.viewer.add(element)
            })
            self.options.rightEyeArray.forEach(function (element) {
                self.options.viewer2.add(element)
            })
            self.vrModeSettings()
        } else {
            self.options.viewer = new PANOLENS.Viewer({
                container: self.options.mainContainer,
                controlButtons: [], // Buttons array in the control bar. Default to []
                cameraFov: 70,
                // output: 'overlay'
            })
            self.options.leftEyeArray.forEach(function (element) {
                self.options.viewer.add(element)
                
            })
            
            self.fullScreenModeSettings();
        }

    },

    initImages: function (mode) {
        var eyeArray = [];
        var eyeLinksArr = [];
        var self = this;
        this.options.imgData.imageData.forEach(function (element) {
            if (mode == 'left') {

                var img = new PANOLENS.ImagePanorama(element.leftImageSrc, 5000)
                PANOLENS.Utils.TextureLoader.load(element.leftImageSrc, undefined, undefined, undefined, 'left');
            } else if(mode == 'right'){
                var img = new PANOLENS.ImagePanorama(element.rightImageSrc, 5000)
                PANOLENS.Utils.TextureLoader.load(element.rightImageSrc, undefined, undefined, undefined, 'right');
            }

            eyeArray[element.id] = img;
            eyeLinksArr[element.id] = element.room_links;
        })

        for (var i = 0; i < eyeArray.length; i++) {
            if (eyeLinksArr[i]) {
                for (var j = 0; j < eyeLinksArr[i].length; j++) {
                    var room_id = eyeLinksArr[i][j].room_id;
                    var room = eyeArray[room_id];
                    var x = eyeLinksArr[i][j].x;
                    var y = eyeLinksArr[i][j].y;
                    var z = eyeLinksArr[i][j].z;
                    eyeArray[i].link(room, new THREE.Vector3(x, y, z))
                }
            }
        }
        return eyeArray;
    },

    initLeftEye: function () {
        var self = this;
        this.options.leftEyeArray = this.initImages('left');
        // panoleno has counter

        
        // console.log(this.options.leftImageLoadedCount)
        // if (this.options.leftImageLoadedCount ==  this.options.leftEyeArray.length) {
        //         setTimeout(function(){
        //             self.initViewerBlock();
        //         }, 1000)
            
        // }
    },

    initTwoEyes: function () {
        var self = this;
        this.options.rightEyeArray = this.initImages('right');
        this.options.leftEyeArray = this.initImages('left');
        // console.log(this.options.leftImageLoadedCount)
        // console.log(this.options.rightImageLoadedCount)
        // if (this.options.leftImageLoadedCount ==  this.options.leftEyeArray.length > 0 && this.options.rightImageLoadedCount ==  this.options.rightEyeArray.length) {
           
        //     setTimeout(function(){
        //         self.initViewerBlock();
        //     }, 100)
        // }

    },
    // init images and links to them
    initView: function () {

        if (this.options.vrMode) {
            this.initTwoEyes();

        } else {
            this.initLeftEye();
        }

    },
    //change loaction and refresh page with new mode
    changeMode: function () {

        if (!this.options.vrMode) {
            window.location.href = this.options.realLocation + '?vrmode'
        } else {
            window.location.href = this.options.realLocation + '?fullscreenmode'
        }
    },
    loadJSON: function (path, success, error) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    if (success)
                        success(JSON.parse(xhr.responseText));
                } else {
                    if (error)
                        error(xhr);
                }
            }
        };
        xhr.open("GET", path, true);
        xhr.send();
    },
    

    // start function that get start mode and init all functions
    initScreenMode: function () {
        var self = this;
        this.initDOMElements()
        this.options.realLocation = window.location.origin;
        
        if (window.location.search == '?vrmode') {
            window.scrollTo(0,1)
            self.options.loadedCount = 2
            document.getElementById('panomode__img').classList.add('vision');

            document.getElementById('js-mobile__touchBLock').style.display = 'block';
            self.options.vrMode = true;
            self.loadJSON('js/data.json',
                function (data) { self.options.imgData = data; self.initView(); },
                function (xhr) { console.error(xhr); }
            );

        } else if (window.location.search == '?fullscreenmode') {
            self.options.loadedCount = 1
            document.getElementById('vrmode__img').classList.add('vision')

            document.getElementById('js-mobile__touchBLock').style.display = 'none';
            self.options.vrMode = false;
            self.loadJSON('js/data.json',
                function (data) { self.options.imgData = data; self.initView(); },
                function (xhr) { console.error(xhr); }
            );
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





