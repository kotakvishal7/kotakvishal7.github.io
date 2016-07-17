var app = angular.module('vishalApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/about');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('about', {
            url: '/about',
            templateUrl: 'templates/about.html'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('resume', {
            url: '/resume',
            templateUrl: 'templates/resume.html'            // we'll get to this in a bit       
        })
		
		.state('portfolio' , {
			url: '/portfolio',
			templateUrl: 'templates/portfolio.html'
		})
		
		.state('contact' , {
			url:'/contact',
			templateUrl: 'templates/contact.html'
		})
		
		.state('research' , {
			url:'/research',
			templateUrl: 'templates/research.html'
		});
        
});