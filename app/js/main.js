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
		arrows: false
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


	$('.menu__btn').on('click', function () {
		$('.menu__list').slideToggle();
	});

	$('.header__btn-menu').on('click', function () {
		$('.header__box').toggleClass('active');
	});

	$('.about-product__tabs .tab, .settings__tabs .tab').on('click', function (event) {
		var id = $(this).attr('data-id');
		$('.about-product__tabs, .settings__tabs').find('.tab-item').removeClass('active-tab').hide();
		$('.about-product__tabs .tabs, .settings__tabs .tabs').find('.tab').removeClass('active');
		$(this).addClass('active');
		$('#' + id).addClass('active-tab').fadeIn();
		return false;
	});

	$('input[type="file"], select').styler();


	if ($("div").is(".mix")) {
		var mixer = mixitup('.products__inner-box');
	}



});   