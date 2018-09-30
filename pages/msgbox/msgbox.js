$(function () {

    $('#succ').click(function () {
        mf.msgbox.succ();
    });
    $('#fail').click(function () {
        mf.msgbox.fail();
    });
    $('#error').click(function () {
        mf.msgbox.error('error...');
    });
    $('#info').click(function () {
        mf.msgbox.info('info...');
    });
    $('#warn').click(function () {
        mf.msgbox.warn('warning...');
    });
    $('#confirm').click(function () {
        mf.msgbox.confirm('confirm...', function () {
            console.info('well done!');
        });
    });
});


