import React from 'react'

const CheckBox = ({ continents, checkedContinents, onFilters }) => {
  const handleToggle = (continentId) => {

    // 현재 누른 checkbox가 이미 누른 checkbox 인지 확인
    const currentIndex = checkedContinents.indexOf(continentId);

    // State는 불변성을 지켜줘야 하므로 바로 수정하면 안됨!
    const newChecked = [...checkedContinents];

    if(currentIndex === -1) {   // 아직 눌리지 않은 checkbox
      newChecked.push(continentId);
    } else {  // 이미 눌려져있는 checkbox
      newChecked.splice(currentIndex, 1);   // 눌려져 있는 checkbox 를 지워줌.
    }
    onFilters(newChecked);
  } 

  return (
    <div className='p-2 mb-3 bg-gray-100 rounded-md'>
      {continents?.map(continent => (
        <div key={continent._id}>
            <input 
              type='checkbox'
              onChange={() => handleToggle(continent._id)}
              checked={checkedContinents.indexOf(continent._id) === -1 ? false : true}  // checkedContinents.indexOf(continent._id) === -1 이면 체크가 안된 상태이므로 checked 는 false
            />{" "}    {/* 빈칸 */}
            <label>{continent.name}</label>
        </div>
      ))}
    </div>
  )
}

export default CheckBox