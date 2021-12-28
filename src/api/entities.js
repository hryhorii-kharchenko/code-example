export function fetchEntityCurried(endpoint) {
  return function fetchEntity(pageIndex = 1) {
    return fetch(`${endpoint}?page=${pageIndex}`).then(function handleResponse(
      response
    ) {
      if (!response.ok) throw Error(response.status.toString());

      return response.json();
    });
  };
}
