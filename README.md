carousel.js
======================
PC 기반 환경에서 사용할 목적으로 제작한 carousel script입니다. <br>
따라서 slide 이동은 translate가 아닌 left 값으로 진행되며, swipe 기능이 미포함되어 있습니다.

필수 구조는 다음과 같습니다.

```html
<body>

  <div id="carousel">
    <button type="button" class="carousel-btn-play">play</button>
    <button type="button" class="carousel-btn-stop">stop</button>
    <button type="button" class="carousel-btn-prev">prev</button>
    <button type="button" class="carousel-btn-next">next</button>
    <div>
      <button type="button" class="carousel-pagination-bullet">Go to slide 1</button>
      <button type="button" class="carousel-pagination-bullet">Go to slide 2</button>
      ...
    </div>
    <ul class="carousel-wrapper">
      <li class="carousel-slide">
        <a href="/banner01" target="_blank"><img src="banner_01.png" alt="banner01"></a>
      </li>
      <li class="carousel-slide">
        <a href="/banner02" target="_blank"><img src="banner_02.png" alt="banner02"></a>
      </li>
      ...
    </ul>
    <div class="carousel-timer-bar"></div>
  </div>

  <script src="http://i.jobkorea.kr/content/js/jquery-1.11.1.min.js"></script>
  <script src="http://its.jobkorea.kr/content/js/uit.carousel.js"></script>
  <script>
    // JKUIT.carousel(container, options)
    var banner=new JKUIT.carousel('#carousel');
  </script>
</body>
```

## .init() (options)
다음과 같이 옵션값을 변경할 수 있다.

```html
  <script>
    // JKUIT.carousel(container, options)
    var banner=new JKUIT.carousel('#carousel',{duration: 200, autoplay: false, pagination: '.btnBullet'});
  </script>
</body>
```

|Name|Description|Default|
| ---- | ---- | ---- |
|timerDur|타이머 인터벌 시간|5000|
|duration|슬라이드 동작 시간|300||
|autoplay|자동 슬라이드(boolean)|true|
|viewTimerBar|슬라이드 타이머 바(boolean)|false|
|slideHover|슬라이드 영역 마우스 오버시 오토슬라이드 오프(boolean)|true|
|wrapper|레이아웃(상단 html 참조)|'.carousel-wrapper'|
|slide|레이아웃(상단 html 참조)|'.carousel-slide'|
|playButton|레이아웃(상단 html 참조)|'.carousel-btn-play'|
|stopButton|레이아웃(상단 html 참조)|'.carousel-btn-stop'|
|nextButton|레이아웃(상단 html 참조)|'.carousel-btn-next'|
|prevButton|레이아웃(상단 html 참조)|'.carousel-btn-prev'|
|pagination|레이아웃(상단 html 참조)|'.carousel-pagination-bullet'|
|timerBar|레이아웃(상단 html 참조)|'.carousel-timer-bar'|

## .render(onNum, nextNum, type)
slide animation 함수. <br>
onNum은 현재 slide page 값(start 0), <br>
nextNum은 이동할 slide page 값(start 0), <br>
type은 방향을 나타내는 문자열("next", "prev")이다. 

## .event()
event bind fn(pagination click, next button click, prev button click, play button click, stop button click, slide area mouse enter&leave)

## .clickRender(type, nextNum)
click 함수에 사용하는 slide render 함수<br>
type은 방향을 나타내는 문자열("next", "prev"),<br>
nextNum은 특정 영역으로 이동할 경우 slide page 값(start 0)을 넣고,<br>
생략하면 type에 따른 방향으로 한칸 이동한다.

## .play(), .stop()
click 함수에 사용

