var app = angular.module('vishalApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/about');
    
    $stateProvider
        .state('about', {
            url: '/about',
            templateUrl: 'templates/about.html'
        })
        .state('resume', {
            url: '/resume',
            templateUrl: 'templates/resume.html'                
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
		//.state('game', {
		//	url: '/game',
		//	templateUrl: 'templates/game.html'
		//});
        
});
