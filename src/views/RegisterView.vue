<template>
  <div class="login-box">
    <h2>회원 가입</h2>
    <form>
      <div class="user-box">
        <input v-model="userId" type="text" name="" required="" />
        <label>아이디</label>
      </div>
      <div class="user-box">
        <input v-model="userPass1" type="password" name="" required="" l />
        <label>비밀번호</label>
      </div>
      <div class="user-box">
        <input v-model="userPass2" type="password" name="" required="" />
        <label>비밀번호 확인</label>
      </div>
      <div class="user-box">
        <input v-model="userName" type="text" name="" required="" />
        <label>이름</label>
      </div>
      <div class="user-box">
        <input v-model="userYear" type="text" name="" required="" />
        <label>생년월일</label>
      </div>
      <div class="user-box">
        <input v-model="userNumber" type="text" name="" required="" />
        <label>휴대전화번호</label>
      </div>
      <a @click="onPrevEventPage">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        이전
      </a>
      <a @click="onMoveRegisterEndPage" style="margin-left: 45%">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        완료
      </a>
    </form>
  </div>
</template>
<script>
import axios from 'axios';
// import validator from './validator';
export default {
  data() {
    return {
      userId: '',
      userPass1: '',
      userPass2: '',
      userName: '',
      userYear: '',
      userNumber: '',
    };
  },
  methods: {
    onPrevEventPage() {
      this.$router.push('/');
    },
    onMoveRegisterEndPage() {
      // this.$router.push('/end');
      if (this.userId.length > 10) {
        alert('Id는 10자 이하만 가능합니다.');
      }
      if (this.userPass1 !== this.userPass2) {
        alert('비밀번호1 과 비밀번호2과 일치하지 않습니다.');
        return;
      }
      if (this.userName.length > 4) {
        alert('이름이 정확하지 않습니다');
        return;
      }
      axios
        .post('/main/insertUser', {
          userId: this.userId,
          userPass: this.userPass1,
          userName: this.userName,
          userYear: this.userYear,
          userPhoneNumber: this.userNumber,
        })
        .then((r) => {
          if (r.data.status === 'OK') {
            this.$router.push('/end');
          } else {
            alert(r.data.message);
          }
        })
        .catch((e) => {
          throw new Error(e);
        });
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
