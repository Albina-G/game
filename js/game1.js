

jQuery(function() {
    function Cards(name) {
        this.name = name;
        this.isDelete = false;
    }

    Object.assign(Cards.prototype, {
        getName() {
            return this.name;
        },
        delete(id) {
            $('img#' + id + '.imageCard').css('display', 'none');
            $('div#' + id + '.allCards').css('background', 'none');
            this.isDelete = true;
        },
        close(id) {
            $('img#' + id + '.imageCard').css('display', 'none');
        },
        isClose(id) {

            return $('img#' + id + '.imageCard').css('display') === 'none';
        },
        open(id) {
            $('img#' + id + '.imageCard').css('display', 'block');
        }
    });

    Array.prototype.shuffle = function() {
        for (var i = this.length - 1; i > 0; i--) {
            var num = Math.floor(Math.random() * (i + 1));
            var d = this[num];
            this[num] = this[i];
            this[i] = d;
        }
        return this;
    };

	$.fn.gameStart = function(settings) {

		return this.each(function() {
			// var settings = $.extend({
				settings.loadingError = 'Ошибка';//,
            // }, options);
            // console.log($(this), this)
			var $this = this; // $(this);
            var entries = null;
            var cards = [];
            var choiseCard = {
                lastCardName: null,
                lastCardId: null,
                isOpen: false,
                scoresGame: 0
            };
            
            init();
            
            function init() {
                console.log('OK!');
                // $('.start').css('display', 'none');
                document.getElementsByClassName('start')[0].style = 'display: none';
                // $('.finish').css('display', 'none');       
                document.getElementsByClassName('finish')[0].style = 'display: none';                         
                // $('.game').css('display', 'block');
                document.getElementsByClassName('game')[0].style = 'display: block';                
                // $('.gameField').empty();
                document.getElementsByClassName('gameField')[0].innerHTML = '';                
                cards = newChoiseCards().shuffle();
                createElementOnDesp();
            }

            function newChoiseCards() {
                var namesAllCards = createName();
                var choiseCards = [];
                var numChoisCards = [];
                while (choiseCards.length != settings.countCards) {
                    var indexRandom = Math.floor(Math.random() * (namesAllCards.length - 1) + 1);
                    if (numChoisCards.indexOf(indexRandom) === -1) {
                        numChoisCards.push(indexRandom);
                        var objCard = new Cards(namesAllCards[indexRandom]);
                        choiseCards.push(objCard);
                        choiseCards.push(objCard);
                    }
                }

                return choiseCards;
            }

            function createName() {
                var first = ['0', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'J', 'K', 'Q'];
                var second = ['C', 'D', 'H', 'S'];
                var names = [];
                
                first.forEach(function (item) {                    
                    for (var i = 0; i < second.length; i++) {
                        names.push(item + second[i]);
                    }
                });

                return names;
            }

            function createNodeHtml({when, whenIsClass, whoElem, whoContent = '', whoNameId = '', whoNameClass = '', src = ''}) {
                var elem = document.createElement(whoElem);
                if (whoContent !== '') {
                    elem.innerHTML = whoContent;
                }
                if (whoNameClass !== '' ) {
                    elem.className = whoNameClass;
                }
                if (whoNameId !== '' ) {
                    elem.id = whoNameId;
                }
                if (src !== '') {
                    elem.src = src;
                }
                if (whenIsClass) {
                    document.getElementsByClassName(when)[0].appendChild(elem);
                } else {
                    document.getElementById(when).appendChild(elem);
                }
            }

            function createCss({nameElem, styleElem, propertyElem, resolution = ''}) {
                console.log(`${styleElem}: ${propertyElem}${resolution}`);
                var countElements = document.getElementsByClassName(nameElem).length;
                for (var index = 0; index < countElements; index++) {
                    document.getElementsByClassName(nameElem)[index].style = `${styleElem}: ${propertyElem}${resolution}`;
                }
            }

            function createElementOnDesp() {
                var number = 0;
                for (var countElem = 0; countElem < settings.countCards; countElem++) {
                    if (countElem % settings.width === 0) {
                        number++;
                        // $('.gameField').append('<div class="allStringCard stringCards' + number + '">');
                        createNodeHtml({
                            when: 'gameField', 
                            whenIsClass: true, 
                            whoElem: 'div',
                            whoNameClass: 'allStringCard stringCards' + number
                        });
                    }
                    // $('.stringCards' + number).append(`<div id="` + countElem + `" class="allCards card` 
                        // + countElem + '">');
                    createNodeHtml({
                        when: 'stringCards' + number, 
                        whenIsClass: true, 
                        whoElem: 'div',
                        whoNameId: countElem, 
                        whoNameClass: 'allCards card' + countElem
                    });
                    /* $('.card' + countElem).append('<img id="'+ countElem 
                        + '" class="imageCard" src="' 
                        + settings.entries + '/' 
                        + cards[countElem].getName() + '.png">'); */
                    createNodeHtml({
                        when: 'card' + countElem, 
                        whenIsClass: true, 
                        whoElem: 'img',
                        whoNameId: countElem, 
                        whoNameClass: 'imageCard',
                        src: settings.entries + '/' + cards[countElem].getName() + '.png'
                    });
                }
                var widthCard = Math.floor(($('.gameField').width() - (settings.width - 1) * 10) / settings.width);
                var heightCardsCount = settings.countCards / settings.width;
                var heightCard = Math.floor(($('.gameField').height() - (heightCardsCount - 1) * 10) / heightCardsCount);
                // $('.imageCard').css('width', widthCard);
                createCss({
                    nameElem: 'imageCard', 
                    styleElem: 'width',
                    propertyElem: widthCard,
                    resolution: 'px'
                });
                // $('.imageCard').css('height',  heightCard);    
                createCss({
                    nameElem: 'imageCard', 
                    styleElem: 'height',
                    propertyElem: heightCard,
                    resolution: 'px'
                });            
                // $('.allCards').css('width', widthCard);
                createCss({
                    nameElem: 'allCards', 
                    styleElem: 'width',
                    propertyElem: widthCard,
                    resolution: 'px'
                });
                // $('.allCards').css('height',  heightCard);
                createCss({
                    nameElem: 'allCards', 
                    styleElem: 'height',
                    propertyElem: heightCard,
                    resolution: 'px'
                });
                 $('.allCards').css('background', 'url("Cards/shirt.png") repeat');
                /*createCss({
                    nameElem: 'allCards', 
                    styleElem: 'background',
                    propertyElem: 'url("Cards/shirt.png") repeat'
                });*/
                // $('.allStringCard').css('height', heightCard);
                createCss({
                    nameElem: 'allStringCard', 
                    styleElem: 'height',
                    propertyElem: heightCard,
                    resolution: 'px'
                });
                $('.scores').text(choiseCard.scoresGame);
                setTimeout(function() {
                    $('.imageCard').css('display', 'none');     
                }, settings.time);
            }

            $('.allCards').click(function (event) {
                var id = event.target.id;
                if (cards[id].isDelete || !cards[id].isClose(id)) {

                    return;
                }
                cards[id].open(id);
                // открываем карту:
                if (choiseCard.isOpen && !cards[id].isDelete) {
                    // проверяем совпадают ли?
                    if (choiseCard.lastCardName === cards[id].getName()) {
                        // если да (удаляем обе, добавляем баллы)
                        setTimeout(function() {
                            cards[id].delete(id);
                            cards[choiseCard.lastCardId].delete(choiseCard.lastCardId);
                            choiseCard.isOpen = false;
                            choiseCard.lastCardId = null;
                            choiseCard.lastCardName = null;
                            addScore();
                            finish();
                        }, 100);
                    } else {
                        // если нет (закрываем обе, отнимаем баллы)
                        setTimeout(function() {
                            cards[id].close(id);
                            cards[choiseCard.lastCardId].close(choiseCard.lastCardId);
                            choiseCard.isOpen = false;
                            choiseCard.lastCardId = null;
                            choiseCard.lastCardName = null;
                            deductScore();
                        }, 200);
                    }
                } else {
                    // оставляем открытой
                    choiseCard.isOpen = true;
                    choiseCard.lastCardId = id;
                    choiseCard.lastCardName = cards[id].getName();
                }
                // если открыты все то конец *******************************************!!!
               // finish();
            });

            function addScore() {
                var countDelete = cards.reduce(function (count, card) {
                    if (!card.isDelete) {
                        count++;
                    }

                    return count;
                }, 0);
                choiseCard.scoresGame += countDelete * 42;
                $('.scores').text(choiseCard.scoresGame);
            }

            function deductScore() {
                var countDelete = cards.reduce(function (count, card) {
                    if (card.isDelete) {
                        count++;
                    }

                    return count;
                }, 0);
                choiseCard.scoresGame -= countDelete * 42;
                $('.scores').text(choiseCard.scoresGame);
            }

            function finish() {
                var countDelete = cards.reduce(function (count, card) {
                    if (card.isDelete) {
                        count++;
                    }

                    return count;
                }, 0);
                if (countDelete === settings.countCards) {
                    $('.game').css('display', 'none');
                    $('.finish').css('display', 'flex');
                    if (choiseCard.scoresGame <= 0) {
                        $('.result').text('Вы проиграли!');
                    } else {
                        $('.result').text('Поздравляем!');
                    }
                }
            }
        });
    };
});