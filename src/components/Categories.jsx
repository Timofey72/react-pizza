import { useState } from 'react';

function Categories() {
  const [category, setCategory] = useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const onClickCategory = (catId) => {
    setCategory(catId);
  };

  return (
    <div className='categories'>
      <ul>
        {categories.map((title, i) => (
          <li key={i} onClick={() => onClickCategory(i)} className={category === i ? 'active' : ''}>
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
