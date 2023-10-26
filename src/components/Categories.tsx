import React from 'react';

type CategoritsProps = {
  category: number;
  onClickCategory: any;
};

const Categories: React.FC<CategoritsProps> = ({ category, onClickCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Грибные'];

  return (
    <div className='categories'>
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i} onClick={() => onClickCategory(i)} className={category === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;