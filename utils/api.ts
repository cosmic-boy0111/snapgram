import { _GET, _POST, _PATCH, _DELETE } from "./request";

class User {

    _authenticate = () => _GET('/api/user/authenticate')
    _register = (data : unknown) => _POST('/api/user/register', data)
    _login = (data : unknown) => _POST('/api/user/login', data)
    _delete = (_id : string) => _DELETE(`/api/user/delete-account/${_id}`)

}

export const Api = {
    _user : new User()
}