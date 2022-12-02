import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import styles from "./SignIn.module.scss";
import { signIn } from "../../slices/authSlice";

const SignIn = () => {
  const { user, loading, error } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: { taiKhoan: "", matKhau: "" },
    mode: "onTouched",
  });

  const onSubmit = (value) => {
    dispatch(signIn(value));
  };

  const { errors } = formState;

  if (user) {
    return <Navigate to="/admin" replace/>
  }

  return (
    <div className={styles.signIn}>
      <div className={styles.signInContent}>
        <div className={styles.iconSignIn}>
          <MdAccountCircle />
        </div>

        <h1>Đăng nhập</h1>

        <form className={styles.formSignIn} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputSignIn}>
            <label>Tài khoản</label>
            <input
              type="text"
              placeholder="Tài khoản"
              {...register("taiKhoan", {
                required: {
                  value: true,
                  message: "Tài khoản không được để trống!",
                },
              })}
            />
            {errors.taiKhoan && (
              <p className={styles.txtError}>{errors.taiKhoan.message}</p>
            )}
          </div>

          <div className={styles.inputSignIn}>
            <label>Mật khẩu</label>
            <input
              type="text"
              placeholder="Mật khẩu"
              {...register("matKhau", {
                required: {
                  value: true,
                  message: "Mật khẩu không được để trống",
                },
              })}
            />
            {errors.matKhau && (
              <p className={styles.txtError}>{errors.matKhau.message}</p>
            )}
          </div>

          {error && <p className={styles.txtError}>{error}</p>}
          <div className={styles.btnSignIn}>
            <button disabled={loading}>Đăng nhặp</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
