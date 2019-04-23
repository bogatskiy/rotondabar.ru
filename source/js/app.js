'use strict'

$(document).ready(function () {

	if ($('.header__menu-btn')) {
		console.log('1111');
		if ($(window).width() <= 768) $('.header__menu').hide()
		$('.header__menu-btn').on('click', '', 'open', menuOpen)
	}

	function menuOpen(evn) {

		const $btn = $(this)
		const $list = $('.header__menu')
		$btn.toggleClass(evn.data)
		$list.stop().slideToggle(300)
	}

	$('.menu__list .menu__item-name').on('click', f_acc)

	function f_acc() {

		$($(this).closest('.menu__list').find('.menu__item-info')).not($(this).next()).slideUp(400)
		$(this).next().slideToggle(300)

		if ($(this).data('img')) {
			const regExp = /\/[a-zA-Z]*\_/
			let
				img = $(this).closest('.menu__category-item').find('img'),
				imgData = $(this).data('img'),
				string = img.attr('src')

			img.animate({opacity: 0}, 250)
			setTimeout(() => {
				img.attr('src', string.replace(regExp, `/${imgData}_`))
			}, 400)
			setTimeout(() => {
				img.animate({opacity: 1}, 500)
			}, 600)
		}
	}
})

document.addEventListener("DOMContentLoaded", () => {

	let
		parallax = document.querySelector('.parallax'),
		parallax__layers = document.querySelectorAll('.parallax__layer'),
		mountain = document.querySelector('.index__mountain')

	window.onscroll = function () {

		if (parallax) {
			let
				parallaxH = parallax.offsetHeight,
				parallaxY = parallaxH + parallax.getBoundingClientRect().y,
				parallaxPercent = (parallaxY / parallaxH).toFixed(3)
			if (parallaxPercent >= 0 && parallaxPercent <= 100) {
				for (let i = 0; parallax__layers.length > i; i++) {
					let item = parallax__layers[i],
						newBottom = (item.offsetHeight - item.offsetHeight * parallaxPercent >= 0) ? item.offsetHeight - item.offsetHeight * parallaxPercent : 0
					item.style.transform = `translateY(${newBottom}px)`
				}
			}
		}

		if (mountain) {
			let parallaxH = mountain.offsetHeight,
				parallaxY = parallaxH + mountain.getBoundingClientRect().y,
				parallaxPercent = (parallaxY / parallaxH).toFixed(3) * 20
			if (parallaxPercent >= 0 && parallaxPercent <= 100) {
				mountain.style.backgroundPositionY = parallaxPercent + '%'
			}
		}
	}
})