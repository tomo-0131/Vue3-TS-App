import { ref } from '@vue/reactivity';
import { projectAuth } from '../../../src/firebase/config';

const error = ref(null);

const signup = async(email, password, displayName) => {
  error.value = null;

  try {
    const res = await projectAuth.createUserWithEmailAndPassword(
      email,
      password
    )
    if(!res) {
      throw new Error('無効な新規登録です')
    }
    await res.user.updateProfile({ displayName }) //updateProfile()はdisplayNameに入力した名前を表示するために必要
    error.value = null; //エラーが起きたあとまたサインインしようとするときにエラーを表示させないため
    console.log(res.user)

    return res;
  } catch(err) {
    console.error(err.message);
    error.value = err.message; //エラー更新
  }
}

const useSignup = () => {
  return { error, signup }
};

export default useSignup;
