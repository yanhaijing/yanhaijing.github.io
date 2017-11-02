// notice
$notice = $('.notice');

$noticeItem = $notice.find('.notice-item');

if ($noticeItem.length > 1) {
    function loop(cur, next) {
        $noticeItem.eq(cur).fadeOut(function () {
            $noticeItem.eq(next).fadeIn(function () {
                setTimeout(function () {loop(next, next === $noticeItem.length - 1 ? 0 : next + 1)}, 3000);
            });
        });
    }

    loop(-1, 0);
}
