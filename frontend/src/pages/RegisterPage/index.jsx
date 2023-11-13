import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../store/thunkFunctions'

const RegisterPage = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },  // 유효성 체크시 통과를 못했을 경우 errors를 통해 에러 메시지를 보여줌
    reset 
  } = useForm({mode: 'onChange'})

    const dispatch = useDispatch();

    const onSubmit = ({ email, password, name }) => { // 인자로 받아오는게 email, password, name value들

      const body = {
        email,
        password,
        name,
        image: `http://via.placeholder.com/600x400?text=no+user+image`,
        role
      }

      dispatch(registerUser(body));   // registerUser() 라는 thunk 함수를 만들어줌, 이 thunk 함수는 store/thunkFunctions.js 에 생성해줌

      reset();
    }

    const [role, setRole] = useState(0);

    const handleRole = (event) => {     
      setRole(parseInt(event.target.value))
    }

    // ✨ 유효성 체크를 위해서
    const userEmail = {
      required: '이메일을 입력해주세요.'
    }

    const userName = {
      required: '이름을 입력해주세요.'
    }

    const userPassword = {
      required: '비밀번호를 입력해주세요.',
      minLength: {
        value: 6,
        message: '최소 6자입니다.'
      }
    }

  return (
    <section className='flex flex-col justify-center mt-20 max-w-[400px] m-auto'>
      <div className='p-6 bg-white rounded-md shadow-md'>
        <h1 className='text-3xl font-semibold text-center'>
          회원가입
        </h1>
        <form className='mt-6' onSubmit={handleSubmit(onSubmit)}> {/* margin top */}
          <div className='mb-2'>  {/* margin bottom */}
            <div>
              <select 
                value={role} 
                onChange={handleRole}
                className='p-0.5 mb-4 text-sm font-semibold text-gray-800 border border-stone-800 rounded-md'
              >
                <option value={0}>일반회원</option>
                <option value={1}>관리자</option>
              </select>
            </div>
           
            <label
              htmlFor='email'   // input의 id와 같게 해줌
              className='text-sm font-semibold text-gray-800'
            >Email</label>
            <input 
              type='email'
              id='email'
              className='w-full px-4 py-2 mt-2 bg-white border rounded-md'
              {...register('email', userEmail)}  // 유효성 체크를 하기 위한 등록
            />
            {
              errors?.email &&  // 유효성 체크를 통과하지 못했을 경우
                <div>
                  <span className='text-red-500'>
                    {errors.email.message}  {/* userEmail에 해당하는 에러 메시지를 보여줌 */}
                  </span>
                </div>
            }
          </div>

          <div className='mb-2'>  {/* margin bottom */}
            <label
              htmlFor='name'   // input의 id와 같게 해줌
              className='text-sm font-semibold text-gray-800'
            >Name</label>
            <input 
              type='text'
              id='name'
              className='w-full px-4 py-2 mt-2 bg-white border rounded-md'
              {...register('name', userName)}
            />
            {
              errors?.name &&  // 유효성 체크를 통과하지 못했을 경우
                <div>
                  <span className='text-red-500'>
                    {errors.name.message} 
                  </span>
                </div>
            }
          </div>

          <div className='mb-2'>  {/* margin bottom */}
            <label
              htmlFor='password'   // input의 id와 같게 해줌
              className='text-sm font-semibold text-gray-800'
            >Password</label>
            <input 
              type='password'
              id='password'
              className='w-full px-4 py-2 mt-2 bg-white border rounded-md'
              {...register('password', userPassword)}
            />
            {
              errors?.password &&  // 유효성 체크를 통과하지 못했을 경우
                <div>
                  <span className='text-red-500'>
                    {errors.password.message} 
                  </span>
                </div>
            }
          </div>

          <div className='mt-6'>
            <button type='submit' className='w-full text-white px-4 py-2 rounded-md bg-stone-800 hover:bg-neutral-700 duration-200'>
              회원가입
            </button>
          </div>

          <p className='mt-8 text-xs font-light text-center text-gray-700'>
            아이디가 있다면?{" "}
            <a
              href='/login'
              className='font-medium hover:underline'
            >
              로그인
            </a>
          </p>

        </form>
      </div>
    </section>
  )
}

export default RegisterPage