<template>
  <div class="login-box">
    <h2>데이타 솔루션</h2>
    <form id="appForm" @submit="checkForm">
      <div class="user-box">
        <input v-model="userId" id="userId" type="text" required="" />
        <label>아이디</label>
      </div>
      <div class="user-box">
        <input v-model="userPass" id="userPass" type="password" required="" />
        <label>비밀번호</label>
      </div>
      <a @click="clickEvent">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        로그인
      </a>
      <a href="#" style="margin-left: 30%" @click="moveRegister">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        회원가입
      </a>
    </form>
  </div>
</template>
<script>
// import router from '@/router';
import axios from 'axios';
export default {
  data() {
    return {
      userId: '',
      userPass: '',
    };
  },
  watch: {
    // 실시간으로 바인딩 시킨 데이터 체크
    userId: function () {
      this.checkUserId(); // 실시간으로 입력되는 데이터의 이벤트 바인딩
    },
    userPass: function () {
      this.checkPass();
    },
  },
  methods: {
    checkUserId: function () {
      const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
      if (korean.test(this.userId)) {
        alert('한글을 입력하지마세요');
        this.userId = '';
        return;
      }
    },
    checkPass: function () {
      if (this.userPass.length >= 5) {
        alert('비밀번호는 4자리까지만 가능합니다.');
        this.userPass = '';
        return;
      }
    },
    clickEvent: function () {
      if (this.userId === '') {
        alert('ID를 입력하세요');
        return;
      } else if (this.userPass === '') {
        alert('비밀번호를 입력하세요');
        return;
      }
      axios
        .post('/main/login', {
          userId: this.userId,
          userPass: this.userPass,
        })
        .then((r) => {
          const result = r.data.data;
          const flag = result.userFlag; // user 상태
          const userRole = result.userRigth; // 권한 상태
          switch (flag) {
            case 'Y':
              // 그냥 페이지 이동 방식
              this.$router.push('/menu');
              // 파라미터 이동방식
              // 파라미터 전달시 컴포넌트 경로는 name로 정의한다.
              //유저id 파라미터 전달
              // this.$router.push({
              //   name: 'mainmenu',
              //   params: {
              //     userid: this.userId,
              //   },
              // });
              // to => 내가 가야할곳
              // from => 현재 페이지
              // next => 이동시켜주는 객체
              this.$router.beforeEach((to, from, next) => {
                if (to.path === '/') {
                  // 접근권한 없을시 무한루프를 빠져나오기 위함
                  next();
                } else if (to.path === '/menu') {
                  if (!to.meta.roles.includes(userRole.userRight)) {
                    alert('해당 페이지에 접근 권한이 없습니다.');
                    return next({ path: '/' });
                  } else {
                    next();
                  }
                } else if (to.path === '/register') {
                  next();
                }
              });
              break;
            case 'N':
              alert(result.msg);
              break;
          }
        })
        .catch((e) => {
          throw new Error(e);
        });
    },
    moveRegister: function () {
      this.$router.push('/register');
    },
  },
};
</script>
<style>
html {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: linear-gradient(#141e30, #243b55);
}
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
}

.login-box a:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 100px #03e9f4;
}

.login-box a span {
  position: absolute;
  display: block;
}

.login-box a span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

.login-box a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: 0.25s;
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}

.login-box a span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: 0.5s;
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}

.login-box a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: 0.75s;
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}
</style>
