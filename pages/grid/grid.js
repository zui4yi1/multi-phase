$(function () {

    var condition1 = {
        id: '1000'
    };
    mf.ajax('/class/getStudentList.action', condition1, function (data) {
        console.info(data);
        $('#userName').text(data.name);

    });

});


