var app = new Vue({
    el: '#app',
    data: {
        logs: []
    },
    methods: {
        loadMore: function () {
        },
    },
    mounted: function () {
        setTimeout(() => {
            this.logs.push({
                message: 'Parsing the file gemel_0318.xsl',
                service: 'processor',
                date: '25/06/2019 22:00'
            });

            this.logs.push({
                message: 'Failed parsing the file gemel_0319.xsl',
                service: 'processor',
                date: '25/06/2019 22:00'
            });

            this.logs.push({
                message: 'Failed parsing the file gemel_0119.xsl',
                service: 'processor',
                date: '25/06/2019 22:00'
            });

        }, 1000);
    }
});
