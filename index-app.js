

$('.work').hide();
$('.school').hide();
$('#desc-btn').css('backgroundColor', 'grey');
$('#desc-btn').css('color', 'red');


$('#desc-btn').click(function(){
    $('.work').hide();
    $('.school').hide();
    $('.desc').show();
    $('#desc-btn').css('backgroundColor', 'grey');
    $('#desc-btn').css('color', 'red');
    $('#work-btn').css('backgroundColor', 'black');
    $('#work-btn').css('color', 'white');
    $('#school-btn').css('backgroundColor', 'black');
    $('#school-btn').css('color', 'white');
});

$('#work-btn').click(function(){
    $('.desc').hide();
    $('.school').hide();
    $('.work').show();
    $('#work-btn').css('backgroundColor', 'grey');
    $('#work-btn').css('color', 'red');
    $('#desc-btn').css('backgroundColor', 'black');
    $('#desc-btn').css('color', 'white');
    $('#school-btn').css('backgroundColor', 'black');
    $('#school-btn').css('color', 'white');
    
});

$('#school-btn').click(function(){
    $('.work').hide();
    $('.desc').hide();
    $('.school').show();
    $('#school-btn').css('backgroundColor', 'grey');
    $('#school-btn').css('color', 'red');
    $('#desc-btn').css('backgroundColor', 'black');
    $('#desc-btn').css('color', 'white');
    $('#work-btn').css('backgroundColor', 'black');
    $('#work-btn').css('color', 'white');
});



