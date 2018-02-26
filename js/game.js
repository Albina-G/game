jQuery(function() {
    function Cards(numX, numY) {
        this.numX = numX;
        this.numY = numY;
        this.isDelete = false;
        this.isClose = true;
        this.id = null;
    }

    if (!Object.assign) {
        Object.defineProperty(Object, 'assign', {
          enumerable: false,
          configurable: true,
          writable: true,
          value: function(target, firstSource) {
            'use strict';
            if (target === undefined || target === null) {
              throw new TypeError('Cannot convert first argument to object');
            }
      
            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
              var nextSource = arguments[i];
              if (nextSource === undefined || nextSource === null) {
                continue;
              }
      
              var keysArray = Object.keys(Object(nextSource));
              for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                var nextKey = keysArray[nextIndex];
                var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                if (desc !== undefined && desc.enumerable) {
                  to[nextKey] = nextSource[nextKey];
                }
              }
            }
            return to;
          }
        });
    }

    Object.assign(Cards.prototype, {
        getName: function() {
            return this.numX + ' ' + this.numY;
        },
        getСoordinateX: function() {
            console.log(this.numX);
            switch (this.numX) {
                case 12 :

                    return (this.numX - 1) * (-60) - 53;
                    break;
                case 13 :

                    return (this.numX - 1) * (-60) - 106;
                    break;
                case 11 :
                default :

                    return (this.numX - 1) * (-60);
                    break;
            }
        },
        getСoordinateY: function() {

            return (this.numY - 1) * (-159);
        },
        setId: function(id) {
            this.id = id;
        },
        delete: function() {
            $('div#' + this.id + '.imageCard').css('display', 'none');
            $('div#' + this.id + '.shirt').css('display', 'none');
            this.isDelete = true;
        },
        close: function() {
            $('div#' + this.id + '.imageCard').removeClass('openCard');
            $('div#' + this.id + '.shirt').removeClass('closeShirt');
            $('div#' + this.id + '.imageCard').addClass('closeCard');
            $('div#' + this.id + '.shirt').addClass('openShirt');
            this.isClose = true;
        },
        open: function() {
            $('div#' + this.id + '.imageCard').removeClass('closeCard');
            $('div#' + this.id + '.shirt').removeClass('openShirt');                
            $('div#' + this.id + '.shirt').addClass('closeShirt');
            $('div#' + this.id + '.imageCard').addClass('openCard');
            this.isClose = false;
        },
        isPart: function() {

            return !(this.numX >= 11 && this.numX <= 13);
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

	$.fn.gameStart = function(options) {

		return this.each(function() {
			var settings = $.extend({
				countCards: 18,
                width: 6,
                time: 5000
			}, options);
			var $this = $(this);
            var cards = [];
            var choiseCard = {
                lastCardName: null,
                lastCardId: null,
                isOpen: false,
                scoresGame: 0
            };
            init();

            function init() {
                $('.start').css('display', 'none');
                $('.finish').css('display', 'none');                
                $('.game').css('display', 'inline-block');
                $('.gameField').empty();
                cards = newChoiseCards().shuffle();
                createCardsOnDesp();
                setTimeout(function() {
                    cards.forEach(function (card) {
                        card.open();
                    });
                    setTimeout(function() {
                        cards.forEach(function (card) {
                            card.close();
                        });
                    }, settings.time);
                }, 500);
            }

            function newChoiseCards() {
                var choiseCards = [];
                var numChoisCards = [];                
                while (choiseCards.length != settings.countCards) {
                    var indexRandomX = Math.floor(Math.random() * 13 + 1);
                    var indexRandomY = Math.floor(Math.random() * 4 + 1);
                    if (numChoisCards.indexOf(indexRandomX + ' ' + indexRandomY) === -1) {
                        numChoisCards.push(indexRandomX + ' ' + indexRandomY);
                        var objCard1 = new Cards(indexRandomX, indexRandomY);
                        var objCard2 = new Cards(indexRandomX, indexRandomY);
                        choiseCards.push(objCard1);
                        choiseCards.push(objCard2);
                    }
                }

                return choiseCards;                
            }

            function createCardsOnDesp() {
                var number = 0;
                for (var countElem = 0; countElem < settings.countCards; countElem++) {
                    if (countElem % settings.width === 0) {
                        number++;
                        $('.gameField').append('<div class="allStringCard stringCards' + number + '">');
                    }
                    cards[countElem].setId(countElem);
                    $('.stringCards' + number).append('<div id="' + countElem + '" class="allCards">');
                    $('div#' + countElem).append('<div id="' + countElem + '" class="shirt openShirt" data-tid="Card-flipped">');                                 
                    $('div#' + countElem).append('<div id="' + countElem + '" class="imageCard closeCard" data-tid="Card">');
                    if (cards[countElem].isPart()) {
                        divideIntoParts(countElem);
                    } else {
                        $('div#' + countElem + '.imageCard').addClass('noPart');
                        $('div#' + countElem + '.imageCard').css(
                            'background-position', cards[countElem].getСoordinateX() + 'px ' 
                                + cards[countElem].getСoordinateY() + 'px');
                    }
                }
            }

            function divideIntoParts(countElem) {
                for (var i = 1; i <= 4; i++) {
                    $('div#' + countElem + '.imageCard').append('<div class="part' + i + '">');
                    var coordinateX = '';
                    if (i === 2 || i === 3) {
                        coordinateX = (cards[countElem].getСoordinateX() - 17) + 'px ';
                    } else {
                        coordinateX = cards[countElem].getСoordinateX() + 'px ';
                    }
                    $('div#' + countElem + '.imageCard .part' + i).css('background-position', coordinateX + 
                        cards[countElem].getСoordinateY() + 'px');
                }
            }

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
                    $('.finish').css('display', 'inline-block');
                    if (choiseCard.scoresGame <= 0) {
                        $('.result').text('Вы проиграли!');
                    } else {
                        $('.result').text('Поздравляем!');
                    }
                }
            }

            $('.allCards').click(function (event) {
                var id = event.target.id;
                if (cards[id].isDelete || !cards[id].isClose) {

                    return;
                }
                cards[id].open();
                if (choiseCard.isOpen) {
                    if (choiseCard.lastCardName === cards[id].getName()) {
                        setTimeout(function() {
                            cards[id].delete();
                            cards[choiseCard.lastCardId].delete();
                            choiseCard.isOpen = false;
                            choiseCard.lastCardId = null;
                            choiseCard.lastCardName = null;
                            addScore();
                            finish();
                        }, 300);
                    } else {
                        setTimeout(function() {
                            cards[id].close();
                            cards[choiseCard.lastCardId].close();
                            choiseCard.isOpen = false;
                            choiseCard.lastCardId = null;
                            choiseCard.lastCardName = null;
                            deductScore();
                        }, 350);
                    }
                } else {
                    choiseCard.isOpen = true;
                    choiseCard.lastCardId = id;
                    choiseCard.lastCardName = cards[id].getName();
                }
            });
        });
    };
});