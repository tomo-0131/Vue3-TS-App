import { ref } from 'vue';
import { projectAuth } from '../../../src/firebase/config';

// projectAuth内のcurrentUserを使う
const user = ref(projectAuth.currentUser);

// onAuthStateChanged()メソッドはログイン・ログアウト・サインアップ等、認証状態変化の度に実行される
projectAuth.onAuthStateChanged(_user => {
  // _userにログイン・ログアウトしたユーザーを格納
  console.log(('ユーザーの状態が変わりました。現在のユーザーは：', _user))
  user.value = _user
});

const getUser = () => {
  return { user }
};

export default getUser;
