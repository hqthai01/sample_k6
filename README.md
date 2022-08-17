## Start Server

Navigate to `server` folder then run:
```bash
python -m pip install --upgrade virtualenv
python -m venv .venv
# for windows run
. .venv/Scripts/activate
# other os run
. .venv/bin/activate
pip install -r requirements.txt
# start server
uvicorn main:app
```

## Test API

Navigate to `client` folder then run:
```bash
k6 run test_local_server.js
```
- Sample response
```bash

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: test_local_server.js
     output: -

  scenarios: (100.00%) 1 scenario, 300 max VUs, 1m10s max duration (incl. graceful stop):
           * default: Up to 300 looping VUs for 40s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (0m40.9s), 000/300 VUs, 2041 complete and 0 interrupted iterations
default ✓ [======================================] 000/300 VUs  40s

     █ setup

     █ visit api homepage

       ✓ call api home page should receive status code 200
       ✓ and message should be: Sample Rest API

     █ simulate add / update / delete user

       ✓ Successfully add should receive status code 201
       ✓ Add response message should contain status is success
       ✓ Successfully update should receive status code 200
       ✓ Update response message should contain status is success
       ✓ Successfully delete should receive status code 200
       ✓ Delete response message should contain status is success

     █ teardown

     checks.........................: 100.00% ✓ 16328      ✗ 0
     data_received..................: 1.5 MB  37 kB/s
     data_sent......................: 1.2 MB  30 kB/s
     group_duration.................: avg=2.12s    min=1.09ms  med=1.01s    max=26.41s   p(90)=2.99s    p(95)=3.85s
     http_req_blocked...............: avg=24.75µs  min=0s      med=0s       max=6.39ms   p(90)=0s       p(95)=0s
     http_req_connecting............: avg=21.28µs  min=0s      med=0s       max=6.39ms   p(90)=0s       p(95)=0s
   ✓ http_req_duration..............: avg=1.06s    min=997µs   med=727.95ms max=26.41s   p(90)=1.01s    p(95)=1.05s
       { expected_response:true }...: avg=1.06s    min=997µs   med=727.95ms max=26.41s   p(90)=1.01s    p(95)=1.05s
   ✓ http_req_failed................: 0.00%   ✓ 0          ✗ 8164
     http_req_receiving.............: avg=111.47ms min=0s      med=95.83ms  max=378.35ms p(90)=236.35ms p(95)=268.5ms
     http_req_sending...............: avg=15.71µs  min=0s      med=0s       max=1.01ms   p(90)=0s       p(95)=0s
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=949.09ms min=506.9µs med=598.16ms max=26.21s   p(90)=880.98ms p(95)=957.83ms
     http_reqs......................: 8164    199.643477/s
     iteration_duration.............: avg=4.23s    min=0s      med=3.15s    max=28.22s   p(90)=5.37s    p(95)=17.81s
     iterations.....................: 2041    49.910869/s
     vus............................: 114     min=19       max=300
     vus_max........................: 300     min=300      max=300

```
