<template>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CSS glowing icons</title>
    <link rel="stylesheet" href="style.css" />
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    />
  </head>

  <body>
    <div class="container">
      <i class="fa fa-home" id="apple"></i>
      <i class="fa fa-clock-o" id="twitter"></i>
      <i class="fa fa-github-square github" id="github"></i>
      <i class="fa fa-calendar-o" id="facebook"></i>
    </div>
  </body>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      // 라우터로 전달받은 id값
      userid: this.$route.params.userid,
    };
  },
  // mounted는 화면이 로드되고 나서 실행
  mounted() {
    this.userRightCheck();
  },
  methods: {
    userRightCheck: function () {
      axios
        .post('/main/usrCheck', {
          userId: this.userid,
        })
        .then((r) => {
          const result = r.data;
          console.log(result);
          console.log(result.userRight);
        })
        .catch((e) => {
          throw new Error(e);
        });
    },
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}
#apple,
#twitter,
#github,
#facebook {
  cursor: pointer;
  font-size: 8em;
  background-color: #18191f;
  color: #fff;
  box-shadow: 2px 2px 2px #00000080, 10px 1px 12px #00000080,
    2px 2px 10px #00000080, 2px 2px 3px #00000080, inset 2px 2px 10px #00000080,
    inset 2px 2px 10px #00000080, inset 2px 2px 10px #00000080,
    inset 2px 2px 10px #00000080;
  border-radius: 29px;
  padding: 11px 19px;
  margin: 0 40px;
  animation: animate 3s linear infinite;
  text-shadow: 0 0 50px #0072ff, 0 0 100px #0072ff, 0 0 150px #0072ff,
    0 0 200px #0072ff;
}
#twitter {
  animation-delay: 0.3s;
}
#facebook {
  animation-delay: 0.7s;
}
#github {
  animation-delay: 0.1s;
}

@keyframes animate {
  from {
    filter: hue-rotate(0deg);
  }
  to {
    filter: hue-rotate(360deg);
  }
}
</style>
