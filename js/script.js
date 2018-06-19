$(document).ready(function() {
    var pages = [];
    for (var x = 0; x < 10; x++) {
        var p = $(".page--" + x);
        if (p.length) {
            pages[x] = p;
        }
        if (x > 1) {
            $(".page--" + x).remove();
        }
    }



let day = document.getElementById("days");
let hour = document.getElementById("hours");
let minute = document.getElementById("minutes");
let second = document.getElementById("seconds");
var i = 1;

function launchTimer() {
  if(i == 1){
    second.style.transform = 'rotateX(0deg)';
  }
  else if(i == -1){
    second.style.transform = 'rotateX(180deg)';
  }

  i *= -1
  console.log(day);
  let currentDate = (new Date()).getTime();
  var d = new Date();  
  let launchDate = (new Date(2018, 06, 19, 0)).getTime();
  
  let timerDifference = launchDate - currentDate;
  
  let seconds = Math.floor(timerDifference/1000);
  let minutes = Math.floor(seconds/60);
  let hours = Math.floor(minutes/60);
  let days = Math.floor(hours/24);
  

  day.innerText = days;
  hour.innerText = hours%24;
  minute.innerText = minutes%60;
  if(second.innerText != seconds%60){
    second.innerText = seconds%60;
  }
  
  
  setTimeout(launchTimer, 500);
  // day.style.opacity = 1;
}

launchTimer();



$(document).ready(function(){
    $('.page--0').mousemove(function(e){
          var y = e.pageY;
          var x = e.pageX;                    
          $('.head').css({'top':  60 - y / 400 + '%'}); 
          $('.head').css({'left': 1 - x / 800 + '%'});
          $('.start').css({'top':  70 - y / 400 + '%'}); 
          $('.start').css({'left': 0 - x / 800 + '%'});

    });
});





// var options = {
//   strings: ["<i>First</i> sentence.", "&amp; a second sentence."],
//   typeSpeed: 40
// }

// var typed = new Typed(".footer-effe", options);



    particlesJS('page--0-particles', {
        "particles": {
            "number": {
                "value": 50,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#dc5942"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.8,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 2,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "top",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": false,
                    "mode": "repulse"
                },
                "resize": false
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 50,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
    var s = skrollr.init({
        smoothScrolling: false,
        mobileDeceleration: 0.004
    });

    function make_result() {
        if ($(".result").length) {
            var dif = $(".result__holder").innerHeight() - $(".result").innerHeight();
            if (dif > 0) {
                $(".result__top").attr('data-1900', 'margin-top:0px;').attr('data-2100', 'margin-top:-' + dif + 'px;');
            }
        }
        var h = $(".contacts__inner").height() / 2;
        if (h > 0) {
            $(".contacts__inner").css("margin-top", "-" + h + "px");
        }
    }
    $.post("/en/promo/ajax/", $("#qs").serialize(), function(data) {
        for (var x in data.texts) {
            pages[x].find(".text").html(data.texts[x]);
        }
        if (data.animal) {
            $(".result__pic").addClass("result__pic--" + data.animal);
            $(".result__animal").html(data.animal_desc.name);
            $(".result__desc").html(data.animal_desc.desc);
            $(".result__share").html(data.animal_desc.share);
        }
    }, "json");
    $('body').on("click", ".choose", function(e) {
        e.preventDefault();
        var l = $(this);
        $("input[name='" + l.data("q") + "']").val(l.data("value"));
        $.post("/en/promo/ajax/", $("#qs").serialize(), function(data) {
            for (var x in data.texts) {
                pages[x].find(".text").html(data.texts[x]);
            }
            if (data.animal) {
                $(".result__pic").addClass("result__pic--" + data.animal);
                $(".result__animal").html(data.animal_desc.name);
                $(".result__desc").html(data.animal_desc.desc);
                $(".result__share").html(data.animal_desc.share);
            }
        }, "json");
        if (l.closest(".page--1").length) {
            $(".pages").append(pages[2]);
            $(".pages").append(pages[3]);
            $(".page--1 .page__chooses").animate({
                opacity: 0
            }, 500, function() {
                $(".page--1 .page__inner").animate({
                    opacity: 0
                }, 1000, function() {
                    $(".page--0").remove();
                    $(".page--1").remove();
                });
                $(".page--2").animate({
                    opacity: 1
                }, 1000, function() {
                    particlesJS('page--3-particles', {
                        "particles": {
                            "number": {
                                "value": 100,
                                "density": {
                                    "enable": true,
                                    "value_area": 800
                                }
                            },
                            "color": {
                                "value": "#d1d98d"
                            },
                            "shape": {
                                "type": "circle",
                                "stroke": {
                                    "width": 0,
                                    "color": "#000000"
                                },
                                "polygon": {
                                    "nb_sides": 5
                                },
                                "image": {
                                    "src": "img/github.svg",
                                    "width": 100,
                                    "height": 100
                                }
                            },
                            "opacity": {
                                "value": 0.8,
                                "random": true,
                                "anim": {
                                    "enable": false,
                                    "speed": 1,
                                    "opacity_min": 0.1,
                                    "sync": false
                                }
                            },
                            "size": {
                                "value": 2,
                                "random": true,
                                "anim": {
                                    "enable": false,
                                    "speed": 40,
                                    "size_min": 0.1,
                                    "sync": false
                                }
                            },
                            "line_linked": {
                                "enable": false,
                                "distance": 150,
                                "color": "#ffffff",
                                "opacity": 0.4,
                                "width": 1
                            },
                            "move": {
                                "enable": true,
                                "speed": 2,
                                "direction": "none",
                                "random": false,
                                "straight": false,
                                "out_mode": "out",
                                "bounce": false,
                                "attract": {
                                    "enable": false,
                                    "rotateX": 600,
                                    "rotateY": 1200
                                }
                            }
                        },
                        "interactivity": {
                            "detect_on": "canvas",
                            "events": {
                                "onhover": {
                                    "enable": false,
                                    "mode": "repulse"
                                },
                                "onclick": {
                                    "enable": false,
                                    "mode": "repulse"
                                },
                                "resize": true
                            },
                            "modes": {
                                "grab": {
                                    "distance": 400,
                                    "line_linked": {
                                        "opacity": 1
                                    }
                                },
                                "bubble": {
                                    "distance": 400,
                                    "size": 40,
                                    "duration": 2,
                                    "opacity": 8,
                                    "speed": 3
                                },
                                "repulse": {
                                    "distance": 50,
                                    "duration": 0.4
                                },
                                "push": {
                                    "particles_nb": 4
                                },
                                "remove": {
                                    "particles_nb": 2
                                }
                            }
                        },
                        "retina_detect": true
                    });
                    s.setScrollTop(0);
                    s.refresh();
                });
            });
        }
        if (l.closest(".page--3").length) {
            $(".pages").append(pages[4]);
            $(".pages").append(pages[5]);
            $(".page--3 .page__chooses").animate({
                opacity: 0
            }, 500, function() {
                $(".page--3 .page__inner").animate({
                    opacity: 0
                }, 1000, function() {
                    $(".page--2").remove();
                    $(".page--3").remove();
                });
                $(".page--4").animate({
                    opacity: 1
                }, 1000, function() {
                    s.setScrollTop(0);
                    s.refresh();
                });
            });
        }
        if (l.closest(".page--5").length) {
            $(".pages").append(pages[6]);
            $(".pages").append(pages[7]);
            $(".page--5 .page__chooses").animate({
                opacity: 0
            }, 500, function() {
                $(".page--5 .page__inner").animate({
                    opacity: 0
                }, 1000, function() {
                    $(".page--4").remove();
                    $(".page--5").remove();
                });
                $(".page--6").animate({
                    opacity: 1
                }, 1000, function() {
                    s.setScrollTop(0);
                    make_result();
                    s.refresh();
                });
            });
        }
    }).on("click", ".start", function(e) {
        e.preventDefault();
        s.animateTo(500);
    }).on("click", ".social--open", function(e) {
        e.preventDefault();
        yaCounter41057999.reachGoal('sharing');
        window.open($(this).attr("href"), "_blank", "height=540, width=560")
    }).on("click", ".about-link", function(e) {
        e.preventDefault();
        $(".page").remove();
        s.refresh();
        $(".contacts").css({
            opacity: 0,
            "z-index": "1000",
            "display": "block"
        }).animate({
            opacity: 1
        }, 500);
    }).on("click", ".result__next", function(e) {
        e.preventDefault();
        $(".pages").append(pages[8]);
        $(".page--7").animate({
            opacity: 0
        }, 500, function() {
            $(".page--6").remove();
            $(".page--7").remove();
        });
        $(".page--8").animate({
            opacity: 1
        }, 500, function() {
            s.setScrollTop(0);
            $(".contacts").attr('data-0', 'opacity:1;z-index:1;display:block;').attr('data-599', 'opacity:1;z-index:1;display:block;').attr('data-599', 'opacity:1;z-index:100;display:block;');
            make_result();
            s.refresh();
        });
    });
    $(window).resize(function() {
        make_result();
        s.refresh();
    });
});

particlesJS("particles-js", {
  particles: {
    number: { value: 40, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 2,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: "#ffffff",
      opacity: 0,
      width: 1
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true
});
var count_particles, stats, update;
stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = "absolute";
stats.domElement.style.left = "0px";
stats.domElement.style.top = "0px";
document.body.appendChild(stats.domElement);
count_particles = document.querySelector(".js-count-particles");
update = function() {
  stats.begin();
  stats.end();
  if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
    count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
  }
  requestAnimationFrame(update);
};
requestAnimationFrame(update);
