// 1. init code
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 10,
    duration: '30s'
}

// 2. setup code
export function setup() {

}

// 3. Virtual User code
export default function (data) {

}

// 4. Teardown code
export function teardown(data) {

}
