$(function() {
    $('.input_sub').on('click', function() {
            let text = $('.input_txt').val().trim()
            if (text.length <= 0)
                return $('.input_txt').val('')

            $('.talk_list').append('<li class="right_word"><img src="img/person02.png" /><span>' + text + '</span></li>')
            resetui()
            $('.input_txt').val('')
            getMsg(text)


            function getMsg(text1) {
                $.ajax({
                    method: 'GET',
                    url: 'http://www.liulongbin.top:3006/api/robot',
                    data: {
                        spoken: text1
                    },
                    success: function(re) {
                        if (re.message === 'success') {

                            let text2 = re.data.info.text

                            $('.talk_list').append('<li class="left_word"><img src = "img/person01.png"/> <span>' + text2 + '</span></li>')
                            resetui()
                            getVoice(text2)

                        }
                    }


                })
            }

            function getVoice(text) {
                $.ajax({
                    method: 'GET',
                    url: 'http://www.liulongbin.top:3006/api/synthesize',
                    data: {
                        text: text
                    },
                    success: function(re) {
                        if (re.message === 'success') {
                            console.log(re.voiceUrl);
                            $('#audio').attr('src', re.voiceUrl)
                        }
                    }

                })
            }

        })
        // 语音











})