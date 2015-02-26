angular.module('panicapp.services', [])

.factory('Friend', function($resource) {
  return $resource('http://localhost:3000/contacts/:id', { id: '@id' }, 
    {
      'update': { method: 'PUT' },
      'create': { method: 'POST' }
    }
  );
})

.factory('Defense', function($resource) {
  return $resource('http://localhost:3000/defenses/:id', { id: '@id' },
    {
      'update': { method: 'PUT' },
      'create': { method: 'POST' }
    }
  );
})

.factory('Trigger', function($resource) {
  return $resource('http://localhost:3000/triggers/:id', { id: '@id' },
    {
      'update': { method: 'PUT' },
      'create': { method: 'POST' }
    }
  );
});