export default function api() {
    return fetch("https://reqres.in/api/users?page=1&per_page=10", {
             method: "get"
            }).then(response => response.json())
            .catch(error => error);
}