import React from 'react';
import Dropzone from 'react-dropzone';
import axiosInstance from '../utils/axios';

const FileUpload = ({ onImageChange, images }) => {  // images는 부모컴포넌트 UploadProductPage의 product state에 있는 것을 props로 내려준것!
  
    const handleDrop = async (files) => {
        let formData = new FormData();

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        formData.append('file', files[0]);

        try {
            const response = await axiosInstance.post('/products/image', formData, config);  // 백엔드에 파일 전달
            onImageChange([...images, response.data.fileName]);  // 원래 있던 이미지 정보 + 백엔드로부터 전달받은 저장한 파일의 이름을 추가해줌 => 프론트엔드 images 배열이 업데이트 됨.
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = (image) => {
        const currentIndex = images.indexOf(image);     // 클릭한 이미지의 인덱스 반환
        let newImages = [...images];    // state 불변성 지켜주기 위해 원본 복사
        newImages.splice(currentIndex, 1);  // currentIndex로부터 1개를 지워줌.
        onImageChange(newImages);
    }
  
    return (
    <div className='flex gap-4'>

        <Dropzone onDrop={handleDrop}> 
        {({getRootProps, getInputProps}) => (
            <section
                className='min-w-[300px] h-[300px] border flex items-center justify-center'
            >
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p className='text-3xl'>+</p>
            </div>
            </section>
        )}
        </Dropzone>

        <div className='flex-grow h-[300px] border flex items-center justify-center overflow-x-scroll overflow-y-hidden'>
            {images.map(image => (      // images는 배열이므로 map으로 하나씩 가져옴
                <div key={image} onClick={() => handleDelete(image)}>    {/* 이미지 클릭해서 클릭한 이미지 이름을 넣어서 함수호출을 통해 이미지 삭제 */}
                    <img 
                        className='min-w-[300px] h-[300px]'
                        src={`${import.meta.env.VITE_SERVER_URL}/${image}`}  // 이미지는 백엔드에 저장되므로 백엔드 서버의 URL과 이미지 이름을 넣어줌.
                        alt={image}
                   />

                </div>
            ))}
        </div>

    </div>
  )
}

export default FileUpload