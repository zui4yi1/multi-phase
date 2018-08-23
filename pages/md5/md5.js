$(function () {
    $('#btn').click(function () {
        var val = $('#testStr').val().trim();

        $('#md5').text(md5(val));  // 直接用md5加密

        $('#pre').text(mf.md5.preEnc(val)); // 字符预处理

        $('#pre_md5').text(md5(mf.md5.preEnc(val))); // 字符预处理后，使用md5加密

        $('#suff_md5').text(mf.md5.enc(val)); // 最终值，预处理并md5加密后，使用自锁的方式再次处理
    });
});