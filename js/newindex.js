$(function () {
    var direction = { up: 1, right: 2, down: 3, left: 4 }
    var now = { row: 1, col: 1 };
    var last = { row: 0, col: 0 };
    var isMoving = false;

    $('.page').swipeUp(function () {
        if (isMoving) {
            return;
        }
        last.col = now.col;
        last.row = now.row;
        if (last.col<5) {
            now.row = last.row;
            now.col = last.col + 1;
            movepage(direction.up);
        } 
    });
    $('.page').swipeDown(function () {
        if (isMoving) {
            return;
        }
        last.col = now.col;
        last.row = now.row;
        if (now.col>1 && last.col<=5) {
            now.row = last.row;
            now.col = last.col - 1;
            movepage(direction.down);
        } 
    });
    $('.page').swipeLeft(function () {
        if (isMoving) {
            return;
        }
        last.col = now.col;
        last.row = now.row;
        if (last.col<5 && last.col>1 && now.row==1) {
            now.row = last.row + 1;
            now.col = last.col;
            movepage(direction.left);
        } 
    });
    $('.page').swipeRight(function () {
        if (isMoving) {
            return;
        }
        last.col = now.col;
        last.row = now.row;
        if (last.col<5 && last.col>1 && now.row==2) {
            now.row = last.row - 1;
            now.col = last.col;
            movepage(direction.right);
        } 
    });

    function movepage(dir) {
        var lastpage = '.page-' + last.col + '-' + last.row;
        var nowpage = '.page-' + now.col + '-' + now.row;
        var inclass = '';
        var outclass = '';
        switch (dir) {
            case direction.up:
                outclass = 'pt-page-moveToTop';
                inclass = 'pt-page-moveFromBottom';
                break;
            case direction.right:
                outclass = 'pt-page-moveToRight';
                inclass = 'pt-page-moveFromLeft';
                break;
            case direction.down:
                outclass = 'pt-page-moveToBottom';
                inclass = 'pt-page-moveFromTop';
                break;
            case direction.left:
                outclass = 'pt-page-moveToLeft';
                inclass = 'pt-page-moveFromRight';
                break;
        };
        $(nowpage).addClass(inclass);
        $(nowpage).removeClass('hide');
        $(lastpage).addClass(outclass)
        isMoving = true;

        setTimeout(function () {
            $(lastpage).removeClass(outclass);
            $(lastpage).removeClass('page-current');
            $(lastpage).addClass('hide')
            $(nowpage).removeClass(inclass);
            $(nowpage).addClass('page-current')
            $(nowpage).find('img').removeClass('hide')
            $(lastpage).find('img').addClass('hide')
            isMoving = false;
        },500)
    }
})