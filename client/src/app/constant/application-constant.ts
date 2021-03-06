export class ApplicationConstants {
    static readonly DATE_FORMAT = 'YYYY/MM/DD';
    static readonly DATE_API_FORMAT = 'YYYY-MM-DD';
    static readonly COOKIE_AUTH_KEY = "COOKIE_AUTH_KEY";
    static readonly API_PATH = {
        login: '/api/login',
        signup: '/api/signup',
        getuser: '/api/user',
        updateuser: '/api/user',
        updatepic: '/api/updatepic',
        deletetask: '/api/user/removetask/',
        edittask: '/api/user/edittask',
        searchtask: '/api/usertask/findbyname',
        findalltask: '/api/useralltasks',
        addtask: '/api/user/addtask',
        findAllUsers: '/api/users',
        statuschange: '/api/statuschange',
        searchbyname: '/api/searchbyname',
        settingchange: '/api/settingchange',
        sendemailreminder:'/api/sendemailreminder'
    }
}