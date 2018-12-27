(function($) {
    $(function() {

        $('select').styler();

    });

    /*------------------Filter Menu Animation----------------------*/
    $('.menu__outer-item').children('a').click(function( event ) {
        event.preventDefault();
    });
    $('.menu__inner-list').hide();
    $('.menu__outer-item--opened').children('ul').show();
    $('.menu__outer-list').children('li').click(
        function(){
            var $this = $(this);
            if ($this.hasClass('menu__outer-item--opened')){
                return;
            }else{
                $('.menu__outer-item--opened').removeClass('menu__outer-item--opened').addClass('menu__outer-item--closed').children('ul').slideUp();
                $this.removeClass('menu__outer-item--closed').addClass('menu__outer-item--opened').children('ul').slideDown();
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
        });

})(jQuery);

function Slider (options) {
    var __self = this;
    //DOM Nodes
    var sliderNode = document.querySelector('.slider'),
        sliderElementsNode = sliderNode.querySelector('.slider__elements-wrap'),
        prevSliderNode = sliderNode.querySelector('.slider__arrow--prev'),
        nextSliderNode = sliderNode.querySelector('.slider__arrow--next'),
        paginationNode = sliderNode.querySelector('.slider__pagination');
    var currentSlideIndex = 0,
        imagesCount = sliderElementsNode.children.length,
        sliderSize = sliderElementsNode.offsetWidth,
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
        console.dir(target);
        if (target.className !== 'pagination-item__disk') { return };
        currentSlideIndex = +target.dataset['slider__item'];
        __self.__render();
    };
    this.__init = function () {
        /*this.createDots();*/
        this.__render();
    };
    this.__init();
};