$(document).ready(function() {
    $('.ipt').on('keyup', function() {
        let keyword = $(this).val().trim()
        if (keyword.length <= 0) {
            return $('.sug').empty().hide()

        }
        if (chaobj[keyword]) {
            return decounceSeach(chaobj[keyword])
        }
        clearTimeout(timer)
        decounceSeach(keyword)

    })

    function getsuggtion(kw) {
        $.ajax({
            url: 'https://suggest.taobao.com/sug?q=' + kw,

            dataType: 'jsonp',
            success: function(re) {
                redersuggtion(re)
            }

        })

    }

    let chaobj = {}

    function redersuggtion(res) {
        if (res.result <= 0) {
            return $('.sug').empty().hide()
        }
        let htmlstr = template('tpl', res)
        $('.sug').html(htmlstr).show()
        let kw = $('.ipt').val().trim()
        chaobj[kw] = res
        console.log(chaobj);


    }

    // 防抖
    let timer = null

    function decounceSeach(keyword) {
        timer = setTimeout(function() {
            getsuggtion(keyword)
        }, 500)

    }

    // 缓存搜索




















})