import React from 'react';

type CategoritsProps = {
  category: number;
  onClickCategory: (id: number) => void;
};

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Грибные'];

const Categories: React.FC<CategoritsProps> = React.memo(({ category, onClickCategory }) => {
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
});

export default Categories;
