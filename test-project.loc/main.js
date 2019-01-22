(function($) {
    $(function() {

        $('select').styler();

    });
    var $windowWidth = $(window).width();
    var $windowWidth1;
    $( window ).resize(function() {
        $windowWidth1 = $(window).width();
    });

    /*Верхнее меню*/

    if($windowWidth1 < 768 || $windowWidth < 768) {
        $('.top-menu__menu-title-button').addClass('top-menu__menu-title-button--mobile');
        $('.top-menu').hide();
        $('.top-menu__close-icon').addClass('top-menu__close-icon--opened').hide();
    };
    $(".top-menu__menu-title-button").click(function (event) {
        $('.top-menu').show();
        $('.top-menu__close-icon').show();
    });
    $('.top-menu__close-icon').click(function () {
        $('.top-menu').hide();
        $('.top-menu__close-icon').hide();
    });
    $(document).on('click', function(event) {
        if($windowWidth1 < 768 || $windowWidth < 768) {
            if (!$(event.target).closest('.main-nav').length) {
                $('.top-menu').hide();
                $('.top-menu__close-icon').hide();
            }
            event.stopPropagation();
        }
    });

    /*------------------Sort Menu Animation----------------------*/
    $('h2.sort__title-header').children('a').click(function( event ) {
        event.preventDefault();
    });
    $('h2.sort__title-header').click(function() {
        var $this = $(this);
        $this.toggleClass('sort__title-header--opened');
        $('.sort__form').slideToggle();
    });

    /*------------------Filter Menu Animation----------------------*/
    $('.menu__outer-item').children('a').click(function( event ) {
        event.preventDefault();
    });
    $('.menu__inner-list').hide();
    /*$('.menu__outer-item--opened').children('ul').show();*/
    $('.menu__outer-list').children('li').click(
        function(){
            $(this).toggleClass('menu__outer-item--opened').children('ul').slideToggle();
        });

        $('.filter__menu-icon').click(function () {
            $(this).toggleClass('filter__menu-icon--opened');
            $('.filters__inner-wrap').toggleClass('visually-hidden');

        });
        $(document).on('click', function(event) {
            if($windowWidth1 < 768 || $windowWidth < 768) {
            if (!$(event.target).closest('.filters').length) {
                $('.filter__menu-icon').removeClass('filter__menu-icon--opened');
                $('.filters__inner-wrap').addClass('visually-hidden');
            }
            event.stopPropagation();
            }
        });



    /*------------------Bottom Pagination----------------------*/
    $('.pagination__item').children('a').click(
        function( event ) {
            var $this = $(this).parent('li');
            event.preventDefault();
            if ($this.hasClass('pagination__item--active')) {
                return;
            } else {
                $('.pagination__item--active').removeClass('pagination__item--active');
                $this.addClass('pagination__item--active');
            }
    });
    $('.pagination__arrow').click(
        function( event ) {
            var $this = $(this);
            var $currentPage = $('.pagination__item--active');
            event.preventDefault();
            if ($this.parent('div').hasClass('pagination__left-part')) {
                if($currentPage.prev().hasClass('pagination__item')){
                    $currentPage.removeClass('pagination__item--active').prev('.pagination__item').addClass('pagination__item--active');
                } else return;
            };
            if($this.parent('div').hasClass('pagination__right-part')) {
                if($currentPage.next().hasClass('pagination__item')){
                    $currentPage.removeClass('pagination__item--active').next('.pagination__item').addClass('pagination__item--active');
                } else return;
            };
            /*if($windowWidth < 768){
                $('.pagination__item').addClass('visually-hidden');
                $('.pagination__item--active').removeClass('visually-hidden');
            };*/
        });

})(jQuery);



function Slider (options) {
    var __self = this;
    //DOM Nodes
    var sliderNode = document.querySelector('.slider'),
        sliderElementsNode = sliderNode.querySelector('.slider__elements-wrap'),
        sliderElementsContainer = sliderNode.querySelector('.slider__elements-container'),
        prevSliderNode = sliderNode.querySelector('.slider__arrow--prev'),
        nextSliderNode = sliderNode.querySelector('.slider__arrow--next'),
        paginationNode = sliderNode.querySelector('.slider__pagination');
    var currentSlideIndex = 0,
        imagesCount = sliderElementsNode.children.length,
        sliderSize = sliderElementsContainer.offsetWidth,
        directionStyle = 'marginLeft';

    this.nextSlide = function () {
        if (currentSlideIndex === imagesCount-1){
            currentSlideIndex = 0;
            return;
        }
        currentSlideIndex++;
    };
    this.prevSlide = function () {
        if (currentSlideIndex === 0){
            currentSlideIndex = imagesCount-1;
            return;
        }
        currentSlideIndex--;
    };
    this.__render = function () {
        sliderElementsNode.style[directionStyle] = -(currentSlideIndex*sliderSize)+'px';
        paginationNode.querySelector('.slider__pagination-item--active').classList.remove('slider__pagination-item--active');
        paginationNode.children[currentSlideIndex].classList.add('slider__pagination-item--active');
    };
    prevSliderNode.onclick = function (e) {
        e.preventDefault();
        __self.prevSlide();
        __self.__render();
    };
    nextSliderNode.onclick = function (e) {
        e.preventDefault();
        __self.nextSlide();
        __self.__render();
    };
    paginationNode.onclick = function (e) {
        e.preventDefault();
        var target = e.target;
        if (target.className !== 'pagination-item__disk') { return };
        currentSlideIndex = +target.dataset['slider__item'];
        __self.__render();
    };
    this.__resize = function(){
        sliderSize = sliderElementsContainer.offsetWidth;
        sliderElementsNode.style[directionStyle] = -(currentSlideIndex*sliderSize)+'px';
    };
    this.__init = function () {
        this.__render();
    };
    this.__init();
};

(function () {

    var bannerSlider = new Slider ({
        changeInterval : 1500
    });

    var startWindowWidth = document.body.clientWidth;

    var topMenu = document.querySelector('.top-menu');
    var topMenuCloseIcon = document.querySelector('.top-menu__close-icon');
    var paginationItems = document.querySelectorAll('.pagination__item');
    var paginationItemActive = document.querySelector('.pagination__item--active');
    var filterMenuItem = document.querySelector('.filter__menu-icon');
    var filtersInnerWrap = document.querySelector('.filters__inner-wrap');
    var sortForm = document.querySelector('.sort__form');
    var sortTitle = document.querySelector('.sort__title');

    var adaptiveForMobile = function () {
        topMenu.style.display='none';
        topMenuCloseIcon.classList.add('top-menu__close-icon--opened');
        topMenuCloseIcon.style.display='none';
        filterMenuItem.classList.remove('visually-hidden');
        filterMenuItem.classList.remove('filter__menu-icon--opened');
        filtersInnerWrap.classList.add('visually-hidden');
        sortTitle.classList.remove('visually-hidden');
        sortForm.style.display='none';
    };
    var adaptiveForDesktop = function () {
        topMenu.style.display='';
        topMenuCloseIcon.classList.remove('top-menu__close-icon--opened');
        filtersInnerWrap.classList.remove('visually-hidden');
        sortTitle.classList.add('visually-hidden');
        sortForm.style.display='flex';
    };

    if(startWindowWidth < 768){
        adaptiveForMobile();
    };


/*По изменению размера окна*/
    window.onresize = function(){
        var windowWidth = document.body.clientWidth;

        if(windowWidth < 768){
            adaptiveForMobile();
        } else {
            adaptiveForDesktop();
        };


        //Пересчитываем размер окна слейдера в баннере
        bannerSlider.__resize();
    }


    /*Верхнее меню*/
    var mainNavBlock = document.querySelector('.main-nav');

    window.onscroll = function() {
        var scrolled = window.pageYOffset || document.documentElement.scrollTop;
        if (scrolled > 0){
            mainNavBlock.classList.add('main-nav--fixed');
        } else {
        mainNavBlock.classList.remove('main-nav--fixed');
        }
    }


})();