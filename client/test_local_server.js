// 1. init code
// import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { home_page, add_user, update_user, delete_user } from './api_handler.js'

export const options = {
    stages: [
        { duration: '10s', target: 200 }, //ramping up 200 users in 10 seconds
        { duration: '20s', target: 300 }, //ramping up users to 300 in next 20 seconds
        { duration: '10s', target: 0 }    //ramping down users from 300 to 0 in 10 seconds
    ],
    thresholds: {
        'http_req_duration': ['avg<3000'], //threshold avg time of req < 3s
        'http_req_failed': ['rate<5']      //threshold failed rate < 5%
    }
}

// 2. setup code
export function setup() {
}

// 3. Virtual User code
export default function () {
    group('visit api homepage', function () {
        const home_res = home_page()
        check(home_res, { 'call api home page should receive status code 200': (r) => r.status == 200 })
        check(home_res, { 'and message should be: Sample Rest API': (r) => r.json().message == "Sample Rest API" })
    })

    group('simulate add / update / delete user', function () {
        const add_res = add_user(`TestUser${__ITER * __VU}`, `TestPassword${__ITER * __VU}`)
        check(add_res, { 'Successfully add should receive status code 201': (r) => r.status == 201 })
        check(add_res, { 'Add response message should contain status is success': (r) => r.json().status == "success" })

        const update_res = update_user(0, `UpdatedUser${__ITER * __VU}`, `UpdatedPassword${__ITER * __VU}`)
        check(update_res, { 'Successfully update should receive status code 200': (r) => r.status == 200 })
        check(update_res, { 'Update response message should contain status is success': (r) => r.json().status == "success" })

        const delete_res = delete_user(0)
        check(delete_res, { 'Successfully delete should receive status code 200': (r) => r.status == 200 })
        check(delete_res, { 'Delete response message should contain status is success': (r) => r.json().status == "success" })
    })
}

// 4. Teardown code
export function teardown() {
}