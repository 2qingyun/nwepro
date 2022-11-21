/*!
 * Bubble Cursor.js
 * - 90's cursors collection
 */

(function bubblesCursor() {
  
  var width = window.innerWidth;  //获取屏幕宽高一半
  var height = window.innerHeight;  
  var cursor = {x: width/2, y: width/2};  //屏幕宽高一半
  var particles = [];
  
  function init() {  //特效初始化
    bindEvents();
    loop();
  }
  
  // Bind events that are needed
  function bindEvents() {
    document.addEventListener('mousemove', onMouseMove); //鼠标移入，添加动画
    window.addEventListener('resize', onWindowResize);
  }
  
  function onWindowResize(e) {
    width = window.innerWidth;
    height = window.innerHeight;
  }
  
  function onTouchMove(e) {  //添加多个span动画
    if( e.touches.length > 0 ) {
      for( var i = 0; i < e.touches.length; i++ ) {
        addParticle(e.touches[i].clientX, e.touches[i].clientY);
      }
    }
  }
  
  function onMouseMove(e) {    //获取鼠标的位置
    cursor.x = e.clientX;   
    cursor.y = e.clientY;
    
    addParticle( cursor.x, cursor.y);
  }
  
  function addParticle(x, y) {   //将span绑定在鼠标的位置添加
    var particle = new Particle();
    particle.init(x, y);
    particles.push(particle);
  }
  
  function updateParticles() {  //循环让所有添加的span都绑定动画
    
    // Update
    for( var i = 0; i < particles.length; i++ ) {
      particles[i].update();
    }
    
    // Remove dead particles
    for( var i = particles.length - 1; i >= 0; i-- ) {  //循环取消所有的span动画效果
      if( particles[i].lifeSpan < 0 ) {
        particles[i].die();
        particles.splice(i, 1);
      }
    }
    
  }
  
  function loop() {
    requestAnimationFrame(loop);
    updateParticles();
  }
  
  /**
   * Particles
   */
  
  function Particle() {
	// 当前span对象
    this.lifeSpan = 250; //时间
    this.initialStyles ={   //定义span 的颜色和宽高
      "position": "absolute",
      "display": "block",
      "pointerEvents": "none",
      "z-index": "1000000000000",
      "width": "5px",
      "height": "5px",
      "background": "#ccc",
      "box-shadow": "-1px 0px #6badd3, 0px -1px #6badd3, 1px 0px #3a92c5, 0px 1px #3a92c5",
      "border-radius": "1px",
      "will-change": "transform"
    };
    // Init, and set properties
	//初始化位置
    this.init = function(x, y) {
      this.velocity = {
        x:  (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 10),
        y: (-.4 + (Math.random() * -1))
      };
      
      this.position = {x: x - 10, y: y - 10};

      this.element = document.createElement('span'); //创建span标签
      applyProperties(this.element, this.initialStyles); //给spa特效参数
      this.update();  //调用span动作方法
     var wrap =  document.querySelector('.wrap')
      // document.body.appendChild(this.element);  //向屏幕添加span
	  document.body.insertBefore(this.element,wrap)  //向屏幕添加span
    };
    
    this.update = function() {  //定义span在屏幕上的位置
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      
      // Update velocities      //span动起来
      this.velocity.x += (Math.random() < 0.5 ? -1 : 1) * 2 / 75;
      this.velocity.y -= Math.random() / 600;
      this.lifeSpan--;
      
      this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + ( 0.2 + (250 - this.lifeSpan) / 250) + ")";
    }
    
    this.die = function() {
      this.element.parentNode.removeChild(this.element);  //删除span
    }
  }
  
  /**
   * Utils
   */
  
  // Applies css `properties` to an element.
  function applyProperties( target, properties ) {
    for( var key in properties ) {
      target.style[ key ] = properties[ key ];
    }
  }
  
  init();
})();