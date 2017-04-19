export default {
	getChartData: () => {
		var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
	        data = [];
	    for (var i = 0; i < countries.length; i++) {
	        data.push({
	            country: countries[i],
	            downloads: Math.round(Math.random() * 20000),
	            sales: Math.random() * 10000,
	            // incomes: Math.random() * 6000,
	            expenses: Math.random() * 5000
	        });
	    }
	    return data;
	},

	getGridData: (count) => {
        var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
            data = [];
        for (var i = 0; i < count; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                date: new Date(2014, i % 12, i % 28),
                amount: Math.random() * 10000,
                active: i % 4 == 0
            });
        }
        return data;
	},

	getGaugeData: () => {
        return {
            value: 50,
            min: 0,
            max: 100,
            format: 'n0',
            step: 10
        }
    },

    getInputData: () => {
    	return 123
    }
}