(function($) {

    var englishLanguageId = '7cb7a61d-5d42-46ad-b9c0-fa83ca0d711e';
    var typePromotion = 1;
    var leadsBoUrl = 'https://lead-bo-webapi-fxs.azurewebsites.net/en-US/api/v1/lead';

    leadSubmit = function() {
        var phoneNumber = '+' + $('#landing_country').val() + ' ' + $('#landing_phone').val();

        var data = {
            'Broker': 'sales@jfdbrokers',
            'Country': $('#landing_country :selected').html(),
            'Description': 'Landing mobile lead test JFD',
            'Email': '',
            'LanguageId': englishLanguageId,
            'Name': $('#landing_fullname').val(),
            'Phone': phoneNumber,
            'Type': typePromotion
        };

        if (!validateFullName(data.Name)) {
            $('#modalBackError').removeClass('fxs_hideElements');
            $('#lead_error').html('Invalid Name');
            return false;
        }

        if (!validatePhoneNumber(data.Phone)) {
            $('#modalBackError').removeClass('fxs_hideElements');
            $('#lead_error').html('Invalid Phone Number');
            return false;
        }

        $('#fxs_spinner_wrapper').removeClass('fxs_hideElements');
        sendLead(data);

        return false;
    };

    sendLead = function(data) {
        $.ajax({
            url: leadsBoUrl,
            type: 'POST',
            crossDomain: true,
            data: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            error: function(xhr, error) {
                $('#modalBackError').removeClass('fxs_hideElements');
                $('#lead_error').html('Sorry, we are having problems with the server. Please try again later. Sorry for the inconvenience. ');
                $('#fxs_spinner_wrapper').addClass('fxs_hideElements');

            },
            success: function() {
                $('#modalBackSuccess').removeClass('fxs_hideElements');
                $('#landing-submit').attr('disabled', 'disabled');
                $('#fxs_spinner_wrapper').addClass('fxs_hideElements');
            }
        });
    };

    validateFullName = function(fullName) {
        var nameRegExp = new RegExp(/^[a-zA-ZÀ-ÿ ,.'-]+$/);
        return nameRegExp.test(fullName);
    };

    validatePhoneNumber = function(phone) {
        var phoneRegExp = new RegExp(/^[0-9\-\(\)\s\+]+$/);
        var result = phoneRegExp.test(phone);
        return result;
    };

})(jQuery)