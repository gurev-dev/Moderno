$(function () {

	$(".rate-star").rateYo({
		rating: 5,
		starWidth: "12px",
		readOnly: true
	});

	$('.slider__inner').slick({
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 4,
		dots: true,
		arrows: false,
		autoplay: false,
		responsive: [
			{
				breakpoint: 1900,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				}
			},
			{
				breakpoint: 1040,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 885,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: false,
					autoplay: true,
					autoplaySpeed: 2000
				}
			},
		]
	});


	$(".js-range-slider").ionRangeSlider({
		type: "double",
		grid: true,
		min: 0,
		max: 1000,
		from: 0,
		to: 600,
		prefix: "$"
	});

	$('.icon-th-list').click(function () {
		$('.icon-th-large').not(this).removeClass('active');
		$('.product__item').addClass('list');
		$(this).addClass('active');
	});

	$('.icon-th-large').click(function () {
		$('.icon-th-list').not(this).removeClass('active');
		$('.product__item').not(this).removeClass('list');
		$(this).addClass('active');
	});

	$('.header__btn-menu').on('click', function () {
		$('.header__box').toggleClass('active');
	});

	$('input[type="file"], select').styler();

	$('.about-product__tabs .tab, .settings__tabs .tab').on('click', function (event) {
		var id = $(this).attr('data-id');
		$('.about-product__tabs, .settings__tabs').find('.tab-item').removeClass('active-tab').hide();
		$('.about-product__tabs .tabs, .settings__tabs .tabs').find('.tab').removeClass('active');
		$(this).addClass('active');
		$('#' + id).addClass('active-tab').fadeIn();
		return false;
	});



	$(document).on("click", function (e) {
		if (e.target.id != 'btn' && e.target.id != 'list') {
			$("#list").hide("slow");
		} else if (e.target.id != 'list') {
			$("#list").toggle("slow");
		}
	});

	var config = {
		"animation": {
			"duration": 500,
			"nudge": true,
			"reverseOut": false,
			"effects": "fade translateZ(-20px) rotateZ(180deg) stagger(64ms)"
		}
	};

	if ($("div").is(".mix")) {
		var mixer = mixitup('.products__inner-box', config);
	}


});
