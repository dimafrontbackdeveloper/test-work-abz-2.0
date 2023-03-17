import React, { useEffect, useState } from 'react';
import Button from '../Button';
import styles from './style.module.scss';
import Loader from 'react-ts-loaders';
import { useAppDispatch, useAppSelector, useInput } from '../../hooks/hooks';
import { getPositions } from '../../store/reducers/PositionsReducer/ActionCreators';
import { createUser, getUsers } from '../../store/reducers/UsersReducer/ActionCreators';
import { usersSlice } from '../../store/reducers/UsersReducer';
import { useForm } from 'react-hook-form';
import { IPosition } from '../../store/reducers/PositionsReducer/Interfaces';

export interface IPostRequestForm {
  name: string;
  email: string;
  phone: string;
  file: string;
}

const PostRequestForm = () => {
  const dispatch = useAppDispatch();

  const { setPage, setIsLastPageFalse, setEmptyUserArray } = usersSlice.actions;

  const positions = useAppSelector<Array<IPosition>>((state) => state.positionsSlice.positions);
  const isLoading = useAppSelector<boolean>((state) => state.positionsSlice.isLoading);
  const count = useAppSelector<number>((state) => state.usersSlice.count);
  const token = useAppSelector<string>((state) => state.tokenSlice.token);

  useEffect(() => {
    dispatch(getPositions());
  }, []);

  const [activePositionId, setActivePositionId] = useState<number>(1);
  const [file, setFile] = useState<Blob | string>('');
  const [fileName, setFileName] = useState<string>('Upload your photo');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IPostRequestForm>();

  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setFile(e.target.files[0]);
    setFileName(e.target.files[0]?.name ? e.target.files[0].name : 'Upload your photo');
  };

  const createNewUser = (data: IPostRequestForm) => {
    // create formData
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('position_id', String(activePositionId));
    formData.append('photo', file, fileName);

    // hide all users
    dispatch(setPage(2));
    dispatch(setIsLastPageFalse());
    dispatch(setEmptyUserArray());
    // create user
    dispatch(createUser({ formData, token })).then(() => {
      // get new users
      dispatch(
        getUsers({
          page: 1,
          count,
        }),
      );
    });

    // clear inputs
    reset();
    setActivePositionId(1);
    setFile('');
    setFileName('Upload your photo');
  };

  const changeActivePositionId = (positionId: number) => {
    setActivePositionId(positionId);
  };

  return (
    <form className={styles.postRequest__form}>
      <fieldset className={styles.postRequest__contacts}>
        <input
          className={errors.name && styles.error}
          type="text"
          id="name"
          placeholder="Your name"
          {...register('name', { required: true, maxLength: 60, minLength: 2 })}
        />
        <span className={errors.name && styles.error}>
          {errors.name && errors.name.type === 'required' && <>Required error</>}
          {errors.name && errors.name.type === 'maxLength' && <>Max length error</>}
          {errors.name && errors.name.type === 'minLength' && <>Min length error</>}
        </span>

        <input
          type={'email'}
          id="email"
          className={errors.email && styles.error}
          placeholder="Email"
          {...register('email', {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            maxLength: 100,
            minLength: 2,
          })}
        />
        <span className={errors.email && styles.error}>
          {errors.email && errors.email.type === 'required' && <>Required error</>}
          {errors.email && errors.email.type === 'maxLength' && <>Max length error</>}
          {errors.email && errors.email.type === 'minLength' && <>Min length error</>}
          {errors.email && errors.email.type === 'pattern' && <>Pattern error</>}
        </span>

        <input
          className={errors.phone && styles.error}
          type="tel"
          id="phone"
          placeholder="Phone"
          {...register('phone', {
            required: true,
            pattern: /^[\+]{0,1}380([0-9]{9})$/i,
          })}
        />
        <span className={errors.phone && styles.error}>+38 (XXX) XXX - XX - XX</span>
      </fieldset>
      <fieldset className={styles.postRequest__position}>
        <legend>Select your position</legend>
        {isLoading ? (
          <Loader type="ring" color="#00BDD3" size={100} />
        ) : (
          <>
            {positions.map((position) => {
              return (
                <div className="d-f ai-c" key={position.id}>
                  <input
                    className={`d-f ai-c jc-c ${position.id === activePositionId && 'active'}`}
                    type="radio"
                    name="position"
                    onChange={() => {
                      changeActivePositionId(position.id);
                    }}
                  />
                  <label htmlFor="frontend-developer">{position.name}</label>
                </div>
              );
            })}
          </>
        )}
      </fieldset>
      <fieldset className={styles.postRequest__file}>
        <input
          type="file"
          id="input__file"
          className={styles.postRequest__fileInput}
          onInput={changeFile}
          {...register('file', { required: true, maxLength: 60, minLength: 2 })}
        />
        <label htmlFor="input__file">
          <span className={errors.file && styles.error}>Upload</span>
          <span
            className={`${styles.postRequest__fileName} ${
              errors.file && styles.error
            } ${'d-f ai-c'}`}>
            {fileName}
          </span>
        </label>
        <span className={errors.file && styles.error}>{errors.file && <>Required error</>}</span>
      </fieldset>
      <Button
        text="Sign up"
        additionalClasses={(errors.name || errors.email) && 'disabled'}
        onClick={handleSubmit(createNewUser)}
      />
    </form>
  );
};

export default PostRequestForm;
