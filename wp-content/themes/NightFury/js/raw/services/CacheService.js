
var CacheApp = angular.module('CacheService',[]);

CacheApp.factory('CACHE', function ($cacheFactory) {
    return $cacheFactory('myCache');
});
