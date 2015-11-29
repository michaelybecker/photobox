function init(){scene=new THREE.Scene,renderer=new THREE.WebGLRenderer({antialias:!0}),renderer.setClearColor(16777215),renderer.setSize(500,500),$(".threecontainer").html(""),$(".threecontainer").append(renderer.domElement),camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,.5,1e3),camera.position.set(-20,0,0),scene.add(camera),controls=new THREE.OrbitControls(camera),lights=new THREE.AmbientLight(16777215,1),lights.position.set(0,20,30),scene.add(lights),cubeMats=[];for(var e=0;6>e;e++){var n=new THREE.TextureLoader;n.crossOrigin=!0;var r=n.load("https://crossorigin.me/"+photoURLs[e],function(e){var n=new THREE.MeshPhongMaterial({map:e});cubeMats.push(n)},function(e){console.log(e.loaded/e.total*100+"% loaded")},function(e){console.log("An error happened")})}var a=new THREE.MeshFaceMaterial(cubeMats);shape=new THREE.Mesh(new THREE.BoxGeometry(10,10,10),a),scene.add(shape),render()}function render(){requestAnimationFrame(render),renderer.render(scene,camera),shape.rotation.y+=.001,shape.rotation.x+=.003,shape.rotation.z+=.006,controls.update()}