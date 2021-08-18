import { ref } from '@vue/reactivity';
import { projectAuth } from '../../../src/firebase/config';

const error = ref(null)

const login = async (email, password) => {
  error.value = null
  try {
    const res = await projectAuth.signInWithEmailAndPassword(email, password)
    location.reload();

    error.value = null;
      console.log(res);

    return res;
  } catch(err) {
    console.log(err.message);
    error.value = '不正なログインです';
    location.reload();
  }
}

// useLogin()により、error,loginを呼び出す
const useLogin = () => {
  return { error, login }
}

export default useLogin;
