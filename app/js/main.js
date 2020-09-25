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

	$('.icon-th-list').on('click', function () {
		$('.product__item').addClass('list');
		$('.icon-th-list').addClass('active');
		$('.icon-th-large').removeClass('active');
	});
	$('.icon-th-large').on('.click', function () {
		$('.product__item').removeClass('list');
		$('.icon-th-large').addClass('active');
		$('.icon-th-list').removeClass('active');
	});

	$('.menu__btn').on('click', function () {
		$('.menu__list').slideToggle();
	});

	$('.header__btn-menu').on('click', function () {
		$('.header__box').toggleClass('active');
	});

	$('.about-product__tabs .tab').on('click', function (event) {
		var id = $(this).attr('data-id');
		$('.about-product__tabs').find('.tab-item').removeClass('active-tab').hide();
		$('.about-product__tabs .tabs').find('.tab').removeClass('active');
		$(this).addClass('active');
		$('#' + id).addClass('active-tab').fadeIn();
		return false;
	});

	if ($("div").is(".mix")) {
		var mixer = mixitup('.products__inner-box');
	}



});   