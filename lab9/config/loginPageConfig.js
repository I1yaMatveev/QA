const RIGHT_USER_DATA = {
    username: 'login1',
    password: '123456'
}

const INVALID_PASSWORD_USER_DATA = {
    username: 'login1',
    password: '123abc'
}

const INVALID_LOGIN_USER_DATA = {
    username: 'l',
    password: '123456'
}

const LOGIN_SUCCESS_MESSAGE = 'Вы успешно авторизованы';

const LOGIN_ERROR_MESSAGE = 'Логин/пароль введены неверно';

module.exports = {RIGHT_USER_DATA, INVALID_PASSWORD_USER_DATA, INVALID_LOGIN_USER_DATA , LOGIN_SUCCESS_MESSAGE, LOGIN_ERROR_MESSAGE};