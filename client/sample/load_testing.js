// 1. init code
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '5s', target: 100 },
        { duration: '5s', target: 200 },
        { duration: '5s', target: 0 }
    ],
    thresholds: {
        'http_req_duration': ['p(99)<1500'],
        'http_req_failed': ['rate<2']
    }
}

const BASE_URL = 'https://httpbin.test.k6.io'

// 2. setup code
export function setup() {
    const res = http.get(`${BASE_URL}/ip`)
    return {
        status: res.status,
        body: res.json()
    }
}

// 3. Virtual User code
export default function (data) {
    check(data, { 'status was 200': (r) => r.status == 200 })
    check(data, {
        'ip address should be [171.233.85.98]': (r) => r.body.origin == "171.233.85.98"
    })
}

// 4. Teardown code
export function teardown(data) {
    console.log(JSON.stringify(data))
}