$(document).ready(function () {
   $(".carousel__inner").slick({
      speed: 1200,
      adaptiveHeight: true,
      prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
      responsive: [
         {
            breakpoint: 992,
            settings: {
               dots: true,
               arrows: false,
            },
         },
      ],
   });

   $("ul.catalog__tabs").on("click", "li:not(.catalog__tab_active)", function () {
      $(this)
         .addClass("catalog__tab_active")
         .siblings()
         .removeClass("catalog__tab_active")
         .closest("div.container")
         .find("div.catalog__content")
         .removeClass("catalog__content_active")
         .eq($(this).index())
         .addClass("catalog__content_active");
   });

   function toggleSlide(item) {
      $(item).each(function (i) {
         $(this).on("click", function (e) {
            e.preventDefault();
            $(".catalog-item__content").eq(i).toggleClass("catalog-item__content_active");
            $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
         });
      });
   }

   toggleSlide(".catalog-item__link");
   toggleSlide(".catalog-item__back");

   // Модальные окна

   $("[data-modal=consultation]").on("click", function () {
      $(".overlay, #consultation").fadeIn("slow"); // появление формы
   });
   //сокрытие форм по крестику
   $(".modal__close").on("click", function () {
      $(".overlay, #consultation, #thanks, #order").fadeOut("slow");
   });
   //на кнопках покупки в каталоге
   $(".button_mini").each(function (i) {
      $(this).on("click", function () {
         $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
         $(".overlay, #order").fadeIn("slow");
      });
   });
   //валидация форм
   function validateForms(form) {
      $(form).validate({
         rules: {
            name: {
               required: true,
               minlength: 2,
            },
            phone: "required",
            email: {
               required: true,
               email: true,
            },
         },
         messages: {
            name: {
               required: "Введите свое имя",
               minlength: jQuery.validator.format("Введите {0} символа!"),
            },
            phone: "Введите свой номер телефона",
            email: {
               required: "Введите свою почту",
               email: "Неправильно введен адрес почты",
            },
         },
      });
   }

   validateForms("#consultation-form");
   validateForms("#consultation form");
   validateForms("#order form");

   $("input[name=phone]").mask("+7 (999) 999-99-99");

   // форма подтверждения и отправка почты
   $("form").submit(function (e) {
      e.preventDefault(); //отменяем стандарт поведение броузера, будет без перезагрузки

      if (!$(this).valid()) {
         return;
      }

      $.ajax({
         type: "POST",
         url: "mailer/smart.php",
         data: $(this).serialize(),
      }).done(function () {
         $(this).find("input").val("");
         $("#consultation, #order").fadeOut();
         $(".overlay, #thanks").fadeIn("slow"); //показываем форму благодарности

         $("form").trigger("reset");
      });
      return false;
   });

   // Скролл в начало по иконке pageup

   $(window).scroll(function () {
      if ($(this).scrollTop() > 1600) {
         $(".pageup").fadeIn();
      } else {
         $(".pageup").fadeOut();
      }
   });

   $("a[href^='#']").click(function () {
      const _href = $(this).attr("href");

      $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
      return false;
   });

   new WOW().init();
});
