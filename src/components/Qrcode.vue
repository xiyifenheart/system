<template>
    <div :class="qrcodeClass">
    </div>
</template>

<script>
    import Qrcode from 'jquery.qrcode'
    export default{
        name: 'qrcode',
        data() {
            return{
                qrcodeClass: 'qrcode' + this.qrcodeId
            }
        },
        props:['qrcodeId'],
        mounted: function () {
            var timestamp = new Date().getTime();
            $('.qrcode' + this.qrcodeId).qrcode({
                text: 'http://weixin.hzdlsoft.com/web/exam/index.html?instId=' + this.qrcodeId + '&v=' + timestamp,
                width: 100,
                height: 100
            });
        }
    }
</script>