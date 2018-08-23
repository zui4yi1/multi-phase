$(function () {

    mf.dialog.form('dialog1');
    mf.dialog.form_big('dialog2');
    mf.dialog.form_small('dialog3');
    mf.dialog.detail('dialog4');
    mf.dialog.detail_big('dialog5');
    mf.dialog.detail_small('dialog6');
    $('#d1').click(function () {
        $('#dialog1').dialog('open');
    });
    $('#d2').click(function () {
        $('#dialog2').dialog('open');
    });
    $('#d3').click(function () {
        $('#dialog3').dialog('open');
    });
    $('#d4').click(function () {
        $('#dialog4').dialog('open');
    });
    $('#d5').click(function () {
        $('#dialog5').dialog('open');
    });
    $('#d6').click(function () {
        $('#dialog6').dialog('open');
    });
});


