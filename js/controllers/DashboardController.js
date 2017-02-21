angular.module('MetronicApp').controller('DashboardController', function($rootScope, $scope, $http, $timeout) {
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
    });

    var data;
      
		$http.get('api/demo-table.json').then(function(response) {	
       
        data = response.data;
    	
    	}).then(function() {

    		if(!document.querySelector('.ht_master.handsontable')) {

    		var container = document.getElementById('example');
			var hot = new Handsontable(container, {
		  	data: data,
		  	allowInvalid: false,
    		manualRowMove: true,
   		  	colWidths: [177,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100]
			});


			hot.updateSettings({
			    cells: function (row, col, prop) {
			      var cellProperties = {};

			      cellProperties.type = 'numeric';
			      cellProperties.format = '0.00';

			      if (isNaN(hot.getData()[row][col]) && hot.getData()[row][col] !== '' || hot.getData()[row][col] === ' ') {
			        cellProperties.readOnly = true;
			        cellProperties.editor = false;
			      }

			      return cellProperties;
			    }
  			})

			}

    	})

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
});