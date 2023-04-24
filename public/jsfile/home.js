// function to set the active dot
function Today() {
  const today = new Date();
  const day = today.toLocaleDateString('en-US', { weekday: 'long' });
  const month = today.toLocaleDateString('en-US', { month: 'long' });
  const date = today.getDate();
  const year = today.getFullYear();

  document.getElementById(
    'date'
  ).innerHTML = `${day}, ${month} ${date}, ${year}`;
}

// function check() {
//     var currentImg = $('.slider-img .active');
//     var imgNum = currentImg.index();
//     var dotNum = $('.dot').eq(imgNum);
//     dotNum.addClass('active').siblings().removeClass('active');

// }

//  function to set the silde show automatic
// var slideIndex = 0;

// function mySlider() {
//     var imgs = document.getElementsByClassName("item");
//     for (var i = 0; i < imgs.length; i++) {
//         imgs[i].classList.remove('active');
//     }
//     slideIndex++;
//     if (slideIndex > imgs.length) { slideIndex = 1 }
//     imgs[slideIndex - 1].classList.add("active");

//     check()
// }

// let coursel = setInterval(mySlider, 5000);
// let imgHover = document.querySelector('.slider-img')
// imgHover.addEventListener("mouseover", function () {
//     clearInterval(coursel);
// });
// imgHover.addEventListener("mouseleave", function () {
//     coursel = setInterval(mySlider, 5000);
// });

// $(document).ready(function () {

//     //slide to right
//     $('.next').on('click', function () {
//         clearInterval(coursel);
//         var currentImg = $('.slider-img .active');
//         var nextImg = currentImg.next();

//         if (currentImg.is(':last-child')) {

//             currentImg.delay(5000).removeClass('active');
//             $('.slider-img div').eq(0).addClass('active');
//         } else {
//             currentImg.delay(5000).removeClass('active');
//             nextImg.addClass('active');

//         }
//         check()

//     });

//     //Slide to left
//     $('.prev').on('click', function () {
//         clearInterval(coursel);
//         var currentImg = $('.slider-img .active');
//         var prevImg = currentImg.prev();

//         if (currentImg.is(':first-child')) {
//             currentImg.delay(5000).removeClass('active');
//             $('.slider-img div:last-child').addClass('active');
//         } else {
//             currentImg.delay(5000).removeClass('active');
//             prevImg.addClass('active');
//         }
//         check()

//     });

//     $('.dot').on('click', function () {
//         clearInterval(coursel);
//         var index = $(this).index();
//         var currentSlide = $('.slider-img div').eq(index);
//         currentSlide.addClass('active');
//         $('.slider-img div').not(currentSlide).removeClass('active');
//         $(this).addClass('active').siblings().removeClass('active');
//     });

// });

Today();
