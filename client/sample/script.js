import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    // vus: 10,
    // duration: '30s'
    stages: [
        { duration: '30s', target: 20 },
        { duration: '50s', target: 10 },
        { duration: '20s', target: 0 }
    ]
}

export default function () {
    const res = http.get('https://httpbin.test.k6.io/');
    return { status: res.status, data: res.json() }
    check(res, { 'status was 200': (r) => r.status == 200 })
    sleep(1);
}