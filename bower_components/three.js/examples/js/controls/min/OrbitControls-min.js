!function(){function t(t){this.object=t,this.target=new THREE.Vector3,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-(1/0),this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.25;var e=this,n=1e-6,o,a,i=0,s=0,r=1,c=new THREE.Vector3,h=!1;this.getPolarAngle=function(){return a},this.getAzimuthalAngle=function(){return o},this.rotateLeft=function(t){s-=t},this.rotateUp=function(t){i-=t},this.panLeft=function(){var t=new THREE.Vector3;return function e(n){var o=this.object.matrix.elements;t.set(o[0],o[1],o[2]),t.multiplyScalar(-n),c.add(t)}}(),this.panUp=function(){var t=new THREE.Vector3;return function e(n){var o=this.object.matrix.elements;t.set(o[4],o[5],o[6]),t.multiplyScalar(n),c.add(t)}}(),this.pan=function(t,n,o,a){if(e.object instanceof THREE.PerspectiveCamera){var i=e.object.position,s=i.clone().sub(e.target),r=s.length();r*=Math.tan(e.object.fov/2*Math.PI/180),e.panLeft(2*t*r/a),e.panUp(2*n*r/a)}else e.object instanceof THREE.OrthographicCamera?(e.panLeft(t*(e.object.right-e.object.left)/o),e.panUp(n*(e.object.top-e.object.bottom)/a)):console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.")},this.dollyIn=function(t){e.object instanceof THREE.PerspectiveCamera?r/=t:e.object instanceof THREE.OrthographicCamera?(e.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom*t)),e.object.updateProjectionMatrix(),h=!0):console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.")},this.dollyOut=function(t){e.object instanceof THREE.PerspectiveCamera?r*=t:e.object instanceof THREE.OrthographicCamera?(e.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/t)),e.object.updateProjectionMatrix(),h=!0):console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.")},this.update=function(){var e=new THREE.Vector3,u=(new THREE.Quaternion).setFromUnitVectors(t.up,new THREE.Vector3(0,1,0)),m=u.clone().inverse(),l=new THREE.Vector3,d=new THREE.Quaternion;return function(){var t=this.object.position;e.copy(t).sub(this.target),e.applyQuaternion(u),o=Math.atan2(e.x,e.z),a=Math.atan2(Math.sqrt(e.x*e.x+e.z*e.z),e.y),o+=s,a+=i,o=Math.max(this.minAzimuthAngle,Math.min(this.maxAzimuthAngle,o)),a=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,a)),a=Math.max(n,Math.min(Math.PI-n,a));var p=e.length()*r;return p=Math.max(this.minDistance,Math.min(this.maxDistance,p)),this.target.add(c),e.x=p*Math.sin(a)*Math.sin(o),e.y=p*Math.cos(a),e.z=p*Math.sin(a)*Math.cos(o),e.applyQuaternion(m),t.copy(this.target).add(e),this.object.lookAt(this.target),this.enableDamping===!0?(s*=1-this.dampingFactor,i*=1-this.dampingFactor):(s=0,i=0),r=1,c.set(0,0,0),h||l.distanceToSquared(this.object.position)>n||8*(1-d.dot(this.object.quaternion))>n?(l.copy(this.object.position),d.copy(this.object.quaternion),h=!1,!0):!1}}()}THREE.OrbitControls=function(e,n){function o(t,e){var n=E.domElement===document?E.domElement.body:E.domElement;p.pan(t,e,n.clientWidth,n.clientHeight)}function a(){return 2*Math.PI/60/60*E.autoRotateSpeed}function i(){return Math.pow(.95,E.zoomSpeed)}function s(t){if(E.enabled!==!1){if(t.preventDefault(),t.button===E.mouseButtons.ORBIT){if(E.enableRotate===!1)return;A=P.ROTATE,b.set(t.clientX,t.clientY)}else if(t.button===E.mouseButtons.ZOOM){if(E.enableZoom===!1)return;A=P.DOLLY,y.set(t.clientX,t.clientY)}else if(t.button===E.mouseButtons.PAN){if(E.enablePan===!1)return;A=P.PAN,T.set(t.clientX,t.clientY)}A!==P.NONE&&(document.addEventListener("mousemove",r,!1),document.addEventListener("mouseup",c,!1),E.dispatchEvent(M))}}function r(t){if(E.enabled!==!1){t.preventDefault();var e=E.domElement===document?E.domElement.body:E.domElement;if(A===P.ROTATE){if(E.enableRotate===!1)return;g.set(t.clientX,t.clientY),f.subVectors(g,b),p.rotateLeft(2*Math.PI*f.x/e.clientWidth*E.rotateSpeed),p.rotateUp(2*Math.PI*f.y/e.clientHeight*E.rotateSpeed),b.copy(g)}else if(A===P.DOLLY){if(E.enableZoom===!1)return;v.set(t.clientX,t.clientY),H.subVectors(v,y),H.y>0?p.dollyIn(i()):H.y<0&&p.dollyOut(i()),y.copy(v)}else if(A===P.PAN){if(E.enablePan===!1)return;R.set(t.clientX,t.clientY),O.subVectors(R,T),o(O.x,O.y),T.copy(R)}A!==P.NONE&&E.update()}}function c(){E.enabled!==!1&&(document.removeEventListener("mousemove",r,!1),document.removeEventListener("mouseup",c,!1),E.dispatchEvent(j),A=P.NONE)}function h(t){if(E.enabled!==!1&&E.enableKeys!==!1&&E.enablePan!==!1)switch(t.keyCode){case E.keys.UP:o(0,E.keyPanSpeed),E.update();break;case E.keys.BOTTOM:o(0,-E.keyPanSpeed),E.update();break;case E.keys.LEFT:o(E.keyPanSpeed,0),E.update();break;case E.keys.RIGHT:o(-E.keyPanSpeed,0),E.update()}}function u(t){if(E.enabled!==!1){switch(t.touches.length){case 1:if(E.enableRotate===!1)return;A=P.TOUCH_ROTATE,b.set(t.touches[0].pageX,t.touches[0].pageY);break;case 2:if(E.enableZoom===!1)return;A=P.TOUCH_DOLLY;var e=t.touches[0].pageX-t.touches[1].pageX,n=t.touches[0].pageY-t.touches[1].pageY,o=Math.sqrt(e*e+n*n);y.set(0,o);break;case 3:if(E.enablePan===!1)return;A=P.TOUCH_PAN,T.set(t.touches[0].pageX,t.touches[0].pageY);break;default:A=P.NONE}A!==P.NONE&&E.dispatchEvent(M)}}function m(t){if(E.enabled!==!1){t.preventDefault(),t.stopPropagation();var e=E.domElement===document?E.domElement.body:E.domElement;switch(t.touches.length){case 1:if(E.enableRotate===!1)return;if(A!==P.TOUCH_ROTATE)return;g.set(t.touches[0].pageX,t.touches[0].pageY),f.subVectors(g,b),p.rotateLeft(2*Math.PI*f.x/e.clientWidth*E.rotateSpeed),p.rotateUp(2*Math.PI*f.y/e.clientHeight*E.rotateSpeed),b.copy(g),E.update();break;case 2:if(E.enableZoom===!1)return;if(A!==P.TOUCH_DOLLY)return;var n=t.touches[0].pageX-t.touches[1].pageX,a=t.touches[0].pageY-t.touches[1].pageY,s=Math.sqrt(n*n+a*a);v.set(0,s),H.subVectors(v,y),H.y>0?p.dollyOut(i()):H.y<0&&p.dollyIn(i()),y.copy(v),E.update();break;case 3:if(E.enablePan===!1)return;if(A!==P.TOUCH_PAN)return;R.set(t.touches[0].pageX,t.touches[0].pageY),O.subVectors(R,T),o(O.x,O.y),T.copy(R),E.update();break;default:A=P.NONE}}}function l(){E.enabled!==!1&&(E.dispatchEvent(j),A=P.NONE)}function d(t){t.preventDefault()}var p=new t(e);this.domElement=void 0!==n?n:document,Object.defineProperty(this,"constraint",{get:function(){return p}}),this.getPolarAngle=function(){return p.getPolarAngle()},this.getAzimuthalAngle=function(){return p.getAzimuthalAngle()},this.enabled=!0,this.center=this.target,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.enableKeys=!0,this.keys={LEFT:37,UP:38,RIGHT:39,BOTTOM:40},this.mouseButtons={ORBIT:THREE.MOUSE.LEFT,ZOOM:THREE.MOUSE.MIDDLE,PAN:THREE.MOUSE.RIGHT};var E=this,b=new THREE.Vector2,g=new THREE.Vector2,f=new THREE.Vector2,T=new THREE.Vector2,R=new THREE.Vector2,O=new THREE.Vector2,y=new THREE.Vector2,v=new THREE.Vector2,H=new THREE.Vector2,P={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_DOLLY:4,TOUCH_PAN:5},A=P.NONE;this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom;var w={type:"change"},M={type:"start"},j={type:"end"};this.update=function(){this.autoRotate&&A===P.NONE&&p.rotateLeft(a()),p.update()===!0&&this.dispatchEvent(w)},this.reset=function(){A=P.NONE,this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(w),this.update()},this.dispose=function(){this.domElement.removeEventListener("contextmenu",d,!1),this.domElement.removeEventListener("mousedown",s,!1),this.domElement.removeEventListener("touchstart",u,!1),this.domElement.removeEventListener("touchend",l,!1),this.domElement.removeEventListener("touchmove",m,!1),document.removeEventListener("mousemove",r,!1),document.removeEventListener("mouseup",c,!1),window.removeEventListener("keydown",h,!1)},this.domElement.addEventListener("contextmenu",d,!1),this.domElement.addEventListener("mousedown",s,!1),this.domElement.addEventListener("touchstart",u,!1),this.domElement.addEventListener("touchend",l,!1),this.domElement.addEventListener("touchmove",m,!1),window.addEventListener("keydown",h,!1),this.update()},THREE.OrbitControls.prototype=Object.create(THREE.EventDispatcher.prototype),THREE.OrbitControls.prototype.constructor=THREE.OrbitControls,Object.defineProperties(THREE.OrbitControls.prototype,{object:{get:function(){return this.constraint.object}},target:{get:function(){return this.constraint.target},set:function(t){console.warn("THREE.OrbitControls: target is now immutable. Use target.set() instead."),this.constraint.target.copy(t)}},minDistance:{get:function(){return this.constraint.minDistance},set:function(t){this.constraint.minDistance=t}},maxDistance:{get:function(){return this.constraint.maxDistance},set:function(t){this.constraint.maxDistance=t}},minZoom:{get:function(){return this.constraint.minZoom},set:function(t){this.constraint.minZoom=t}},maxZoom:{get:function(){return this.constraint.maxZoom},set:function(t){this.constraint.maxZoom=t}},minPolarAngle:{get:function(){return this.constraint.minPolarAngle},set:function(t){this.constraint.minPolarAngle=t}},maxPolarAngle:{get:function(){return this.constraint.maxPolarAngle},set:function(t){this.constraint.maxPolarAngle=t}},minAzimuthAngle:{get:function(){return this.constraint.minAzimuthAngle},set:function(t){this.constraint.minAzimuthAngle=t}},maxAzimuthAngle:{get:function(){return this.constraint.maxAzimuthAngle},set:function(t){this.constraint.maxAzimuthAngle=t}},enableDamping:{get:function(){return this.constraint.enableDamping},set:function(t){this.constraint.enableDamping=t}},dampingFactor:{get:function(){return this.constraint.dampingFactor},set:function(t){this.constraint.dampingFactor=t}},noZoom:{get:function(){return console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."),!this.enableZoom},set:function(t){console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."),this.enableZoom=!t}},noRotate:{get:function(){return console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."),!this.enableRotate},set:function(t){console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."),this.enableRotate=!t}},noPan:{get:function(){return console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead."),!this.enablePan},set:function(t){console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead."),this.enablePan=!t}},noKeys:{get:function(){return console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."),!this.enableKeys},set:function(t){console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."),this.enableKeys=!t}},staticMoving:{get:function(){return console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."),!this.constraint.enableDamping},set:function(t){console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."),this.constraint.enableDamping=!t}},dynamicDampingFactor:{get:function(){return console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."),this.constraint.dampingFactor},set:function(t){console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."),this.constraint.dampingFactor=t}}})}();