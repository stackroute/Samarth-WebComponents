angular.module('samarth-coordinator')
    .controller('circleDetail', function($scope, $http, $stateParams) {
        $scope.profilePic = "http://www.dam7.com/Images/Puppy/images/myspace-puppy-images-0005.jpg";
        $scope.posts = [{
            img: 'http://photo-forum.net/imgs/170/a_1146594132_IMG_0181-copy1-sh.jpg',
            postTitle: 'Brunch this weekend?',
            admin: 'Min Li Chan',
            time: '3:08PM',
            details: " I'll be in your neighborhood doing errands"
        }, {
            img: 'http://photo-forum.net/imgs/170/a_1146594132_IMG_0181-copy1-sh.jpg',
            postTitle: 'Brunch this weekend?',
            admin: 'Min Li Chan',
            time: '3:08PM',
            details: " I'll be in your neighborhood doing errands"
        }, {
            img: 'http://photo-forum.net/imgs/170/a_1146594132_IMG_0181-copy1-sh.jpg',
            postTitle: 'Brunch this weekend?',
            admin: 'Min Li Chan',
            time: '3:08PM',
            details: " I'll be in your neighborhood doing errands"
        }, {
            img: 'http://photo-forum.net/imgs/170/a_1146594132_IMG_0181-copy1-sh.jpg',
            postTitle: 'Brunch this weekend?',
            admin: 'Min Li Chan',
            time: '3:08PM',
            details: " I'll be in your neighborhood doing errands"
        }];

        $scope.messages = [{
            face: 'http://photo-forum.net/imgs/170/a_1146594132_IMG_0181-copy1-sh.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
        }, {
            face: 'http://photo-forum.net/imgs/170/a_1146594132_IMG_0181-copy1-sh.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
        }, {
            face: 'http://photo-forum.net/imgs/170/a_1146594132_IMG_0181-copy1-sh.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
        }, {
            face: 'http://photo-forum.net/imgs/170/a_1146594132_IMG_0181-copy1-sh.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
        }, {
            face: 'http://photo-forum.net/imgs/170/a_1146594132_IMG_0181-copy1-sh.jpg',
            what: 'Brunch this weekend?',
            who: 'Min Li Chan',
            when: '3:08PM',
            notes: " I'll be in your neighborhood doing errands"
        }];

    });
