import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';
const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    try {
      const authUser = await api.getOwnProfile();
      // dikarenakan `getOwnProfile()` butuh token, jika token tidak valid/ada, maka akan masuk ke `catch` (biasanya error 401 Unauthorized)
      // dan local storage hanya menyimpan token, bukan profile user. Jadi saat token tidak valid, kita tetap harus set authUser ke null.
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      dispatch(setAuthUserActionCreator(null));
    } finally {
      // apapun hasilnya, preload tetap selesai, karena kita sudah menangani error dengan `try...catch`. Jadi kita set `isPreload` ke false di `finally` agar app bisa lanjut render.
      dispatch(setIsPreloadActionCreator(false));
    }
  };
}
export { ActionType, setIsPreloadActionCreator, asyncPreloadProcess };
// Alurnya di `asyncPreloadProcess()`:

// ### 1) **Jika token ada & valid**
// 1. `dispatch(showLoading())`
// 2. `api.getOwnProfile()` berhasil
// 3. `dispatch(setAuthUserActionCreator(authUser))`
// 4. `finally`:
//    - `dispatch(setIsPreloadActionCreator(false))`
//    - `dispatch(hideLoading())`
// 5. App lanjut render sebagai **sudah login**.

// ### 2) **Jika token tidak ada / invalid**
// 1. `dispatch(showLoading())`
// 2. `api.getOwnProfile()` gagal (biasanya 401 Unauthorized)
// 3. Masuk `catch`:
//    - `dispatch(setAuthUserActionCreator(null))`
// 4. `finally` tetap jalan:
//    - `dispatch(setIsPreloadActionCreator(false))`
//    - `dispatch(hideLoading())`
// 5. App lanjut render **Login/Register**.

// ---

// ### Kenapa tanpa token masuk `catch`?
// Karena request profile butuh token. Saat token kosong/invalid, API melempar exception (error HTTP).
// Itu **normal**, bukan bug.

// ### Apakah menimbulkan error?
// - **Tidak crash** aplikasi, karena sudah ditangani `try...catch`.
// - Ini adalah **error terkontrol** untuk menentukan user belum login.
// Jadi justru mekanisme ini dipakai sebagai fallback auth check.
